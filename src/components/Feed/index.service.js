import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as chatActions from 'store/ducks/chat/actions'
import { useScrollToTop } from '@react-navigation/native'
import pathOr from 'ramda/src/pathOr'
import * as postsSelector from 'store/ducks/posts/selectors'
import * as authSelector from 'store/ducks/auth/selectors'

const FeedService = ({ children }) => {
  const dispatch = useDispatch()
  const postsFeedGet = useSelector(postsSelector.postsFeedGetSelector())
  const postsCreate = useSelector(postsSelector.postsCreate)
  const postsGetTrendingPosts = useSelector(postsSelector.postsGetTrendingPostsSelector())
  const userId = useSelector(authSelector.authUserId)

  const updateRelatedData = () => {
    dispatch(usersActions.usersGetCardsRequest())

    if (userId) {
      dispatch(postsActions.postsGetUnreadCommentsRequest())
      dispatch(usersActions.usersGetFollowedUsersWithStoriesRequest())
      dispatch(usersActions.usersGetPendingFollowersRequest({ userId }))
      dispatch(chatActions.chatGetChatsRequest())
    }
  }

  const loadInit = (payload) => {
    dispatch(postsActions.postsFeedGetRequest(payload))
    updateRelatedData()
  }

  const postsFeedGetMoreRequest = (payload) =>
    dispatch(postsActions.postsFeedGetMoreRequest(payload))

  const handleScrollPrev = (index) => () => {
    try {
      feedRef.current.scrollToIndex({
        index: index - 1,
        viewPosition: 0.5,
      })
    } catch (error) {
      // ignore
    }
  }

  const handleScrollNext = (index) => () => {
    try {
      feedRef.current.scrollToIndex({
        index: index + 1,
        viewPosition: 0.5,
      })
    } catch (error) {
      // ignore
    }
  }

  /**
   * You are all caught up separator position
   */
  const bookmarkSeparatorIndex = pathOr([], ['data'])(postsFeedGet)
    .findIndex(post => post.viewedStatus === 'VIEWED')

  /**
   * FlatList feed ref, used for scroll to top on tab bar press
   */
  const feedRef = useRef(null)
  useScrollToTop(feedRef)

  /**
   * Post header dropdown ref, used for header actions dropdown
   */
  const actionSheetRefs = useRef({})

  /**
   * Text only post ref, used for rendering textonly post component into image
   */
  const textPostRefs = useRef({})

  const createActionSheetRef = post => element => {
    if (!actionSheetRefs.current[post.postId]) {
      actionSheetRefs.current[post.postId] = element
    }
  }

  const getActionSheetRef = post => actionSheetRefs.current[post.postId]

  const createTextPostRef = post => element => {
    if (!textPostRefs.current[post.postId]) {
      textPostRefs.current[post.postId] = element
    }
  }

  const getTextPostRef = post => textPostRefs.current[post.postId]

  return children({
    postsFeedGet,
    loadInit,
    postsFeedGetMoreRequest,
    postsCreate,
    postsGetTrendingPosts,
    handleScrollPrev,
    handleScrollNext,
    bookmarkSeparatorIndex,
    feedRef,
    createActionSheetRef,
    getActionSheetRef,
    createTextPostRef,
    getTextPostRef,
  })
}

export default FeedService
