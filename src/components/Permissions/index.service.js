import { useState, useEffect } from 'react'
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
    const result = await check(PERMISSIONS.IOS.CAMERA) === RESULTS.GRANTED
    setCameraEnabled(result)
  }

  const checkLibrary = async () => {
    const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY) === RESULTS.GRANTED
    setLibraryEnabled(result)
  }

  const checkLocation = async () => {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) === RESULTS.GRANTED
    setLocationEnabled(result)
  }

  const requestCamera = async () => {
    const result = await check(PERMISSIONS.IOS.CAMERA)

    if (result === RESULTS.DENIED) {
      await request(PERMISSIONS.IOS.CAMERA)
      await checkCamera()
    }
  }

  const requestLibrary = async () => {
    const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)

    if (result === RESULTS.DENIED) {
      await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
      await checkLibrary()
    }
  }

  const requestLocation = async () => {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

    if (result === RESULTS.DENIED) {
      await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
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
