import { useSelector, useDispatch } from 'react-redux'
import { handleGallery } from 'components/Camera/index.service'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import path from 'ramda/src/path'

const AuthPhotoComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  
  /**
   *
   */
  const handleLibrarySnap = async () => {
    const photos = await handleGallery()
  
    if (!photos.length) {
      return
    }
    
    dispatch(cameraActions.cameraCaptureRequest(photos))
  
    if (route.params && route.params.nextRoute) {
      navigation.navigate(path(['params', 'nextRoute'])(route), { photos })
    } else {
      navigationActions.navigateAuthPhotoUpload(navigation, { type: 'IMAGE', photos })()
    }
  }

  const formErrorMessage = usersEditProfile.error.text

  return children({
  	handleLibrarySnap,
    formErrorMessage,
  })
}

export default AuthPhotoComponentService
