import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'uuid/v4'
import * as postsActions from 'store/ducks/posts/actions'
import * as layoutActions from 'store/ducks/layout/actions'
import { withNavigation } from 'react-navigation'
import useDebounce from 'react-use/lib/useDebounce'

const PostsService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.user)
  const postsFeedGet = useSelector(state => state.posts.postsFeedGet)
  const postsDelete = useSelector(state => state.posts.postsDelete)
  const postsArchive = useSelector(state => state.posts.postsArchive)
  const postsRestoreArchived = useSelector(state => state.posts.postsRestoreArchived)
  const postsAnonymouslyLike = useSelector(state => state.posts.postsAnonymouslyLike)
  const postsOnymouslyLike = useSelector(state => state.posts.postsOnymouslyLike)
  const postsDislike = useSelector(state => state.posts.postsDislike)
  const postsFlag = useSelector(state => state.posts.postsFlag)
  const postsCreate = useSelector(state => state.posts.postsCreate)
  const postsCreateQueue = useSelector(state => state.posts.postsCreateQueue)
  const layoutPostsListItem = useSelector(state => state.layout.layoutPostsListItem)
  const layoutPostsListScroll = useSelector(state => state.layout.layoutPostsListScroll)

  const feedRef = useRef(null)

  const postsFeedGetRequest = (payload) =>
    dispatch(postsActions.postsFeedGetRequest(payload))

  const postsFeedGetMoreRequest = (payload) =>
    dispatch(postsActions.postsFeedGetMoreRequest(payload))
  
  const postsShareRequest = (payload) =>
    dispatch(postsActions.postsShareRequest(payload))

  const postsAnonymouslyLikeRequest = (payload) =>
    dispatch(postsActions.postsAnonymouslyLikeRequest(payload))

  const postsOnymouslyLikeRequest = (payload) =>
    dispatch(postsActions.postsOnymouslyLikeRequest(payload))

  const postsDislikeRequest = (payload) =>
    dispatch(postsActions.postsDislikeRequest(payload))

  const postsArchiveRequest = (payload) =>
    dispatch(postsActions.postsArchiveRequest(payload))

  const postsRestoreArchivedRequest = (payload) =>
    dispatch(postsActions.postsRestoreArchivedRequest(payload))

  const postsFlagRequest = (payload) =>
    dispatch(postsActions.postsFlagRequest(payload))
  
  const postsDeleteRequest = (payload) =>
    dispatch(postsActions.postsDeleteRequest(payload))

  const layoutPostsListItemSuccess = (payload) =>
    dispatch(layoutActions.layoutPostsListItemSuccess(payload))

  const layoutPostsListScrollSuccess = (payload) =>
    dispatch(layoutActions.layoutPostsListScrollSuccess(payload))

  const postsCreateRequest = (post) => {
    const postId = uuid()
    const mediaId = uuid()
    dispatch(postsActions.postsCreateRequest({
      ...post,
      postId,
      mediaId,
    }))
  }

  const postsCreateIdle = (payload) =>
    dispatch(postsActions.postsCreateIdle({ payload }))

  const scrollToTop = () => {
    if (!feedRef.current || typeof feedRef.current.scrollToOffset !== 'function') { return }
    feedRef.current.scrollToOffset({ animated: true, offset: 0 })
  }

  useEffect(() => {
    navigation.setParams({
      scrollToTop,
    })
    postsFeedGetRequest({ limit: 6 })
  }, [])

  useEffect(() => {
    if (postsCreate.status === 'success') {
      dispatch(postsActions.postsFeedGetRequest({}))
      dispatch(postsActions.postsCreateIdle({ payload: postsCreate.payload }))
    }

    if (postsDelete.status === 'success') {
      dispatch(postsActions.postsDeleteIdle())
    }

    if (postsArchive.status === 'success') {
      dispatch(postsActions.postsArchiveIdle())
    }

    if (postsRestoreArchived.status === 'success') {
      dispatch(postsActions.postsRestoreArchivedIdle())
      navigation.goBack()
    }

    if (postsFlag.status === 'success') {
      dispatch(postsActions.postsFlagIdle())
    }
  }, [
    postsCreate.status,
    postsDelete.status,
    postsArchive.status,
    postsRestoreArchived.status,
    postsFlag.status,
  ])

  const handleEditPress = (post) =>
    navigation.navigate('PostEdit', { post })

  /**
   * 
   */
  useDebounce(() => {
    const range = Object.keys(layoutPostsListItem.data)
    const goal = layoutPostsListScroll.data.y
    
    if (!range.length || !goal) { return }
    
    const closest = range.reduce((prev, curr) =>
      (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
    )
    
    const postId = layoutPostsListItem.data[closest].postId
    dispatch(postsActions.postsReportPostViewsRequest({ postIds: [postId] }))
  }, 1000, [layoutPostsListScroll.data.y])

  return children({
    feedRef,
    authUser,
    postsFeedGet,
    postsFeedGetRequest,
    postsFeedGetMoreRequest,
    postsShareRequest,
    postsAnonymouslyLike,
    postsAnonymouslyLikeRequest,
    postsOnymouslyLike,
    postsOnymouslyLikeRequest,
    postsDislike,
    postsDislikeRequest,
    handleEditPress,
    postsArchive,
    postsArchiveRequest,
    postsRestoreArchived,
    postsRestoreArchivedRequest,
    postsFlag,
    postsFlagRequest,
    postsDelete,
    postsDeleteRequest,
    postsCreate,
    postsCreateRequest,
    postsCreateIdle,
    postsCreateQueue,
    layoutPostsListItemSuccess,
    layoutPostsListItem,
    layoutPostsListScroll,
    layoutPostsListScrollSuccess,
  })
}

export default withNavigation(PostsService)
