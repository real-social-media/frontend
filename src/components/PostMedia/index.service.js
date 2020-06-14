import { useEffect, useRef } from 'react'
import { InteractionManager } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import * as postsSelector from 'store/ducks/posts/selectors'
import { useNavigation, useScrollToTop, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'

const PostMediaService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postId = path(['params', 'post', 'postId'])(route)
  const postUserId = path(['params', 'post', 'postedBy', 'userId'])(route)
  const navigationParamPost = path(['params', 'post'])(route)
  const postsSingleGet = useSelector(postsSelector.postsSingleGetSelector(postId))
  const postsDelete = useSelector(state => state.posts.postsDelete)
  const postsGetTrendingPosts = useSelector(postsSelector.postsGetTrendingPostsSelector())

  navigation.setOptions({
    title: path(['params', 'post', 'postedBy', 'username'])(route),
  })

  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
  }, [postId])

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      dispatch(postsActions.postsReportPostViewsRequest({ postIds: [postId] }))
    })
  }, [])

  useEffect(() => {
    if (postsDelete.status === 'success') {
      dispatch(postsActions.postsDeleteIdle({}))
    }
    if (postsDelete.status === 'loading') {
      navigationActions.navigateBack(navigation)()
    }
  }, [postsDelete.status])

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
      })
    } catch (error) {}
  }

  const handleScrollNext = (index) => () => {
    try {
      feedRef.current.scrollToIndex({
        index: index + 1,
      })
    } catch (error) {}
  }

  /**
   * FlatList feed ref, used for scroll to top on tab bar press
   */
  const feedRef = useRef(null)
  useScrollToTop(feedRef)

  /**
   * Post header dropdown ref, used for header actions dropdown
   */
  const actionSheetRefs = useRef([])

  /**
   * Text only post ref, used for rendering textonly post component into image
   */
  const textPostRefs = useRef([])

  /**
   * FlatList feed config ref, used for reporting scroll events
   */
  const onViewableItemsChangedRef = useRef(onViewableItemsChanged)
  const viewabilityConfigRef = useRef({
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 30,
    waitForInteraction: false,
  })

  return children({
    postsSingleGet,
    postsGetTrendingPosts,
    postsSingleGetRequest,
    feedRef,
    handleScrollPrev,
    handleScrollNext,
    
    feedRef,
    actionSheetRefs,
    textPostRefs,
    onViewableItemsChangedRef,
    viewabilityConfigRef,
  })
}

export default PostMediaService
