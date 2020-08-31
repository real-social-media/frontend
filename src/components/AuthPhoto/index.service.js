import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as authActions from 'store/ducks/auth/actions'
import path from 'ramda/src/path'
import { logEvent } from 'services/Analytics'
import useCamera from 'services/providers/Camera'

const AuthPhotoComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const usersEditProfile = useSelector((state) => state.users.usersEditProfile)
  const postsCreateQueue = useSelector((state) => state.posts.postsCreateQueue)

  const cancelActiveUploads = () =>
    (Object.values(postsCreateQueue) || [])
      .filter(path(['payload', 'postId']))
      .forEach((post) => dispatch(postsActions.postsCreateIdle(post)))

  const skipPhotoUpload = () => {
    logEvent('POST_CREATE_SKIP')
    dispatch(usersActions.usersEditProfileIdle({}))
    dispatch(authActions.authCheckIdle({ nextRoute: 'Root' }))
  }

  /**
   *
   */
  const handleProcessedPhoto = (payload) => {
    dispatch(usersActions.usersEditProfileIdle({}))
    dispatch(cameraActions.cameraCaptureRequest(payload))
    navigationActions.navigateAuthPhotoUpload(navigation, { type: 'IMAGE', photos: [payload[0].preview] })()
  }

  const camera = useCamera({
    handleProcessedPhoto,
  })

  /**
   *
   */
  const handleCameraSnap = () => {
    cancelActiveUploads()
    dispatch(usersActions.usersEditProfileIdle({}))
    navigationActions.navigateAuthCamera(navigation, { nextRoute: 'AuthPhotoUpload' })()
  }

  const formErrorMessage = usersEditProfile.error.text

  const handleErrorClose = () => dispatch(usersActions.usersEditProfileIdle({}))

  return children({
    handleLibrarySnap: camera.handleLibrarySnap,
    handleCameraSnap,
    formErrorMessage,
    handleErrorClose,
    skipPhotoUpload,
  })
}

export default AuthPhotoComponentService
