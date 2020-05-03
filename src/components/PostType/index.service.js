import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import * as navigationActions from 'navigation/actions'
import { handleGallery } from 'components/Camera/index.service'
import * as cameraActions from 'store/ducks/camera/actions'

const PostTypeService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const cameraCaptureRequest = (payload) =>
    dispatch(cameraActions.cameraCaptureRequest(payload))
  
  const handleLibrarySnap = async () => {
    const photos = await handleGallery()
  
    if (!photos.length) {
      return
    }
    
    cameraCaptureRequest(photos)
  
    if (route.params && route.params.nextRoute) {
      navigation.navigate(path(['params', 'nextRoute'])(route), { photos })
    } else {
      navigationActions.navigatePostCreate(navigation, { type: 'IMAGE', photos })()
    }
  }

  return children({
    handleLibrarySnap,
  })
}

export default PostTypeService
