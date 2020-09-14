import AsyncStorage from '@react-native-community/async-storage'
import * as Logger from 'services/Logger'

export const setItem = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value)
  } catch (error) {
    Logger.captureException(error)
  }
}

export const getItem = async (name) => {
  try {
    return await AsyncStorage.getItem(name)
  } catch (error) {
    Logger.captureException(error)
  }
}

export const removeItem = async (name) => {
  try {
    await AsyncStorage.removeItem(name)
  } catch (error) {
    Logger.captureException(error)
  }
}

export const STORAGE_KEYS = {
  AUTH_USER: '@real:auth:user',
  AUTH_APPLE: '@real:auth:apple',
  SETTINGS_PHOTO_VALIDATION: '@real:settings:photoValidation',
  VERIFICATION_SCREEN: '@real:uploads:verificationScreen',
}

export const STORAGE_PROVIDER = AsyncStorage

export default {
  setItem,
  getItem,
  removeItem,
}
