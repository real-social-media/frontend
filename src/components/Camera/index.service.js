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

export const handleGallery = async (photoSize = '1:1') => {
  try {
    const responses = await CropPicker.openPicker({
      multiple: true,
    })
  
    const cropped = await series(
      responses.map(response => (callback) =>
        CropPicker.openCropper({
          avoidEmptySpaceAroundImage: false,
          path: response.path,
          width: getScreenAspectRatio(photoSize, response.width).x,
          height: getScreenAspectRatio(photoSize, response.width).y,
          includeExif: true,
          compressImageQuality: 1,
        })
        .then(res => ({
          ...res,
          originalFormat: response.filename.split('.').pop(),
        }))
        .then(res => callback(null, res))
        .catch(() => callback(null, null))
      )
    )

    const photos = cropped
    .filter(item => item)
    .map(photo => ({
      uri: photo.path,
      photoSize,
      takenInReal: false,
      originalFormat: photo.originalFormat,
      originalMetadata: JSON.stringify(photo.exif),
    }))
  
    return photos
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
        exif: true,
      })

      const croppedPhoto = await CropPicker.openCropper({
        avoidEmptySpaceAroundImage: false,
        path: snappedPhoto.uri,
        width: getScreenAspectRatio(photoSize, snappedPhoto.width).x,
        height: getScreenAspectRatio(photoSize, snappedPhoto.width).y,
        includeExif: true,
        compressImageQuality: 1,
      })

      dispatch(cameraActions.cameraCaptureRequest([{
        uri: croppedPhoto.path,
        photoSize,
        takenInReal: true,
        originalFormat: snappedPhoto.uri.split('.').pop(),
        originalMetadata: JSON.stringify(snappedPhoto.exif),
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
    const photos = await handleGallery(photoSize)

    if (!photos.length) {
      return
    }

    dispatch(cameraActions.cameraCaptureRequest(photos))

    if (route.params && route.params.nextRoute) {
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
