import { expectSaga } from 'redux-saga-test-plan'
import { testAsRootSaga } from 'tests/utils/helpers'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import analytics from 'store/ducks/analytics/saga'
import * as signupActions from 'store/ducks/signup/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as Analytics from 'services/Analytics'
import * as Logger from 'services/Logger'

describe('Analytics saga', () => {
  beforeEach(() => {
    Analytics.logEvent.mockClear()
    Logger.captureException.mockClear()
  })

  describe('success', () => {
    it('authForgotSuccess', async () => {
      await expectSaga(testAsRootSaga(analytics))
        .call([Analytics, 'logEvent'], 'AUTH_FORGOT_SUCCESS')

        .dispatch(authActions.authForgotSuccess())
        .silentRun()
    })

    it('authForgotConfirmSuccess', async () => {
      await expectSaga(testAsRootSaga(analytics))
        .call([Analytics, 'logEvent'], 'AUTH_FORGOT_CONFIRM_SUCCESS')

        .dispatch(authActions.authForgotConfirmSuccess())
        .silentRun()
    })

    it('signupConfirmRequest', async () => {
      await expectSaga(testAsRootSaga(analytics))
        .call([Analytics, 'logEvent'], 'SIGNUP_CONFIRM_REQUEST')

        .dispatch(signupActions.signupConfirmRequest())
        .silentRun()
    })

    it('signupConfirmSuccess', async () => {
      await expectSaga(testAsRootSaga(analytics))
        .call([Analytics, 'logEvent'], 'SIGNUP_CONFIRM_SUCCESS')

        .dispatch(signupActions.signupConfirmSuccess())
        .silentRun()
    })

    it('signupCreateRequest', async () => {
      await expectSaga(testAsRootSaga(analytics))
        .call([Analytics, 'logEvent'], 'SIGNUP_CREATE_REQUEST')

        .dispatch(signupActions.signupCreateRequest())
        .silentRun()
    })

    it('signupCreateSuccess', async () => {
      await expectSaga(testAsRootSaga(analytics))
        .call([Analytics, 'logEvent'], 'SIGNUP_CREATE_SUCCESS')

        .dispatch(signupActions.signupCreateSuccess())
        .silentRun()
    })

    it('signupPasswordRequest', async () => {
      await expectSaga(testAsRootSaga(analytics))
        .call([Analytics, 'logEvent'], 'SIGNUP_PASSWORD_REQUEST')

        .dispatch(signupActions.signupPasswordRequest())
        .silentRun()
    })

    it('signupPasswordSuccess', async () => {
      await expectSaga(testAsRootSaga(analytics))
        .call([Analytics, 'logEvent'], 'SIGNUP_PASSWORD_SUCCESS')

        .dispatch(signupActions.signupPasswordSuccess())
        .silentRun()
    })

    it('signupUsernameRequest', async () => {
      await expectSaga(testAsRootSaga(analytics))
        .call([Analytics, 'logEvent'], 'SIGNUP_USERNAME_REQUEST')

        .dispatch(signupActions.signupUsernameRequest())
        .silentRun()
    })

    it('signupUsernameSuccess', async () => {
      await expectSaga(testAsRootSaga(analytics))
        .call([Analytics, 'logEvent'], 'SIGNUP_USERNAME_SUCCESS')

        .dispatch(signupActions.signupUsernameSuccess())
        .silentRun()
    })
  })

  describe('failure', () => {
    it('error', async () => {
      const error = new Error('error')

      await expectSaga(testAsRootSaga(analytics))
        .provide([[matchers.call.fn(Analytics.logEvent), throwError(error)]])

        .dispatch(signupActions.signupUsernameSuccess())
        .silentRun()

      expect(Logger.captureException).toHaveBeenCalledWith(error)
    })
  })
})
