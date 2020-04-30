import { AppState } from 'react-native'
import { useState, useEffect } from 'react'
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { useNavigation } from '@react-navigation/native'
import useAppState from 'services/AppState'
import { openSettings } from 'react-native-permissions'

const Permissions = ({ children }) => {
  const navigation = useNavigation()

  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [libraryEnabled, setLibraryEnabled] = useState(true)

  const checkCamera = async () => {
    const result = await check(PERMISSIONS.IOS.CAMERA)
    setCameraEnabled(result !== RESULTS.BLOCKED)
  }

  const checkLibrary = async () => {
    const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
    setLibraryEnabled(result !== RESULTS.BLOCKED)
  }

  const requestCamera = async () => {
    const result = await check(PERMISSIONS.IOS.CAMERA)

    if (result === RESULTS.DENIED) {
      return request(PERMISSIONS.IOS.CAMERA)
    }
  }

  const requestLibrary = async () => {
    const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)

    if (result === RESULTS.DENIED) {
      return request(PERMISSIONS.IOS.PHOTO_LIBRARY)
    }
  }

  const getPermissions = async () => {
    await requestCamera()
    await requestLibrary()
    await checkCamera()
    await checkLibrary()
  }

  /**
   *
   */
  useAppState({
    onForeground: () => {
      getPermissions()
    },
  })

  useEffect(() => {
    getPermissions()
  }, [])

  return children({
    cameraEnabled,
    libraryEnabled,

    checkCamera,
    requestCamera,
    checkLibrary,
    requestLibrary,
    openSettings,
  })
}

export default Permissions