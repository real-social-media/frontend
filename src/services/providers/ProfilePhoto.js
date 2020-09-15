import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as cameraActions from 'store/ducks/camera/actions'
import * as navigationActions from 'navigation/actions'
import useCamera from 'services/providers/Camera'

function useProfilePhoto() {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const camera = useCamera({
    handleProcessedPhoto: (payload) => {
      dispatch(cameraActions.cameraCaptureRequest(payload))
      navigationActions.navigateProfilePhotoUpload(navigation, { type: 'IMAGE', photos: [payload[0].preview] })()
    },
  })

  const handleCameraSnap = navigationActions.navigateCamera(navigation, { nextRoute: 'ProfilePhotoUpload' })
  const handleSkipUpload = () => navigation.replace('Settings')
  const handleLibrarySnap = () => camera.handleLibrarySnap(false)

  return {
    handleLibrarySnap,
    handleCameraSnap,
    handleSkipUpload,
  }
}

export default useProfilePhoto
