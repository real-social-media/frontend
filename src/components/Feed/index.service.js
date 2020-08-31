import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import { useScrollToTop } from '@react-navigation/native'
import pathOr from 'ramda/src/pathOr'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsSelector from 'store/ducks/posts/selectors'
import useUpload from 'services/providers/Upload'

const FeedService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const postsFeedGet = useSelector(postsSelector.postsFeedGetSelector())
  const postsCreate = useSelector((state) => state.posts.postsCreate)
  const postsCreateQueue = useSelector((state) => state.posts.postsCreateQueue)
  const postsGetTrendingPosts = useSelector(postsSelector.postsGetTrendingPostsSelector())

  const postsFeedGetRequest = (payload) => dispatch(postsActions.postsFeedGetRequest(payload))

  const postsFeedGetMoreRequest = (payload) => dispatch(postsActions.postsFeedGetMoreRequest(payload))

  const { handlePostUpload } = useUpload({
    handlePostUploadStarted: () => {},
  })

  const postsCreateRequest = handlePostUpload

  const postsCreateIdle = (payload) => dispatch(postsActions.postsCreateIdle(payload))

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
  const bookmarkSeparatorIndex = pathOr([], ['data'])(postsFeedGet).findIndex((post) => post.viewedStatus === 'VIEWED')

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

  const createActionSheetRef = (post) => (element) => {
    if (!actionSheetRefs.current[post.postId]) {
      actionSheetRefs.current[post.postId] = element
    }
  }

  const getActionSheetRef = (post) => actionSheetRefs.current[post.postId]

  const createTextPostRef = (post) => (element) => {
    if (!textPostRefs.current[post.postId]) {
      textPostRefs.current[post.postId] = element
    }
  }

  const getTextPostRef = (post) => textPostRefs.current[post.postId]

  return children({
    user,
    postsFeedGet,
    postsFeedGetRequest,
    postsFeedGetMoreRequest,
    postsCreate,
    postsCreateRequest,
    postsCreateIdle,
    postsCreateQueue,
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
