import { useRef, useState } from 'react'
import CropPicker from 'react-native-image-crop-picker'
import { useSelector } from 'react-redux'
import useToggle from 'react-use/lib/useToggle'
import * as postsSelector from 'store/ducks/posts/selectors'
import { autoKeyboardClose, cropperOptions, requestPayload, handleError } from 'services/providers/Camera/helpers'
import { Platform } from 'react-native'
/**
 * react-native-camera request object
 */
const cameraOptions = () => ({
  quality: 1,
  base64: false,
  writeExif: true,
  exif: true,
  mirrorImage: false,
})

const useCameraState = () => {
  const postsCreate = useSelector(postsSelector.postsCreate)
  const [flashMode, handleFlashToggle] = useToggle(false)
  const [flipMode, handleFlipToggle] = useToggle(false)
  const [photoSize, setPhotoSize] = useState('4:3')

  return {
    postsCreate,
    flashMode,
    handleFlashToggle,
    flipMode,
    handleFlipToggle,
    photoSize,
    setPhotoSize,
  }
}

const useCamera = ({ handleProcessedPhoto = () => {} }) => {
  const cameraState = useCameraState()
  const cameraRef = useRef(null)

  /**
   * Handle camera photo capture
   */
  const handleCameraSnap = async () => {
    /**
     * Camera module might eventually throw an error when camera is not initialized on native side
     */
    try {
      if (!cameraRef.current) return
      Platform.OS == 'ios' && cameraRef.current.pausePreview()
      const snappedPhoto = await cameraRef.current.takePictureAsync(cameraOptions())
      const croppedPhoto = await CropPicker.openCropper(cropperOptions(cameraState, snappedPhoto))
      const payload = await requestPayload('camera')(cameraState, snappedPhoto, croppedPhoto)
      handleProcessedPhoto([payload])
      Platform.OS == 'ios' && cameraRef.current.resumePreview()
      autoKeyboardClose()

    } catch (error) {
      handleError(error)
    }
  }

  return {
    handleCameraSnap,
    cameraRef,
    ...cameraState,
  }
}

export default useCamera
