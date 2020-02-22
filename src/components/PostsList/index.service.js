import { useEffect, useRef } from 'react'
import { InteractionManager } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import uuid from 'uuid/v4'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import { useNavigation } from '@react-navigation/native'
import path from 'ramda/src/path'
import intersection from 'ramda/src/intersection'

const PostsService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
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
  const usersGetPendingFollowers = useSelector(state => state.users.usersGetPendingFollowers)
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)

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

  const usersGetPendingFollowersRequest = (payload) => 
    dispatch(usersActions.usersGetPendingFollowersRequest(payload))

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
    usersGetPendingFollowersRequest({ userId: authUser.userId })
  }, [])

  const uploadPending = Object.values(postsCreateQueue)
    .filter(item => item.status === 'loading' || item.status === 'success')
    .filter(item => item.meta.progress === 100)

  useEffect(() => {
    const pending = uploadPending.map(item => item.payload.postId)
    const uploaded = postsFeedGet.data.map(item => item.postId)
    
    const complete = intersection(pending, uploaded)
    
    complete.forEach(postId => {
      dispatch(postsActions.postsCreateIdle({ payload: { postId } }))
    })
  }, [postsFeedGet.status === 'success'])

  useEffect(() => {
    usersGetPendingFollowersRequest({ userId: authUser.userId })
  }, [usersAcceptFollowerUser.status])

  useEffect(() => {
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
    postsDelete.status,
    postsArchive.status,
    postsRestoreArchived.status,
    postsFlag.status,
  ])

  const handleEditPress = (post) =>
    navigation.navigate('PostEdit', { post })

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
    usersGetPendingFollowers,
    onViewableItemsChanged,
    handleScrollPrev,
    handleScrollNext,
  })
}

export default PostsService
