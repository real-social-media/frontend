import { AppEventsLogger } from 'react-native-fbsdk'

export const logEvent = (event) => {
  AppEventsLogger.logEvent(event)
}