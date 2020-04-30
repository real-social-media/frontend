import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsActions from 'store/ducks/posts/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as authActions from 'store/ducks/auth/actions'
import { useNavigation } from '@react-navigation/native'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import { handleGallery } from 'components/Camera/index.service'

const OnboardPhotoService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  const postsCreateQueue = useSelector(state => state.posts.postsCreateQueue)
  const postsCreate = useSelector(state => state.posts.postsCreate)

  const postsCreateIdle = (payload) =>
    dispatch(postsActions.postsCreateIdle({ payload }))

  const [profileEditing, setProfileEditing] = useState(false)

  useEffect(() => {
    if (postsCreate.status === 'success') {
      setProfileEditing(true)
      dispatch(usersActions.usersEditProfileRequest({ photoPostId: postsCreate.payload.postId }))
      setProfileEditing(false)
    }
  }, [postsCreate.status])

  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle())
      dispatch(authActions.authCheckIdle({ nextRoute: 'Root' }))
      dispatch(postsActions.postsCreateIdle({ payload: postsCreate.payload }))
    }
    if (usersEditProfile.status === 'failure') {
      dispatch(postsActions.postsCreateIdle({ payload: postsCreate.payload }))
    }
  }, [usersEditProfile.status])

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
      setAsUserPhoto,
      createdAt: dayjs().toJSON(),
      attempt: 0,
    }))

    if (postType === 'IMAGE') {
      dispatch(cameraActions.cameraCaptureIdle({ payload: { uri: images[0] } }))
    }
  }

  const cameraCaptureRequest = (payload) =>
    dispatch(cameraActions.cameraCaptureRequest(payload))

  const cameraCaptureIdle = (payload) =>
    dispatch(cameraActions.cameraCaptureIdle({ payload }))

  const handleLibrarySnap = async () => {
    const photos = await handleGallery()
  
    if (!photos.length) {
      return
    }
    
    cameraCaptureRequest(photos)
  
    if (route.params && route.params.nextRoute) {
      navigation.navigate(path(['params', 'nextRoute'])(route), { photos })
    } else {
      navigationActions.navigateOnboardPhoto(navigation, { type: 'IMAGE', photos })()
    }
  }

  return children({
    user,
    profileEditing,
    cameraCapture,
    postsCreateIdle,
    postsCreateRequest,
    postsCreateQueue,
    cameraCaptureIdle,
    usersEditProfile,
    handleLibrarySnap,
  })
}

export default OnboardPhotoService
