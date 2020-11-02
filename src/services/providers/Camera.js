import { useState, useRef } from 'react'
import { Keyboard } from 'react-native'
import { useSelector } from 'react-redux'
import useToggle from 'react-use/lib/useToggle'
import CropPicker from 'react-native-image-crop-picker'
import { getScreenAspectRatio } from 'services/Dimensions'
import mapSeries from 'async/mapSeries'
import * as Logger from 'services/Logger'
import * as postsSelector from 'store/ducks/posts/selectors'

/**
 * We use it for prevent open keyboard after crop
 * https://github.com/ivpusic/react-native-image-crop-picker/issues/1273
 */
const autoKeyboardClose = () => {
  Keyboard.dismiss()
}

/**
 * Asset format definition is required for createPost graphql query
 */
export const generateAssetFormat = (extension) => {
  if (extension && extension.toUpperCase().includes('HEIC')) {
    return 'HEIC'
  }
  return 'JPEG'
}

/**
 * Formatting react-native-image-crop-picker libs response
 * to match react-native-camera libs response
 *
 * note that selectedPhoto.fileSource is coming from manual code
 * which only works by applying a patch from patches/react-native-image-crop-picker
 */
export const formatPickerResponse = (selectedPhoto) => {
  const extension = selectedPhoto.fileSource.split('?')[0].split('#')[0].split('.').pop()
  const format = generateAssetFormat(extension)

  return {
    format,
    extension,
    path: selectedPhoto.fileSource,
    filename: selectedPhoto.filename,
  }
}

/**
 * Formatting crop coordinates to match graphql supported format
 */
export const formatCropCoordinates = (cropRect) => ({
  lowerRight: { x: cropRect.x + cropRect.width, y: cropRect.y + cropRect.height },
  upperLeft: { x: cropRect.x, y: cropRect.y },
})

export const useCameraState = () => {
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
   * react-native-camera request object
   */
  const cameraOptions = () => ({
    quality: 1,
    base64: false,
    writeExif: true,
    exif: true,
    mirrorImage: false,
  })

  /**
   * react-native-image-crop-picker request object
   */
  const cropperOptions = (state, snappedPhoto) => ({
    avoidEmptySpaceAroundImage: false,
    path: snappedPhoto.path || snappedPhoto.uri,
    width: getScreenAspectRatio(state.photoSize, snappedPhoto.width).x,
    height: getScreenAspectRatio(state.photoSize, snappedPhoto.width).y,
    includeExif: true,
    compressImageQuality: 1,
  })

  /**
   * graphql request object
   */
  const requestPayload = (type = 'gallery') => (state, snappedPhoto, croppedPhoto) => ({
    uri: (snappedPhoto.uri || snappedPhoto.path).replace('file://', ''),
    preview: (croppedPhoto.path || croppedPhoto.path).replace('file://', ''),
    originalFormat: snappedPhoto.extension || 'jpg',
    imageFormat: snappedPhoto.format || 'JPEG',
    crop: formatCropCoordinates(croppedPhoto.cropRect),
    originalMetadata: JSON.stringify(snappedPhoto.exif),
    takenInReal: type === 'camera',
    photoSize: state.photoSize,
  })

  /**
   * react-native-image-crop-picker request object
   */
  const pickerOptions = (multiple) => ({
    multiple: Boolean(multiple),
    avoidEmptySpaceAroundImage: false,
    mediaType: 'photo',
    includeExif: true,
    compressImageQuality: 1,
  })

  /**
   * Handle camera photo capture
   */
  const handleCameraSnap = async () => {
    /**
     * Camera module might eventually throw an error when camera is not initialized on native side
     */
    try {
      if (!cameraRef.current) return
      cameraRef.current.pausePreview()
      const snappedPhoto = await cameraRef.current.takePictureAsync(cameraOptions())
      const croppedPhoto = await CropPicker.openCropper(cropperOptions(cameraState, snappedPhoto))
      const payload = await requestPayload('camera')(cameraState, snappedPhoto, croppedPhoto)
      handleProcessedPhoto([payload])
      cameraRef.current.resumePreview()
      autoKeyboardClose()
    } catch (error) {
      Logger.captureException(error)
    }
  }

  const mapCropperResponse = async (selected, processor) => {
    const responses = Array.isArray(selected) ? selected : [selected]
    const mapped = await mapSeries(responses, processor)
    return mapped.filter((item) => item)
  }

  /**
   * Handle gallery photo selection
   */
  const handleLibrarySnap = async () => {
    /**
     * Image crop picker might eventually throw an error when user cancelled image selection
     */
    try {
      const selectedMedia = await CropPicker.openPicker(pickerOptions(true))
      const payloadSeries = await mapCropperResponse(selectedMedia, async (selectedPhoto, callback) => {
        const tempPhoto = formatPickerResponse(selectedPhoto)
        const snappedPhoto = { ...selectedPhoto, ...tempPhoto }
        const croppedPhoto = await CropPicker.openCropper(cropperOptions(cameraState, selectedPhoto))
        const payload = requestPayload('gallery')(cameraState, snappedPhoto, croppedPhoto)
        autoKeyboardClose()
        callback(null, payload)
      })

      return handleProcessedPhoto(payloadSeries)
    } catch (error) {
      Logger.captureException(error)
    }
  }

  return {
    handleCameraSnap,
    handleLibrarySnap,
    cameraRef,
    ...cameraState,
  }
}

export default useCamera
