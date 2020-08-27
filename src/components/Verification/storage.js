import AsyncStorage from '@react-native-community/async-storage'
import * as Logger from 'services/Logger'

const STORAGE_TOKEN = '@real:uploads:verificationScreen'
const SKIP_STATE = 'skip'

export const skipNextTime = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_TOKEN, SKIP_STATE)
  } catch (error) {
    Logger.captureException(error)
  }
}

export const isSkipped = async () => {
  try {
    return (await AsyncStorage.getItem(STORAGE_TOKEN)) === SKIP_STATE
  } catch (error) {
    Logger.captureException(error)
  }
}
