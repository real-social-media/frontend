import { useSelector, useDispatch } from 'react-redux'
import { handleGallery } from 'components/Camera/index.service'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as postsActions from 'store/ducks/posts/actions'
import path from 'ramda/src/path'

const AuthPhotoComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  const postsCreateQueue = useSelector(state => state.posts.postsCreateQueue)
  
  const cancelActiveUploads = () =>
    (Object.values(postsCreateQueue) || [])
      .filter(path(['payload', 'postId']))
      .forEach(post =>
        dispatch(postsActions.postsCreateIdle(post))
      )

  /**
   *
   */
  const handleLibrarySnap = async () => {
    cancelActiveUploads()

    const photos = await handleGallery('1:1', false)
  
    if (!photos.length) {
      return
    }
    
    dispatch(usersActions.usersEditProfileIdle({}))
    dispatch(cameraActions.cameraCaptureRequest(photos))
  
    if (route.params && route.params.nextRoute) {
      navigation.navigate(path(['params', 'nextRoute'])(route), { photos })
    } else {
      navigationActions.navigateAuthPhotoUpload(navigation, { type: 'IMAGE', photos })()
    }
  }

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
  	handleLibrarySnap,
    handleCameraSnap,
    formErrorMessage,
    handleErrorClose,
  })
}

export default AuthPhotoComponentService
