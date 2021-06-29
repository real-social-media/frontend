import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import { testAsRootSaga } from 'tests/utils/helpers'
import * as actions from 'store/ducks/auth/actions'
import authSigninCognito from 'store/ducks/auth/saga/authSigninCognito'

/**
 * Mock Data
 */
const username = 'username'
const password = 'password'

/**
 * Mock Functions
 */
const AwsAuth = { signIn: jest.fn().mockResolvedValue(true), currentUserCredentials: jest.fn() }
const navigation = { navigate: jest.fn(), reset: jest.fn() }

/**
 * Mock Context
 */
const context = [
  [getContext('AwsAuth'), AwsAuth],
  [getContext('ReactNavigationRef'), { current: navigation }],
]

describe('authSigninCognito', () => {
  afterEach(() => {
    AwsAuth.signIn.mockClear()
    navigation.navigate.mockClear()
    navigation.reset.mockClear()
  })

  it('success', async () => {
    await expectSaga(testAsRootSaga(authSigninCognito))
      .provide(context)
      .call([AwsAuth, 'signIn'], username, password)
      .put(actions.authSigninCognitoSuccess())

      .dispatch(actions.authSigninCognitoRequest({ username, password }))
      .dispatch(actions.authGetUserSuccess())
      .silentRun()

    expect(AwsAuth.signIn).toHaveBeenCalledWith(username, password)
  })

  describe('failure', () => {
    it('USER_NOT_CONFIRMED', async () => {
      const error = new Error('Error')
      error.code = 'UserNotConfirmedException'
      AwsAuth.signIn.mockRejectedValueOnce(error)

      await expectSaga(testAsRootSaga(authSigninCognito))
        .provide(context)
        .put(actions.authSigninCognitoFailure(error, { messageCode: 'USER_NOT_CONFIRMED' }))

        .dispatch(actions.authSigninCognitoRequest({ username, password }))
        .silentRun()
    })

    it('USER_NOT_FOUND', async () => {
      const error = new Error('Error')
      error.code = 'UserNotFoundException'
      AwsAuth.signIn.mockRejectedValueOnce(error)

      await expectSaga(testAsRootSaga(authSigninCognito))
        .provide(context)
        .put(actions.authSigninCognitoFailure(error, { messageCode: 'USER_NOT_FOUND' }))

        .dispatch(actions.authSigninCognitoRequest({ username, password }))
        .silentRun()
    })

    it('USER_NOT_AUTHORIZED', async () => {
      const error = new Error('Error')
      error.code = 'NotAuthorizedException'
      AwsAuth.signIn.mockRejectedValueOnce(error)

      await expectSaga(testAsRootSaga(authSigninCognito))
        .provide(context)
        .put(actions.authSigninCognitoFailure(error, { messageCode: 'USER_NOT_AUTHORIZED' }))

        .dispatch(actions.authSigninCognitoRequest({ username, password }))
        .silentRun()
    })

    it('INVALID_PARAMETER', async () => {
      const error = new Error('Error')
      error.code = 'InvalidParameterException'
      AwsAuth.signIn.mockRejectedValueOnce(error)

      await expectSaga(testAsRootSaga(authSigninCognito))
        .provide(context)
        .put(actions.authSigninCognitoFailure(error, { messageCode: 'INVALID_PARAMETER' }))

        .dispatch(actions.authSigninCognitoRequest({ username, password }))
        .silentRun()
    })
  })
})
