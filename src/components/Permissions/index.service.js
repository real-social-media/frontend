import { useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { PERMISSIONS, RESULTS, check, request, openSettings } from 'react-native-permissions'
import useAppState from 'services/AppState'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const Permissions = ({ children, camera, library, location }) => {
  const navigation = useNavigation()

  /**
   * Ui state
   */
  const [isModalOpen, setIsModalOpen] = useState(false)
  useFocusEffect(() => {
    setIsModalOpen(true)
  })

  const handleClose = () => {
    navigation.goBack()
    setIsModalOpen(false)
  }

  /**
   * Permissions state
   */
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [libraryEnabled, setLibraryEnabled] = useState(true)
  const [locationEnabled, setLocationEnabled] = useState(true)

  const checkCamera = async () => {
    const result = Platform.select({
      ios: await check(PERMISSIONS.IOS.CAMERA) === RESULTS.GRANTED,
      android: await check(PERMISSIONS.ANDROID.CAMERA) === RESULTS.GRANTED,
    })
    setCameraEnabled(result)
  }

  const checkLibrary = async () => {
    const result = Platform.select({
      ios: await check(PERMISSIONS.IOS.PHOTO_LIBRARY) === RESULTS.GRANTED,
      android: await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE) === RESULTS.GRANTED,
    })
    setLibraryEnabled(result)
  }

  const checkLocation = async () => {
    const result = Platform.select({
      ios: await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) === RESULTS.GRANTED,
      android: await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION) === RESULTS.GRANTED,
    })
    setLocationEnabled(result)
  }

  const requestCamera = async () => {
    const result = Platform.select({
      ios: await check(PERMISSIONS.IOS.CAMERA),
      android: await check(PERMISSIONS.ANDROID.CAMERA),
    })
    if (result === RESULTS.DENIED) {
      Platform.OS == 'ios' ?
        await request(PERMISSIONS.IOS.CAMERA)
        : await request(PERMISSIONS.ANDROID.CAMERA)

      await checkCamera()
    }
  }

  const requestLibrary = async () => {
    const result = Platform.select({
      ios: await check(PERMISSIONS.IOS.PHOTO_LIBRARY),
      android: await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE),
    })
    if (result === RESULTS.DENIED) {
      Platform.OS == 'ios' ?
        await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
        : await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      await checkLibrary()
    }
  }

  const requestLocation = async () => {
    const result = Platform.select({
      ios: await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
      android: await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION),
    })

    if (result === RESULTS.DENIED) {
      Platform.OS == 'ios' ?
        await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

      await checkLocation()
    }
  }

  const getPermissions = async () => {
    if (camera) {
      await requestCamera()
      await checkCamera()
    }

    if (library) {
      await requestLibrary()
      await checkLibrary()
    }


    if (location) {
      await requestLocation()
      await checkLocation()
    }
  }

  useAppState({
    onForeground: () => {
      getPermissions()
    },
  })

  useEffect(() => {
    getPermissions()
  }, [])

  return children({
    handleClose,
    isModalOpen,
    cameraEnabled,
    libraryEnabled,
    locationEnabled,

    checkCamera,
    requestCamera,
    checkLibrary,
    requestLibrary,
    checkLocation,
    requestLocation,
    openSettings,
  })
}

export default Permissions
