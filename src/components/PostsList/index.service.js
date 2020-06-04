import { useEffect, useRef } from 'react'
import { InteractionManager } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsSelector from 'store/ducks/posts/selectors'

const PostsListService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const postsFeedGet = useSelector(postsSelector.postsFeedGetSelector())
  const postsCreate = useSelector(state => state.posts.postsCreate)
  const postsCreateQueue = useSelector(state => state.posts.postsCreateQueue)
  const usersGetPendingFollowers = useSelector(state => state.users.usersGetPendingFollowers)
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)
  const postsGetTrendingPosts = useSelector(postsSelector.postsGetTrendingPostsSelector())
  
  const postsFeedGetRequest = (payload) =>
    dispatch(postsActions.postsFeedGetRequest(payload))

  const postsFeedGetMoreRequest = (payload) =>
    dispatch(postsActions.postsFeedGetMoreRequest(payload))
  
  const usersGetPendingFollowersRequest = (payload) => 
    dispatch(usersActions.usersGetPendingFollowersRequest(payload))

  const postsCreateRequest = (payload) => {
    dispatch(postsActions.postsCreateRequest(payload))
  }

  const postsCreateIdle = (payload) =>
    dispatch(postsActions.postsCreateIdle(payload))

  useEffect(() => {
    usersGetPendingFollowersRequest({ userId: user.userId })
  }, [usersAcceptFollowerUser.status])

  const onViewableItemsChanged = ({ viewableItems }) => {
    const postIds = viewableItems.map(viewable => path(['item', 'postId'])(viewable))
      .filter(item => item)

    if (!Array.isArray(postIds) || !postIds.length) {
      return
    }

    InteractionManager.runAfterInteractions(() => {
      dispatch(postsActions.postsReportPostViewsRequest({ postIds }))
    })
  }

  const handleScrollPrev = (index) => () => {
    try {
      feedRef.current.scrollToIndex({
        index: index - 1,
        viewPosition: 0.5,
      })
    } catch (error) {}
  }

  const handleScrollNext = (index) => () => {
    try {
      feedRef.current.scrollToIndex({
        index: index + 1,
        viewPosition: 0.5,
      })
    } catch (error) {}
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

  /**
   * FlatList feed config ref, used for reporting scroll events
   */
  const onViewableItemsChangedRef = useRef(onViewableItemsChanged)
  const viewabilityConfigRef = useRef({
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 30,
    waitForInteraction: false,
  })

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
    user,
    postsFeedGet,
    postsFeedGetRequest,
    postsFeedGetMoreRequest,
    postsCreate,
    postsCreateRequest,
    postsCreateIdle,
    postsCreateQueue,
    usersGetPendingFollowers,
    postsGetTrendingPosts,
    handleScrollPrev,
    handleScrollNext,

    bookmarkSeparatorIndex,
    onViewableItemsChangedRef,
    viewabilityConfigRef,

    feedRef,
    createActionSheetRef,
    getActionSheetRef,
    createTextPostRef,
    getTextPostRef,
  })
}

export default PostsListService
