import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import * as navigationActions from 'navigation/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import useCamera from 'services/providers/Camera'
import { VERIFICATION_TYPE } from 'components/Verification'
import * as VerificationStorage from 'components/Verification/storage'
import { AuthContext } from 'services/providers/Auth'

const PostTypeService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)

  const handleProcessedPhoto = (payload) => {
    dispatch(cameraActions.cameraCaptureRequest(payload))
    navigationActions.navigatePostCreate(navigation, { type: 'IMAGE', photos: [payload[0].preview] })
  }

  const camera = useCamera({
    handleProcessedPhoto,
  })

  const handleClose = () => navigation.popToTop()
  const openGallery = () => camera.handleLibrarySnap(true)

  const handleLibrarySnap = async () => {
    handleClose()

    if (await VerificationStorage.isSkipped()) {
      openGallery()
    } else {
      navigationActions.navigateVerification(navigation, {
        actionType: VERIFICATION_TYPE.CONTINUE,
        handleNext: openGallery,
      })()

      await VerificationStorage.skipNextTime()
    }
  }

  const handlePhotoTab = () => {
    handleClose()
    navigationActions.navigateCamera(navigation, {}, { protected: true, user })()
  }

  const handleTextPostTab = () => {
    handleClose()
    navigationActions.navigatePostCreate(navigation, { type: 'TEXT_ONLY' })
  }

  return children({
    handleLibrarySnap,
    handlePhotoTab,
    handleTextPostTab,
    handleClose,
  })
}

export default PostTypeService
