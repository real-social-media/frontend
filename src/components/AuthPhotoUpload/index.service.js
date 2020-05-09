import { useEffect, useCallback } from 'react'
import * as postsActions from 'store/ducks/posts/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import pathOr from 'ramda/src/pathOr'
import last from 'ramda/src/last'

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
  }) => {
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
      dispatch(usersActions.usersEditProfileIdle())
      dispatch(postsActions.postsCreateIdle({ payload: postsCreate.payload }))
      dispatch(authActions.authCheckIdle({ nextRoute: 'Root' }))
    }
  }, [usersEditProfile.status])

  /**
   *
   */
  useFocusEffect(
    useCallback(() => {
      dispatch(postsActions.postsCreateIdle({ payload: postsCreate.payload }))
      dispatch(usersActions.usersEditProfileIdle())

      return () => {
        dispatch(postsActions.postsCreateIdle({ payload: postsCreate.payload }))
        dispatch(usersActions.usersEditProfileIdle())
      }
    }, [])
  )

  const formErrorMessage = usersEditProfile.error.text

  return children({
    formErrorMessage,
    activeUpload,
    postsCreateRequest,
    postsCreateQueue,
  })
}

export default AuthPhotoUploadComponentService
