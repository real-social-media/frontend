import useCamera from 'services/providers/Camera'
import { useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as cameraActions from 'store/ducks/camera/actions'
import * as navigationActions from 'navigation/actions'
import path from 'ramda/src/path'
import { navigateToPath } from 'navigation/helpers'

const CameraService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  /**
   *
   */
  const handleProcessedPhoto = (payload) => {
    dispatch(cameraActions.cameraCaptureRequest(payload))
    const nextRoute = path(['params', 'nextRoute'])(route)
    const nextPayload = ({ type: 'IMAGE', photos: [payload[0].preview] }) 

    if (nextRoute) {
      navigateToPath(nextRoute)(navigation, nextPayload)
    } else {
      navigationActions.navigatePostCreate(navigation, nextPayload)
    } 
  }
 
  const camera = useCamera({
    handleProcessedPhoto,
  })

  return children(camera)
}

export default CameraService
