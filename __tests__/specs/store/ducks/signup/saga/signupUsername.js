import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import { testAsRootSaga, testNavigate } from 'tests/utils/helpers'
import * as actions from 'store/ducks/signup/actions'
import authorize from 'store/ducks/auth/saga/authorize'
import signupUsername from 'store/ducks/signup/saga/signupUsername'
import * as queries from 'store/ducks/signup/queries'
import * as queryService from 'services/Query'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))

/**
 * Mock Functions
 */
const AwsAuth = { currentUserCredentials: jest.fn() }
const navigation = { navigate: jest.fn(), reset: jest.fn() }

/**
 * Mock Context
 */
const context = [
  [getContext('AwsAuth'), AwsAuth],
  [getContext('ReactNavigationRef'), { current: navigation }],
]

const setupSaga = () => expectSaga(testAsRootSaga(signupUsername)).provide(context)

describe('signupUsername saga', () => {
  const username = 'username'

  afterEach(() => {
    navigation.navigate.mockClear()
    navigation.reset.mockClear()
    queryService.apiRequest.mockClear()
  })

  describe('skip', () => {
    it('navigate to password by default', async () => {
      await setupSaga()
        .not.call(authorize)

        .dispatch(actions.signupUsernameSkip())
        .silentRun()

      testNavigate(navigation, 'Auth.AuthPassword')
    })

    it('navigate to app', async () => {
      await setupSaga()
        .call(authorize)

        .dispatch(actions.signupUsernameSkip({ nextRoute: 'app' }))
        .silentRun()
    })
  })

  describe('success', () => {
    it('navigate to password by default', async () => {
      const data = { a: 1, b: 2 }
      const payload = { username }
      queryService.apiRequest.mockResolvedValueOnce(data)

      await setupSaga()
        .call([queryService, 'apiRequest'], queries.setUsername, { username })
        .put(actions.signupUsernameSuccess(payload))
        .not.call(authorize)

        .dispatch(actions.signupUsernameRequest(payload))
        .silentRun()

      testNavigate(navigation, 'Auth.AuthPassword')
    })

    it('navigate to app', async () => {
      const data = { a: 1, b: 2 }
      const payload = { username, nextRoute: 'app' }
      queryService.apiRequest.mockResolvedValueOnce(data)

      await setupSaga()
        .call([queryService, 'apiRequest'], queries.setUsername, { username })
        .call(authorize)
        .put(actions.signupUsernameSuccess(payload))

        .dispatch(actions.signupUsernameRequest(payload))
        .silentRun()
    })
  })

  describe('failure', () => {
    it('handle request error', async () => {
      const nativeError = new Error('Fetch error')
      queryService.apiRequest.mockRejectedValueOnce(nativeError)

      await setupSaga()
        .put(actions.signupUsernameFailure(nativeError))
        .dispatch(actions.signupUsernameRequest({ username }))
        .silentRun()

      expect(queryService.apiRequest).toHaveBeenCalledWith(queries.setUsername, { username })
    })
  })
})
