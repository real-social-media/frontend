import { useEffect, useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as postsActions from 'store/ducks/posts/actions'
import { useScrollToTop } from '@react-navigation/native'
import toLower from 'ramda/src/toLower'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'
import * as postsSelector from 'store/ducks/posts/selectors'
import SearchFeedContext from 'components/Search/Context'

const SearchService = ({ children }) => {
  const dispatch = useDispatch()
  const { feedRef, formFocus, handleFormFocus } = useContext(SearchFeedContext)
  const user = useSelector(authSelector.authUserIdentity)
  const usersSearch = useSelector(usersSelector.usersSearchSelector())
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const usersGetTrendingUsers = useSelector(usersSelector.usersGetTrendingUsersSelector())
  const postsGetTrendingPosts = useSelector(postsSelector.postsGetTrendingPostsSelector())
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)

  /**
   * FlatList feed ref, used for scroll to top on tab bar press
   */
  useScrollToTop(feedRef)

  const usersSearchRequest = ({ searchToken }) => {
    dispatch(usersActions.usersFollowIdle({}))
    dispatch(usersActions.usersUnfollowIdle({}))
    dispatch(usersActions.usersSearchRequest({ searchToken: toLower(searchToken || '') }))
  }

  /**
   * Trending Filters
   */
  const postsGetTrendingPostsRequest = () =>
    dispatch(postsActions.postsGetTrendingPostsRequest())

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))

  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))

  const usersAcceptFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersAcceptFollowerUserRequest({ userId }))

  const postsGetTrendingPostsMoreRequest = (payload) =>
    dispatch(postsActions.postsGetTrendingPostsMoreRequest({ ...payload }))

  useEffect(() => {
    dispatch(usersActions.usersGetTrendingUsersRequest({ limit: 30 }))
  }, [])

  /**
   * Following two states are tracking values of Search/Form -> searchToken input field
   * we are dynamically rendering components on Search/index based on values below
   *
   * formFocus is a state of focus/blur events: [searchToken input]
   * formChange is a state of value.length: [searchToken input]
   */
  const [formChange, handleFormChange] = useState(false)

  return children({
    feedRef,
    user,
    usersSearch,
    usersSearchRequest,
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
    usersAcceptFollowerUser,
    usersAcceptFollowerUserRequest,
    usersGetTrendingUsers,
    postsGetTrendingPosts,
    postsGetTrendingPostsMoreRequest,
    formChange,
    handleFormChange,
    postsGetTrendingPostsRequest,
    formFocus,
    handleFormFocus,
  })
}

export default SearchService
