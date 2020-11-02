import { useEffect } from 'react'
import { Alert } from 'react-native'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import useUpload, { useUploadState } from 'services/providers/Upload'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import path from 'ramda/src/path'
import { pageHeaderLeft } from 'navigation/options'

const ProfilePhotoUploadComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const postsCreateQueue = useSelector((state) => state.posts.postsCreateQueue)
  const usersEditProfile = useSelector((state) => state.users.usersEditProfile)

  const clearProfilePhotoUpload = () => {
    dispatch(usersActions.usersEditProfileIdle({}))

    if (path(['payload', 'postId'])(activeUpload)) {
      dispatch(postsActions.postsCreateIdle(activeUpload))
    }
  }

  /**
   * Create a post first and then set photoPostId
   */
  const handleUploadSuccess = (postsCreate) => {
    dispatch(usersActions.usersEditProfileRequest({ photoPostId: postsCreate.payload.postId }))
  }

  const handleUploadFailure = () => {
    Alert.alert(
      'Profile Picture Upload Failed',
      'Please try again',
      [
        {
          text: 'Got it',
          onPress: handleClose,
          style: 'cancel',
        },
      ],
      { cancelable: true },
    )
  }

  const { handlePostUpload } = useUpload({})
  const { activeUpload, activePhoto } = useUploadState({
    handleUploadSuccess,
    handleUploadFailure,
  })

  /**
   *
   */
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        pageHeaderLeft({
          onPress: handleClose,
        }),
    })
  }, [])

  /**
   * Profile photo change event listener
   * Once photo is uploaded usersEditProfile action must be dispatched with uploaded postId to set profile photo
   */
  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      handleClose()
    }
  }, [usersEditProfile.status])

  /**
   * Intended for profile photo upload
   * Will trigger when when camera queue has at least one photo
   */
  useEffect(() => {
    if (!activePhoto.uri) return

    handlePostUpload({
      images: [activePhoto.uri],
      preview: [activePhoto.preview],
      takenInReal: activePhoto.takenInReal,
      imageFormat: activePhoto.imageFormat,
      originalFormat: activePhoto.originalFormat,
      originalMetadata: activePhoto.originalMetadata,
      crop: activePhoto.crop,
    })
  }, [activePhoto.uri])

  const formErrorMessage = usersEditProfile.error.text

  const handleClose = () => {
    clearProfilePhotoUpload()
    navigation.goBack()
  }

  return children({
    formErrorMessage,
    activeUpload,
    postsCreateQueue,
    handleClose,
  })
}

export default ProfilePhotoUploadComponentService
