import AsyncStorage from '@react-native-async-storage/async-storage'
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
  AUTH_APPLE: '@real:auth:apple',
  SETTINGS_PHOTO_VALIDATION: '@real:settings:photoValidation',
  VERIFICATION_SCREEN: '@real:uploads:verificationScreen',
  APP_REDUCER: 'app',
  POSTS_REDUCER: 'posts',
  USERS_REDUCER: 'users',
  AUTH_REDUCER: 'auth',
  SIGNUP_REDUCER: 'signup',
  CHAT_REDUCER: 'chat',
  PURCHASES_REDUCER: 'purchases',
  CONTACTS_REDUCER: 'contacts',
}

export const clearAll = async () => {
  await Promise.all(Object.values(STORAGE_KEYS).map(removeItem))
}

export const STORAGE_PROVIDER = AsyncStorage

export default {
  setItem,
  getItem,
  removeItem,
  clearAll,
}
