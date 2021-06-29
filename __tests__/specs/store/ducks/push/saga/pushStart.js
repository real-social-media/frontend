import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import { testAsRootSaga, testNavigate } from 'tests/utils/helpers'
import { sleep } from 'tests/utils'
import * as queryService from 'services/Query'
import * as actions from 'store/ducks/push/actions'
import * as queries from 'store/ducks/push/queries'
import * as authActions from 'store/ducks/auth/actions'
import push from 'store/ducks/push/saga/pushStart'
import * as Logger from 'services/Logger'

/**
 * Helpers
 */
function getHandlers() {
  return PushNotificationIOS.addEventListener.mock.calls.reduce((acc, item) => {
    const [name, callback] = item
    return { ...acc, [name]: callback }
  }, {})
}

/**
 * Mock Data
 */
const token = 'token'
const notificationData = { data: { pinpoint: { deeplink: 'https:/real.app/chat' } }, userInteraction: 1 }
const notification = { finish: jest.fn(), getData: jest.fn().mockReturnValue(notificationData) }
const initialNotification = { finish: jest.fn(), getData: jest.fn().mockReturnValue({ userInteraction: 0, data: {} }) }

/**
 * Mock Functions
 */
const navigation = { navigate: jest.fn(), reset: jest.fn() }

jest.mock('@react-native-community/push-notification-ios', () => ({
  setApplicationIconBadgeNumber: jest.fn(),
  requestPermissions: jest.fn(),
  addEventListener: jest.fn(),
  checkPermissions: jest.fn().mockImplementation((callback) => callback()),
  getInitialNotification: jest.fn(),
  abandonPermissions: jest.fn(),
  removeEventListener: jest.fn(),
  FetchResult: { NewData: 'NewData' },
}))

PushNotificationIOS.getInitialNotification.mockResolvedValue(initialNotification)

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

function mockLoggerScope() {
  const scope = { setExtra: jest.fn() }

  Logger.withScope.mockImplementationOnce((callback) => callback(scope))

  return scope
}

/**
 * Mock Context
 */
const context = [[getContext('ReactNavigationRef'), { current: navigation }]]

const setupSaga = () =>
  expectSaga(testAsRootSaga(push))
    .provide(context)

    .dispatch(actions.pushStartRequest())
    .silentRun()

describe('Push', () => {
  afterEach(() => {
    PushNotificationIOS.setApplicationIconBadgeNumber.mockClear()
    PushNotificationIOS.requestPermissions.mockClear()
    PushNotificationIOS.addEventListener.mockClear()
    PushNotificationIOS.checkPermissions.mockClear()
    PushNotificationIOS.getInitialNotification.mockClear()
    PushNotificationIOS.abandonPermissions.mockClear()
    PushNotificationIOS.removeEventListener.mockClear()
    navigation.navigate.mockClear()
    navigation.reset.mockClear()
    notification.finish.mockClear()
    notification.getData.mockClear()
    initialNotification.finish.mockClear()
    initialNotification.getData.mockClear()
  })

  describe('launch app', () => {
    it('reset badge number on app launch', async () => {
      await expectSaga(testAsRootSaga(push)).provide(context).dispatch(actions.pushStartRequest()).silentRun()

      expect(PushNotificationIOS.setApplicationIconBadgeNumber).toHaveBeenCalledWith(0)
    })

    it('request permissions', async () => {
      await expectSaga(testAsRootSaga(push)).provide(context).dispatch(actions.pushStartRequest()).silentRun()

      expect(PushNotificationIOS.checkPermissions).toHaveBeenCalled()
      expect(PushNotificationIOS.requestPermissions).toHaveBeenCalled()
    })

    it('reqister error event', async () => {
      const error = new Error('Error')
      const LoggerScope = mockLoggerScope()

      const promise = setupSaga()

      await sleep()
      getHandlers().registrationError(error)

      expect(LoggerScope.setExtra).toHaveBeenCalledWith('payload', JSON.stringify(error))
      expect(Logger.captureMessage).toHaveBeenCalledWith('PUSH_NOTIFICATION_REGISTER_ERROR')

      return promise
    })
  })

  describe('signout', () => {
    it('unsubscribe and abandon permissions', async () => {
      await expectSaga(testAsRootSaga(push))
        .provide(context)

        .dispatch(actions.pushStartRequest())
        .dispatch(authActions.authSignoutSuccess())
        .silentRun()

      expect(PushNotificationIOS.abandonPermissions).toHaveBeenCalled()
      expect(PushNotificationIOS.removeEventListener).toHaveBeenCalledTimes(4)
    })
  })

  describe('register APNS-token event', () => {
    it('success', async () => {
      const LoggerScope = mockLoggerScope()

      const promise = setupSaga()

      await sleep()
      getHandlers().register(token)
      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.setUserAPNSToken, { token })

      await sleep()
      expect(LoggerScope.setExtra).toHaveBeenCalledWith('apns', token)
      expect(Logger.captureMessage).toHaveBeenCalledWith('PUSH_NOTIFICATION_REGISTER')

      return promise
    })

    it('failure', async () => {
      const error = new Error('Error')
      queryService.apiRequest.mockRejectedValueOnce(error)

      const promise = setupSaga()

      await sleep()
      getHandlers().register(token)

      await sleep()
      expect(Logger.captureException).toHaveBeenCalledWith(error)

      return promise
    })
  })

  describe('notification event', () => {
    it('let ios know that push notification is handled succesfully', async () => {
      const promise = setupSaga()

      await sleep()
      getHandlers().notification(notification)
      expect(notification.finish).toHaveBeenCalledWith('NewData')

      return promise
    })

    it('reset badge number', async () => {
      const promise = setupSaga()

      await sleep()
      getHandlers().notification(notification)
      expect(PushNotificationIOS.setApplicationIconBadgeNumber).toHaveBeenCalledWith(0)

      return promise
    })

    it('navigate to related screen', async () => {
      const promise = setupSaga()

      await sleep()
      getHandlers().notification(notification)

      await sleep()
      testNavigate(navigation, 'App.Chat')

      return promise
    })

    it('navigate only when user tap by push', async () => {
      notification.getData.mockReturnValueOnce({ ...notificationData, userInteraction: 0 })

      const promise = setupSaga()

      await sleep()
      getHandlers().notification(notification)

      await sleep()
      expect(navigation.navigate).not.toHaveBeenCalled()

      return promise
    })

    it('unsupported actions', async () => {
      const LoggerScope = mockLoggerScope()
      const payload = { userInteraction: 1, data: {} }
      notification.getData.mockReturnValueOnce(payload)

      const promise = setupSaga()

      await sleep()
      getHandlers().notification(notification)

      await sleep()
      expect(LoggerScope.setExtra).toHaveBeenCalledWith('payload', JSON.stringify(payload))
      expect(Logger.captureMessage).toHaveBeenCalledWith('PUSH_NOTIFICATION_UNSUPPORTED')

      return promise
    })
  })
})
