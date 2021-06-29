import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import * as actions from 'store/ducks/auth/actions'
import authSigninAnonymous, { COGNITO_PROVIDER } from 'store/ducks/auth/saga/authSigninAnonymous'
import { testAsRootSaga } from 'tests/utils/helpers'
import * as queryService from 'services/Query'
import * as queries from 'store/ducks/signup/queries'
import * as helpers from 'store/ducks/signup/saga/helpers'

/**
 * Mock Data
 */

const tokens = { IdToken: 'IdToken' }

/**
 * Mock Functions
 */
const navigation = { reset: jest.fn() }
const AwsAuth = { federatedSignIn: jest.fn(), currentUserCredentials: jest.fn() }
AwsAuth.currentUserCredentials.mockResolvedValue({ authenticated: false })

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))
jest.spyOn(helpers, 'generateExpirationDate').mockReturnValue('expirationDate')

jest.mock('react-native-config', () => ({
  AWS_COGNITO_REGION: 'AWS_COGNITO_REGION',
  AWS_COGNITO_USER_POOL_ID: 'AWS_COGNITO_USER_POOL_ID',
}))

/**
 * Mock Context
 */
const context = [
  [getContext('AwsAuth'), AwsAuth],
  [getContext('ReactNavigationRef'), { current: navigation }],
]

describe('authSigninAnonymous', () => {
  afterEach(() => {
    navigation.reset.mockClear()
    AwsAuth.federatedSignIn.mockClear()
  })

  it('COGNITO_PROVIDER', () => {
    expect(COGNITO_PROVIDER).toBe('cognito-idp.AWS_COGNITO_REGION.amazonaws.com/AWS_COGNITO_USER_POOL_ID')
  })

  describe('success', () => {
    it('guest user', async () => {
      await expectSaga(testAsRootSaga(authSigninAnonymous))
        .provide([
          ...context,
          [matchers.call.fn(queryService.apiRequest), Promise.resolve({ data: { createAnonymousUser: tokens } })],
          [matchers.call.fn(queryService.apiRequest), Promise.resolve(true)],
        ])

        .call([queryService, 'apiRequest'], queries.createAnonymousUser)
        .call([AwsAuth, 'federatedSignIn'], COGNITO_PROVIDER, { token: 'IdToken', expires_at: 'expirationDate' }, {})

        .put(actions.authGetUserRequest())
        .put(actions.authSigninAnonymousSuccess())

        .dispatch(actions.authSigninAnonymousRequest())
        .dispatch(actions.authGetUserSuccess())
        .silentRun()

      expect(navigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'App' }] })
    })

    it('authorized user', async () => {
      AwsAuth.currentUserCredentials.mockResolvedValueOnce({ authenticated: true })

      await expectSaga(testAsRootSaga(authSigninAnonymous))
        .provide([
          ...context,
          [matchers.call.fn(queryService.apiRequest), Promise.resolve({ data: { createAnonymousUser: tokens } })],
          [matchers.call.fn(queryService.apiRequest), Promise.resolve(true)],
        ])

        .not.call([queryService, 'apiRequest'], queries.createAnonymousUser)
        .not.call(
          [AwsAuth, 'federatedSignIn'],
          COGNITO_PROVIDER,
          { token: 'IdToken', expires_at: 'expirationDate' },
          {},
        )

        .put(actions.authGetUserRequest())
        .put(actions.authSigninAnonymousSuccess())

        .dispatch(actions.authSigninAnonymousRequest())
        .dispatch(actions.authGetUserSuccess())
        .silentRun()

      expect(navigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'App' }] })
    })
  })

  describe('failure', () => {
    it('Failed to obtain flow', async () => {
      const nativeError = new Error('Failed to obtain flow')

      await expectSaga(testAsRootSaga(authSigninAnonymous))
        .provide([...context, [matchers.call.fn(queryService.apiRequest), Promise.reject(nativeError)]])

        .put(actions.authSigninAnonymousFailure(nativeError))

        .dispatch(actions.authSigninAnonymousRequest())
        .silentRun()
    })
  })
})
