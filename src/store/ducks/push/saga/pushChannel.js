import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { eventChannel } from 'redux-saga'

function pushChannel() {
  return eventChannel((emitter) => {
    function handlePermissions() {
      PushNotificationIOS.requestPermissions()
    }

    function handleRegistrationEvent(token) {
      emitter({ type: 'REGISTER', token })
    }

    function handleRegistrationError(error) {
      emitter({ type: 'REGISTRATION_ERROR', error })
    }

    function handleNotificationEvent(notification) {
      emitter({ type: 'NOTIFICATION', notification })
    }

    /**
     * Push notification event listeners initialization
     */
    PushNotificationIOS.addEventListener('register', handleRegistrationEvent)
    PushNotificationIOS.addEventListener('registrationError', handleRegistrationError)
    PushNotificationIOS.addEventListener('notification', handleNotificationEvent)
    PushNotificationIOS.addEventListener('localNotification', handleNotificationEvent)

    /**
     * Check if push notification permissions are enabled, request them if not
     * once permissions are enabled, handleRegistrationEvent will be called
     */
    PushNotificationIOS.checkPermissions(handlePermissions)
    PushNotificationIOS.getInitialNotification().then(handleNotificationEvent)

    return function unsubscribe() {
      PushNotificationIOS.abandonPermissions()
      PushNotificationIOS.removeEventListener('register', handleRegistrationEvent)
      PushNotificationIOS.removeEventListener('registrationError', handleRegistrationError)
      PushNotificationIOS.removeEventListener('notification', handleNotificationEvent)
      PushNotificationIOS.removeEventListener('localNotification', handleNotificationEvent)
    }
  })
}

export default pushChannel
