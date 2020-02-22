import { useEffect, useRef } from 'react'
import { InteractionManager } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'

const PostMediaService = ({ children,, ...props }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postId = path(['params', 'post', 'postId'])(route)
  const userId = path(['params', 'post', 'postedBy', 'userId'])(route)
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)
  const postsDelete = useSelector(state => state.posts.postsDelete)
  const postsGetTrendingPosts = useSelector(state => state.posts.postsGetTrendingPosts)
  const postsGetCache = useSelector(state => state.posts.postsGetCache)

  const feedRef = useRef()

  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId }))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId }))
  }, [postId])

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      dispatch(postsActions.postsReportPostViewsRequest({ postIds: [postId] }))
    })
  }, [])

  useEffect(() => {
    if (postsDelete.status === 'success') {
      dispatch(postsActions.postsDeleteIdle())
    }
    if (postsDelete.status === 'loading') {
      navigation.goBack()
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

  return children({
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, path(['params', 'post'])(route)),
    postsGetTrendingPosts: postsServices.cachedPostsGetTrendingPosts(postsGetTrendingPosts, postId),
    postsSingleGetRequest,
    ...props,
    postsMediaFeedGet: postsServices.cachedPostsMediaFeedGet(postsGetCache, userId, postId),
    feedRef,
    routeName: route.name,
    onViewableItemsChanged,
    handleScrollPrev,
    handleScrollNext,
  })
}

export default PostMediaService
