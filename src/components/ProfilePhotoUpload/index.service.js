import { useEffect } from 'react'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import last from 'ramda/src/last'
import { pageHeaderLeft } from 'navigation/options'
import * as usersSelector from 'store/ducks/users/selectors'
import { useEffectWhenFocused } from 'services/hooks'

const ProfilePhotoUploadComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const postsCreateQueue = useSelector((state) => state.posts.postsCreateQueue)
  const usersCreateAvatar = useSelector(usersSelector.usersCreateAvatar)
  const cameraCapture = useSelector((state) => state.camera.cameraCapture)

  const activePhoto = pathOr({}, ['data', 0])(cameraCapture)
  const activeUpload = last(Object.values(postsCreateQueue))

  const usersCreateAvatarIdle = () => {
    dispatch(usersActions.usersCreateAvatarIdle())

    if (path(['payload', 'postId'])(activeUpload)) {
      dispatch(postsActions.postsCreateIdle(activeUpload))
    }
  }

  const handleClose = () => {
    usersCreateAvatarIdle()
    navigation.goBack()
  }

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
  const usersCreateAvatarSuccess = () => {
    const backRoute = path(['params', 'backRoute'], route)

    usersCreateAvatarIdle()

    if (backRoute) {
      navigation.navigate(backRoute)
    } else {
      navigation.goBack()
    }
  }

  useEffectWhenFocused(() => {
    if (usersCreateAvatar.status === 'success') {
      usersCreateAvatarSuccess()
    }
    if (usersCreateAvatar.status === 'failure') {
      handleClose()
    }
  }, [usersCreateAvatar.status])

  /**
   * Intended for profile photo upload
   * Will trigger when when camera queue has at least one photo
   */
  useEffect(() => {
    if (!activePhoto.uri) return

    dispatch(
      usersActions.usersCreateAvatarRequest({
        images: [activePhoto.uri],
        preview: [activePhoto.preview],
        takenInReal: activePhoto.takenInReal,
        imageFormat: activePhoto.imageFormat,
        originalFormat: activePhoto.originalFormat,
        originalMetadata: activePhoto.originalMetadata,
        crop: activePhoto.crop,
      }),
    )
  }, [activePhoto.uri])

  return children({
    activeUpload,
  })
}

export default ProfilePhotoUploadComponentService
