import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import { testAsRootSaga, testNavigate } from 'tests/utils/helpers'
import signupCreate from 'store/ducks/signup/saga/signupCreate'
import { logEvent } from 'services/Analytics'
import * as queryService from 'services/Query'
import * as queries from 'store/ducks/signup/queries'
import * as helpers from 'store/ducks/signup/saga/helpers'
import { handleAnonymousSignin } from 'store/ducks/auth/saga/authSigninAnonymous'

jest.mock('store/ducks/auth/saga/authSigninAnonymous', () => ({ handleAnonymousSignin: jest.fn() }))

jest.spyOn(helpers, 'generateExpirationDate').mockReturnValue('expirationDate')

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))
const navigation = { navigate: jest.fn() }
const email = 'valid@mail.com'

const AwsAuth = { federatedSignIn: jest.fn(), currentCredentials: jest.fn() }

AwsAuth.currentCredentials.mockResolvedValue({ authenticated: false })

describe('signupCreate', () => {
  afterEach(() => {
    navigation.navigate.mockClear()
    queryService.apiRequest.mockClear()
    logEvent.mockClear()
    handleAnonymousSignin.mockClear()
  })

  describe('success', () => {
    it('email', async () => {
      const usernameType = 'email'

      await expectSaga(testAsRootSaga(signupCreate))
        .provide([[getContext('ReactNavigationRef'), { current: navigation }]])

        .call(handleAnonymousSignin)
        .call([queryService, 'apiRequest'], queries.startChangeUserEmail, { email })
        .call(logEvent, 'SIGNUP_EMAIL_SUCCESS')
        .put(actions.signupCreateSuccess())

        .dispatch(actions.signupCreateRequest({ usernameType, email }))
        .silentRun()

      testNavigate(navigation, 'Auth.AuthEmailConfirm')
    })

    it('phone', async () => {
      const countryCode = '+1'
      const phone = '1234567'
      const phoneNumber = `${countryCode}${phone}`
      const usernameType = 'phone'

      await expectSaga(testAsRootSaga(signupCreate))
        .provide([[getContext('ReactNavigationRef'), { current: navigation }]])

        .call([queryService, 'apiRequest'], queries.startChangeUserPhoneNumber, { phoneNumber })
        .call(logEvent, 'SIGNUP_PHONE_SUCCESS')
        .put(actions.signupCreateSuccess())

        .dispatch(actions.signupCreateRequest({ usernameType, countryCode, phone }))
        .silentRun()

      testNavigate(navigation, 'Auth.AuthPhoneConfirm')
    })
  })

  describe('failure', () => {
    it('USER_CONFIRMATION_DELIVERY', async () => {
      const nativeError = new Error('USER_CONFIRMATION_DELIVERY')
      queryService.apiRequest.mockRejectedValueOnce(nativeError)

      await expectSaga(testAsRootSaga(signupCreate))
        .provide([[getContext('AwsAuth'), AwsAuth]])

        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure(nativeError, { messageCode: 'USER_CONFIRMATION_DELIVERY' }))

        .dispatch(actions.signupCreateRequest({ usernameType: 'email', email }))

        .silentRun()
    })

    it('UsernameExistsException', async () => {
      const nativeError = new Error('UsernameExistsException')
      nativeError.code = 'UsernameExistsException'
      queryService.apiRequest.mockRejectedValueOnce(nativeError)

      await expectSaga(testAsRootSaga(signupCreate))
        .provide([[getContext('AwsAuth'), AwsAuth]])

        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure(nativeError, { messageCode: 'USER_EXISTS' }))

        .dispatch(actions.signupCreateRequest({ usernameType: 'email', email }))

        .silentRun()
    })

    it('InvalidPasswordException', async () => {
      const nativeError = new Error('InvalidPasswordException')
      nativeError.code = 'InvalidPasswordException'
      queryService.apiRequest.mockRejectedValueOnce(nativeError)

      await expectSaga(testAsRootSaga(signupCreate))
        .provide([[getContext('AwsAuth'), AwsAuth]])

        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure(nativeError, { messageCode: 'INVALID_PASSWORD' }))

        .dispatch(actions.signupCreateRequest({ usernameType: 'email', email }))

        .silentRun()
    })

    it('InvalidParameterException', async () => {
      const nativeError = new Error('InvalidParameterException')
      nativeError.code = 'InvalidParameterException'
      queryService.apiRequest.mockRejectedValueOnce(nativeError)

      await expectSaga(testAsRootSaga(signupCreate))
        .provide([[getContext('AwsAuth'), AwsAuth]])

        .not.put.like(actions.signupCreateSuccess())
        .put(actions.signupCreateFailure(nativeError, { messageCode: 'INVALID_PARAMETER' }))

        .dispatch(actions.signupCreateRequest({ usernameType: 'email', email }))

        .silentRun()
    })
  })
})
