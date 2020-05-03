import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsActions from 'store/ducks/posts/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as navigationActions from 'navigation/actions'
import { useNavigation } from '@react-navigation/native'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

const ProfilePhotoService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersImagePostsGet = useSelector(state => state.users.usersImagePostsGet)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  const postsCreateQueue = useSelector(state => state.posts.postsCreateQueue)
  

  const postsCreateIdle = (payload) =>
    dispatch(postsActions.postsCreateIdle({ payload }))

  const usersImagePostsGetRequest = (payload) =>
    dispatch(usersActions.usersImagePostsGetRequest(payload))

  const usersEditProfileRequest = () =>
    dispatch(usersActions.usersEditProfileRequest({ photoPostId: selectedPost.postId }))

  useEffect(() => {
    usersImagePostsGetRequest({ userId: user.userId })
  }, [])

  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      navigationActions.navigateProfileSelf(navigation)()
      dispatch(usersActions.usersEditProfileIdle())
    }
  }, [usersEditProfile.status])

  const [selectedPost, setSelectedPost] = useState({})
  const handlePostPress = (post) => setSelectedPost(post)

  /**
   * 
   */
  const cameraCapture = useSelector(state => state.camera.cameraCapture)

  const postsCreateRequest = ({
    albumId = null,
    postType = 'IMAGE',
    text = '',
    images = [],
    lifetime = '',
    commentsDisabled = false,
    likesDisabled = true,
    sharingDisabled = false,
    verificationHidden = false,
    takenInReal = false,
    originalFormat = 'jpg',
    originalMetadata = '',
    setAsUserPhoto = true,
  }) => {
    const postId = uuid()
    const mediaId = uuid()

    dispatch(postsActions.postsCreateRequest({
      postId,
      postType,
      albumId,
      lifetime,
      mediaId,
      text,
      images,
      commentsDisabled,
      likesDisabled,
      sharingDisabled,
      verificationHidden,
      takenInReal,
      originalFormat,
      originalMetadata,
      createdAt: dayjs().toJSON(),
      attempt: 0,
      setAsUserPhoto,
    }))

    if (postType === 'IMAGE') {
      dispatch(cameraActions.cameraCaptureIdle({ payload: { uri: images[0] } }))
    }
  }

  return children({
    user,
    usersImagePostsGet,
    usersImagePostsGetRequest,
    handlePostPress,
    selectedPost,
    usersEditProfileRequest,

    cameraCapture,
    postsCreateIdle,
    postsCreateRequest,
    postsCreateQueue,
  })
}

export default ProfilePhotoService
