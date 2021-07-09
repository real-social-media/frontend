import CropPicker from 'react-native-image-crop-picker'
import mapSeries from 'async/mapSeries'
import { autoKeyboardClose, cropperOptions, requestPayload, handleError } from 'services/providers/Camera/helpers'
import { Platform } from 'react-native'
/**
 * Asset format definition is required for createPost graphql query
 */
const generateAssetFormat = (extension) => {
  if (extension && extension.toUpperCase().includes('HEIC')) {
    return 'HEIC'
  }
  return 'JPEG'
}

/**
 * react-native-image-crop-picker request object
 */
const pickerOptions = (multiple) => ({
  multiple: true,
  avoidEmptySpaceAroundImage: false,
  mediaType: 'photo',
  includeExif: true,
  compressImageQuality: 1,
  maxFiles: multiple ? 5 : 1,
})

const mapCropperResponse = async (selected, processor) => {
  const responses = Array.isArray(selected) ? selected : [selected]
  const mapped = await mapSeries(responses, processor)
  return mapped.filter((item) => item)
}

/**
 * Formatting react-native-image-crop-picker libs response
 * to match react-native-camera libs response
 *
 * note that selectedPhoto.fileSource is coming from manual code
 * which only works by applying a patch from patches/react-native-image-crop-picker
 */
const formatPickerResponse = (selectedPhoto) => {

  const extension = Platform.OS === 'ios' ?
    selectedPhoto.fileSource.split('?')[0].split('#')[0].split('.').pop()
    : selectedPhoto.path.split('?')[0].split('#')[0].split('.').pop()

  const format = generateAssetFormat(extension)

  const filename = Platform.OS === 'ios' ?
    selectedPhoto.filename
    : selectedPhoto.path.split('?')[0].split('#')[0].split('/').pop()

  return {
    format,
    extension,
    path: Platform.select({
      ios: selectedPhoto.fileSource,
      android: selectedPhoto.path,
    }) ,
    filename,
  }
}

const useLibrary = ({ handleProcessedPhoto = () => {}, multiple = true }) => {
  /**
   * Handle gallery photo selection
   */
  const handleLibrarySnap = async () => {
    const cameraState = { photoSize: '4:3' }

    /**
     * Image crop picker might eventually throw an error when user cancelled image selection
     */
    try {
      const selectedMedia = await CropPicker.openPicker(pickerOptions(multiple))
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
      handleError(error)
    }
  }

  return {
    handleLibrarySnap,
  }
}

export default useLibrary
