import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as authActions from 'store/ducks/auth/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as navigationActions from 'navigation/actions'
import useCamera from 'services/providers/Camera'

const SettingsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const authSignout = useSelector((state) => state.auth.authSignout)
  const user = useSelector(authSelector.authUserSelector)

  const authSignoutRequest = () => dispatch(authActions.authSignoutRequest())

  const handleProcessedPhoto = (payload) => {
    dispatch(cameraActions.cameraCaptureRequest(payload))
    navigationActions.navigateProfilePhotoUpload(navigation, { type: 'IMAGE', photos: [payload[0].preview] })()
  }

  const camera = useCamera({
    handleProcessedPhoto,
  })

  return children({
    user,
    authSignout,
    authSignoutRequest,
    handleLibrarySnap: camera.handleLibrarySnap,
  })
}

export default SettingsService
