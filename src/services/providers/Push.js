import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import path from 'ramda/src/path'
import * as Logger from 'services/Logger'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import * as LinkingService from 'services/Linking'
import { useNavigation } from '@react-navigation/native'

export const usePushNotification = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  
  const user = useSelector(authSelector.authUserSelector)

  const handleNotificationEvent = (notification) => {
    if (!notification || !notification.getData()) return
    
    /**
     * ios deeplinking payload structure, might change on other provider/client
     */
    const action = path(['data', 'pinpoint', 'deeplink'])(notification.getData())
      
    /**
     * Navigate to related screen if action is recognized and supported
     */
    if (action) {
      LinkingService.deeplinkNavigation(navigation)(action)
    } 

    /**
     * Log unrecognized or unsupported actions
     */
    if (!action) {
      Logger.withScope(scope => {
        scope.setExtra('payload', JSON.stringify(notification.getData()))
        Logger.captureMessage('PUSH_NOTIFICATION_LISTENER_ERROR')
      })
    }

    /**
     * Let ios know that push notification is handled succesfully
     * Reset application badge number on completion
     */
    try {
      PushNotificationIOS.setApplicationIconBadgeNumber(0)
      notification.finish(PushNotificationIOS.FetchResult.NewData)
    } catch (error) {
      Logger.captureException(error)
    }
  }

  /**
   * Check if push notification permissions are enabled, request them if not
   * once permissions are enabled, handleRegistrationEvent will be called
   */
  const handlePermissions = () => {
    PushNotificationIOS.requestPermissions()
  }

  /**
   * Register user's new apns token which allows enables push notification on this device
   */
  const handleRegistrationEvent = (token) => {
    Logger.withScope(scope => {
      scope.setExtra('apns', token)
      Logger.captureMessage('PUSH_NOTIFICATION_REGISTER')
    })
    dispatch(usersActions.usersSetApnsTokenRequest({ token }))
  }

  const handleRegistrationError = (payload) => {
    Logger.withScope(scope => {
      scope.setExtra('payload', JSON.stringify(payload))
      Logger.captureMessage('PUSH_NOTIFICATION_REGISTER_ERROR')
    })
  }

  /**
   * Push notification event listeners initialization
   */
  useEffect(() => {
    if (user.userId) {
      PushNotificationIOS.checkPermissions(handlePermissions)
      PushNotificationIOS.getInitialNotification().then(handleNotificationEvent)

      PushNotificationIOS.addEventListener('notification', handleNotificationEvent)
      PushNotificationIOS.addEventListener('localNotification', handleNotificationEvent)
      PushNotificationIOS.addEventListener('register', handleRegistrationEvent)
      PushNotificationIOS.addEventListener('registrationError', handleRegistrationError)
    }

    return () => {
      PushNotificationIOS.removeEventListener('notification', handleNotificationEvent)
      PushNotificationIOS.removeEventListener('localNotification', handleNotificationEvent)
      PushNotificationIOS.removeEventListener('register', handleRegistrationEvent)
      PushNotificationIOS.removeEventListener('registrationError', handleRegistrationError)
    }
  }, [user.userId])

  return ({})
}