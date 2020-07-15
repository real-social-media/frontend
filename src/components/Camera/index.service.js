import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useToggle from 'react-use/lib/useToggle'
import * as cameraActions from 'store/ducks/camera/actions'
import { useNavigation, useRoute } from '@react-navigation/native'
import CropPicker from 'react-native-image-crop-picker'
import { getScreenAspectRatio } from 'services/Camera'
import series from 'async/series'
import * as navigationActions from 'navigation/actions'
import path from 'ramda/src/path'
import * as AssetService from 'services/Asset'

const cameraManager = (cameraRef) => ({
  resumePreview: props => {
    try {
      return cameraRef.current.resumePreview(props)
    } catch (error) {
    }
  },
  pausePreview: props => {
    try {
      return cameraRef.current.pausePreview(props)
    } catch (error) {
    }
  },
  takePictureAsync: props => {
    try {
      return cameraRef.current.takePictureAsync(props)
    } catch (error) {
    }
  },
})

export const handleGallery = async (photoSize = '1:1', multiple = false) => {
  try {
    const selected = await CropPicker.openPicker({
      multiple,
      avoidEmptySpaceAroundImage: false,
      mediaType: 'photo',
      includeExif: true,
      compressImageQuality: 1,
    })

    const responses = Array.isArray(selected) ? selected : [selected]
  
    const cropped = await series(
      responses.map(response => async (callback) => {
        const cropperOptions = ({
          avoidEmptySpaceAroundImage: false,
          path: response.path,
          width: getScreenAspectRatio(photoSize, response.width).x,
          height: getScreenAspectRatio(photoSize, response.width).y,
          includeExif: true,
          compressImageQuality: 1,
        })
        const sourcePhoto = await AssetService.getAssetFileAbsolutePath(response.localIdentifier, response.filename)
        const croppedPhoto = await CropPicker.openCropper(cropperOptions)
        const croppedCoords = AssetService.generateCroppedCoordinates(croppedPhoto.cropRect)

        callback(null, {
          uri: sourcePhoto.path,
          preview: croppedPhoto.path,
          originalFormat: sourcePhoto.extension,
          crop: croppedCoords,
          originalMetadata: JSON.stringify(response.exif),
          imageFormat: sourcePhoto.imageFormat,
          takenInReal: false,
          photoSize,
        })
      })
    )

    return cropped.filter(item => item)
  } catch (error) {
    return []
  }
}

const CameraService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postsCreate = useSelector(state => state.posts.postsCreate)
  
  const [flashMode, handleFlashToggle] = useToggle(false)
  const [flipMode, handleFlipToggle] = useToggle(false)

  const cameraRef = useRef(null)
  const camera = cameraManager(cameraRef)

  const [photoSize, setPhotoSize] = useState('4:3')

  const handleCameraSnap = async () => {
    if (!cameraRef.current) { return }

    camera.pausePreview()

    try {
      const snappedPhoto = await camera.takePictureAsync({
        quality: 1,
        base64: false,
        writeExif: true,
        exif: true,
        mirrorImage: false,
      })

      const cropperOptions = ({
        avoidEmptySpaceAroundImage: false,
        path: snappedPhoto.uri,
        width: getScreenAspectRatio(photoSize, snappedPhoto.width).x,
        height: getScreenAspectRatio(photoSize, snappedPhoto.width).y,
        includeExif: true,
        compressImageQuality: 1,
      })

      const croppedPhoto = await CropPicker.openCropper(cropperOptions)
      const croppedCoords = AssetService.generateCroppedCoordinates(croppedPhoto.cropRect)

      dispatch(cameraActions.cameraCaptureRequest([{
        uri: snappedPhoto.uri,
        preview: croppedPhoto.path,
        originalFormat: 'jpg',
        crop: croppedCoords,
        originalMetadata: JSON.stringify(snappedPhoto.exif),
        imageFormat: 'JPEG',
        takenInReal: false,
        photoSize,
      }]))

      if (route.params && route.params.nextRoute) {
        navigation.navigate(path(['params', 'nextRoute'])(route), { type: 'IMAGE', photos: [croppedPhoto.path] })
      } else {
        navigationActions.navigatePostCreate(navigation, { type: 'IMAGE', photos: [croppedPhoto.path] })()
      }
    } catch (error) {

    } finally {
      camera.resumePreview()
    }
  }

  const handleLibrarySnap = async () => {
    const hasNextRoute = route.params && route.params.nextRoute

    const photos = await handleGallery(photoSize, !hasNextRoute)

    if (!photos.length) {
      return
    }

    dispatch(cameraActions.cameraCaptureRequest(photos))

    if (hasNextRoute) {
      navigation.navigate(path(['params', 'nextRoute'])(route), { type: 'IMAGE', photos })
    } else {
      navigationActions.navigatePostCreate(navigation, { type: 'IMAGE', photos })()
    }
  }

  return children({
    postsCreate,
    cameraRef,
    photoSize,
    setPhotoSize,
    flashMode,
    flipMode,
    handleCameraSnap,
    handleLibrarySnap,
    handleFlashToggle,
    handleFlipToggle,
  })
}

export default CameraService
