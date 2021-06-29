import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as actions from 'store/ducks/auth/actions'
import authForgot from 'store/ducks/auth/saga/authForgot'
import { testAsRootSaga, testNavigate } from 'tests/utils/helpers'

const AwsAuth = { forgotPassword: jest.fn(), forgotPasswordSubmit: jest.fn() }
const navigation = { current: { navigate: jest.fn() } }
const phone = '12345678'
const countryCode = '+7'
const email = 'test@mail.com'

describe('authForgot', () => {
  afterEach(() => {
    AwsAuth.forgotPassword.mockClear()
    AwsAuth.forgotPasswordSubmit.mockClear()
  })

  describe('success', () => {
    it('phone', async () => {
      AwsAuth.forgotPassword.mockResolvedValueOnce(true)
      const username = `${countryCode}${phone}`

      await expectSaga(testAsRootSaga(authForgot))
        .provide([
          [getContext('AwsAuth'), AwsAuth],
          [getContext('ReactNavigationRef'), navigation],
        ])

        .put(actions.authForgotSuccess())

        .dispatch(actions.authForgotRequest({ username, phone, countryCode }))
        .silentRun()

      expect(AwsAuth.forgotPassword).toHaveBeenCalledWith(username)
      testNavigate(navigation.current, 'Auth.AuthForgotConfirm')
    })

    it('email', async () => {
      AwsAuth.forgotPassword.mockResolvedValueOnce(true)

      await expectSaga(testAsRootSaga(authForgot))
        .provide([
          [getContext('AwsAuth'), AwsAuth],
          [getContext('ReactNavigationRef'), navigation],
        ])

        .put(actions.authForgotSuccess())

        .dispatch(actions.authForgotRequest({ username: email, email }))
        .silentRun()

      expect(AwsAuth.forgotPassword).toHaveBeenCalledWith(email)
      testNavigate(navigation.current, 'Auth.AuthForgotConfirm')
    })
  })

  describe('failure', () => {
    it('UserNotFoundException', async () => {
      const error = new Error('User does not exist')
      error.code = 'UserNotFoundException'

      AwsAuth.forgotPassword.mockRejectedValueOnce(error)

      await expectSaga(testAsRootSaga(authForgot))
        .provide([
          [getContext('AwsAuth'), AwsAuth],
          [getContext('ReactNavigationRef'), navigation],
        ])

        .put(actions.authForgotFailure(error, { messageCode: 'USER_NOT_FOUND' }))

        .dispatch(actions.authForgotRequest({ username: email, email }))
        .silentRun()
    })

    it('Generic', async () => {
      const error = new Error('Error')
      AwsAuth.forgotPassword.mockRejectedValueOnce(error)

      await expectSaga(testAsRootSaga(authForgot))
        .provide([
          [getContext('AwsAuth'), AwsAuth],
          [getContext('ReactNavigationRef'), navigation],
        ])

        .put(actions.authForgotFailure(error))

        .dispatch(actions.authForgotRequest({ username: email, email }))
        .silentRun()
    })
  })

  describe('authForgotConfirmRequest', () => {
    const payload = {
      username: 'username',
      confirmationCode: 'confirmationCode',
      password: 'password',
    }

    it('success', async () => {
      await expectSaga(testAsRootSaga(authForgot))
        .provide([
          [getContext('AwsAuth'), AwsAuth],
          [getContext('ReactNavigationRef'), navigation],
        ])

        .put(actions.authForgotConfirmSuccess({ data: undefined }))

        .dispatch(actions.authForgotConfirmRequest(payload))
        .silentRun()

      expect(AwsAuth.forgotPasswordSubmit).toHaveBeenCalledWith(
        payload.username,
        payload.confirmationCode,
        payload.password,
      )

      testNavigate(navigation.current, 'Auth.Signin.AuthSigninEmail')
    })

    describe('failure', () => {
      it('InvalidPasswordException', async () => {
        const error = new Error(
          'Password did not conform with policy: Password must have uppercase-alpha-numeric-special characters',
        )
        error.code = 'InvalidPasswordException'
        AwsAuth.forgotPasswordSubmit.mockRejectedValueOnce(error)

        await expectSaga(testAsRootSaga(authForgot))
          .provide([
            [getContext('AwsAuth'), AwsAuth],
            [getContext('ReactNavigationRef'), navigation],
          ])

          .put(actions.authForgotConfirmFailure(error, { messageCode: 'INVALID_PASSWORD' }))

          .dispatch(actions.authForgotConfirmRequest(payload))
          .silentRun()
      })

      it('CodeMismatchException', async () => {
        const error = new Error('Invalid verification code provided')
        error.code = 'CodeMismatchException'

        AwsAuth.forgotPasswordSubmit.mockRejectedValueOnce(error)

        await expectSaga(testAsRootSaga(authForgot))
          .provide([
            [getContext('AwsAuth'), AwsAuth],
            [getContext('ReactNavigationRef'), navigation],
          ])

          .put(actions.authForgotConfirmFailure(error, { messageCode: 'CODE_MISMATCH' }))

          .dispatch(actions.authForgotConfirmRequest(payload))
          .silentRun()
      })

      it('Generic', async () => {
        const error = new Error('Error')
        AwsAuth.forgotPasswordSubmit.mockRejectedValueOnce(error)

        await expectSaga(testAsRootSaga(authForgot))
          .provide([
            [getContext('AwsAuth'), AwsAuth],
            [getContext('ReactNavigationRef'), navigation],
          ])

          .put(actions.authForgotConfirmFailure(error))

          .dispatch(actions.authForgotConfirmRequest(payload))
          .silentRun()
      })
    })
  })
})
