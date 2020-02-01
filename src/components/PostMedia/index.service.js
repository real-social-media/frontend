import { useEffect, useRef, useState } from 'react'
import { InteractionManager } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import * as layoutActions from 'store/ducks/layout/actions'
import { withNavigation } from 'react-navigation'
import path from 'ramda/src/path'

const PostMediaService = ({ children, navigation, ...props }) => {
  const dispatch = useDispatch()
  const postId = path(['postId'])(navigation.getParam('post'))
  const userId = path(['postedBy', 'userId'])(navigation.getParam('post'))
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)
  const postsDelete = useSelector(state => state.posts.postsDelete)
  const postsGetTrendingPosts = useSelector(state => state.posts.postsGetTrendingPosts)
  const postsGetCache = useSelector(state => state.posts.postsGetCache)

  const [viewMore, setViewMore] = useState(true)
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

  const handleViewMorePosts = () => {
  }

  return children({
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, navigation.getParam('post')),
    postsGetTrendingPosts: postsServices.cachedPostsGetTrendingPosts(postsGetTrendingPosts, postId),
    postsSingleGetRequest,
    ...props,
    postsMediaFeedGet: postsServices.cachedPostsMediaFeedGet(postsGetCache, userId, postId),
    viewMore,
    handleViewMorePosts,
    feedRef,
    routeName: navigation.getParam('routeName'),
  })
}

export default withNavigation(PostMediaService)
