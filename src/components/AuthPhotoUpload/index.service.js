import { useEffect } from 'react'
import * as postsActions from 'store/ducks/posts/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import last from 'ramda/src/last'
import { logEvent } from 'services/Analytics'
import { pageHeaderLeft } from 'navigation/options'

const AuthPhotoUploadComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const postsCreate = useSelector(state => state.posts.postsCreate)
  const postsCreateQueue = useSelector(state => state.posts.postsCreateQueue)
  const cameraCapture = useSelector(state => state.camera.cameraCapture)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  
  /**
   *
   */
  const activePhoto = pathOr({}, ['data', 0])(cameraCapture)
  const activeUpload = last(Object.values(postsCreateQueue))

  /**
   *
   */
  const postsCreateRequest = ({
    images = [],
    takenInReal = false,
    originalFormat = 'jpg',
    originalMetadata = '',
    imageFormat = 'JPEG',
    crop = null,
  }) => {
    logEvent('POST_CREATE_REQUEST')

    const postId = uuid()
    const mediaId = uuid()

    dispatch(postsActions.postsCreateRequest({
      postId,
      postType: 'IMAGE',
      albumId: null,
      lifetime: '',
      mediaId,
      text: '',
      images,
      commentsDisabled: false,
      likesDisabled: true,
      sharingDisabled: false,
      verificationHidden: false,
      takenInReal,
      originalFormat,
      originalMetadata,
      imageFormat,
      crop,
      setAsUserPhoto: true,
      createdAt: dayjs().toJSON(),
      attempt: 0,
    }))

    dispatch(cameraActions.cameraCaptureIdle({ payload: { uri: images[0] } }))
  }

  /**
   *
   */
  useEffect(() => {
    if (
      !activePhoto.uri
    ) return

    postsCreateRequest({
      images: [activePhoto.uri],
      takenInReal: activePhoto.takenInReal,
      originalFormat: activePhoto.originalFormat,
    })
  }, [activePhoto.uri])

  /**
   *
   */
  useEffect(() => {
    if (postsCreate.status === 'success') {
      dispatch(usersActions.usersEditProfileRequest({ photoPostId: postsCreate.payload.postId }))
    }
  }, [postsCreate.status])

  /**
   *
   */
  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      logEvent('POST_CREATE_SUCCESS')
      dispatch(usersActions.usersEditProfileIdle({}))
      dispatch(authActions.authCheckIdle({ nextRoute: 'Root' }))
    }

    if (usersEditProfile.status === 'failure') {
      logEvent('POST_CREATE_FAILURE')
      navigationActions.navigateAuthPhotoError(navigation)()
    }

    if ((
      usersEditProfile.status === 'success' ||
      usersEditProfile.status === 'failure'
    ) && path(['payload', 'postId'])(activeUpload)) {
      dispatch(postsActions.postsCreateIdle(activeUpload))
    }
  }, [usersEditProfile.status])

  const formErrorMessage = usersEditProfile.error.text

  const handleErrorClose = () => {
    if (path(['payload', 'postId'])(activeUpload)) {
      dispatch(postsActions.postsCreateIdle(activeUpload))
    }
    dispatch(usersActions.usersEditProfileIdle({}))
    navigationActions.navigateAuthPhoto(navigation)()
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => pageHeaderLeft({ ...props, onPress: handleErrorClose }),
    })
  }, [])

  return children({
    formErrorMessage,
    activeUpload,
    postsCreateRequest,
    postsCreateQueue,
    handleErrorClose,
  })
}

export default AuthPhotoUploadComponentService
