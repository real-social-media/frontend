import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import forge from 'node-forge'
import * as actions from 'store/ducks/signup/actions'
import * as authActions from 'store/ducks/auth/actions'
import { testAsRootSaga } from 'tests/utils/helpers'
import * as queries from 'store/ducks/signup/queries'
import signupPassword, { encryptPassword } from 'store/ducks/signup/saga/signupPassword'
import * as queryService from 'services/Query'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'

const password = 'password'
const encryptedPassword = 'encryptedPassword'

/**
 * Mock Functions
 */
const AwsAuth = { currentUserCredentials: jest.fn() }

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))
const navigation = { reset: jest.fn() }
const encrypt = jest.fn().mockReturnValue(encryptedPassword)

jest.mock('react-native-config', () => ({
  REAL_PUBLIC_KEY_PEM: 'REAL_PUBLIC_KEY_PEM',
}))

/**
 * Mock Context
 */
const context = [
  [getContext('AwsAuth'), AwsAuth],
  [getContext('ReactNavigationRef'), { current: navigation }],
]

describe('signupPassword', () => {
  beforeAll(() => {
    forge.pki.publicKeyFromPem.mockReturnValue({ encrypt })
  })

  afterEach(() => {
    forge.pki.publicKeyFromPem.mockClear()
    forge.util.encodeUtf8.mockClear()
    forge.util.encode64.mockClear()
    navigation.reset.mockClear()
    queryService.apiRequest.mockClear()
    encrypt.mockClear()
  })

  it('encryptPassword', async () => {
    expect(encryptPassword(password)).toBe(encryptedPassword)

    expect(forge.pki.publicKeyFromPem).toHaveBeenCalledWith('REAL_PUBLIC_KEY_PEM')
    expect(forge.util.encodeUtf8).toHaveBeenCalledWith(password)
    expect(encrypt).toHaveBeenCalledWith('encodedPassword', 'RSA-OAEP')
    expect(forge.util.encode64).toHaveBeenCalledWith('encryptedPassword')
  })

  it('success', async () => {
    await expectSaga(testAsRootSaga(signupPassword))
      .provide([...context, [matchers.call.fn(encryptPassword), encryptedPassword]])

      .call(encryptPassword, password)
      .call([queryService, 'apiRequest'], queries.setUserPassword, { encryptedPassword })

      .put(authActions.authGetUserRequest())
      .put(authActions.authPrefetchRequest())
      .put(actions.signupPasswordSuccess())

      .dispatch(actions.signupPasswordRequest({ password }))
      .dispatch(authActions.authGetUserSuccess())
      .silentRun()

    expect(navigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'App' }] })
  })

  it('failure', async () => {
    const error = new Error('Error')

    await expectSaga(testAsRootSaga(signupPassword))
      .provide([...context, [matchers.call.fn(encryptPassword), throwError(error)]])

      .call(encryptPassword, password)

      .put(actions.signupPasswordFailure(error))

      .dispatch(actions.signupPasswordRequest({ password }))
      .silentRun()
  })
})
