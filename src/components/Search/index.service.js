import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import * as postsActions from 'store/ducks/posts/actions'
import { withNavigation } from 'react-navigation'
import toLower from 'ramda/src/toLower'

const SearchService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.user)
  const usersSearch = useSelector(state => state.users.usersSearch)
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const usersGetProfileCache = useSelector(state => state.users.usersGetProfileCache)
  const usersGetTrendingUsers = useSelector(state => state.users.usersGetTrendingUsers)
  const postsGetTrendingPosts = useSelector(state => state.posts.postsGetTrendingPosts)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)

  const usersSearchRequest = ({ searchToken }) => {
    dispatch(usersActions.usersFollowIdle())
    dispatch(usersActions.usersUnfollowIdle())
    dispatch(usersActions.usersSearchRequest({ searchToken: toLower(searchToken || '') }))
  }

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))
  
  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))
  
  const usersAcceptFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersAcceptFollowerUserRequest({ userId }))

  useEffect(() => {
    dispatch(usersActions.usersGetTrendingUsersRequest({ limit: 30 }))
    dispatch(postsActions.postsGetTrendingPostsRequest({ limit: 30 }))
  }, [])

  /**
   * Following two states are tracking values of Search/Form -> searchToken input field
   * we are dynamically rendering components on Search/index based on values below
   * 
   * formFocus is a state of focus/blur events: [searchToken input]
   * formChange is a state of value.length: [searchToken input]
   */
  const [formFocus, handleFormFocus] = useState(false)
  const [formChange, handleFormChange] = useState(false)

  return children({
    authUser,
    themeFetch,
    usersSearch: usersServices.cachedUsersSearch(usersSearch, usersGetProfileCache),
    usersSearchRequest,
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
    usersAcceptFollowerUser,
    usersAcceptFollowerUserRequest,
    usersGetTrendingUsers: usersServices.cachedUsersGetTrendingUsers(usersGetTrendingUsers, usersGetProfileCache),
    postsGetTrendingPosts,
    formFocus,
    handleFormFocus,
    formChange,
    handleFormChange,
  })
}

export default withNavigation(SearchService)
