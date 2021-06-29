import { expectSaga } from 'redux-saga-test-plan'
import { testAsRootSaga, makeAuthorizedState } from 'tests/utils/helpers'
import loggerSaga from 'store/ducks/logger/saga'
import * as actions from 'store/ducks/auth/actions'
import * as Logger from 'services/Logger'
import { CancelRequestOnSignoutError } from 'store/errors'

/**
 * Mock Data
 */
const user = { userId: 1, username: 'username', email: 'valid@email.com' }
const authenticated = { id: 1, username: 'username', email: 'valid@email.com' }

/**
 * Mock Functions
 */
const scope = { setExtra: jest.fn() }
Logger.withScope.mockImplementationOnce((callback) => callback(scope))

describe('logger', () => {
  afterEach(() => {
    Logger.setUser.mockClear()
    Logger.clearScope.mockClear()
    scope.setExtra.mockClear()
  })

  describe('setScope', () => {
    const testSetScope = async (action) => {
      await expectSaga(testAsRootSaga(loggerSaga))
        .withState(makeAuthorizedState(user))

        .call([Logger, 'setUser'], authenticated)

        .dispatch(action)
        .silentRun()
    }

    it('authSigninCognitoSuccess', async () => {
      await testSetScope(actions.authSigninCognitoSuccess())
    })

    it('authSigninAnonymousSuccess', async () => {
      await testSetScope(actions.authSigninAnonymousSuccess())
    })

    it('authSigninGoogleSuccess', async () => {
      await testSetScope(actions.authSigninGoogleSuccess())
    })

    it('authSigninAppleSuccess', async () => {
      await testSetScope(actions.authSigninAppleSuccess())
    })
  })

  it('clearScope', async () => {
    await expectSaga(testAsRootSaga(loggerSaga))
      .call([Logger, 'clearScope'])

      .dispatch(actions.authSignoutSuccess())
      .silentRun()
  })

  describe('captureErrors', () => {
    const error = new Error('Error')
    const failureAction = actions.authFlowFailure(error)

    it('CancelRequestOnSignoutError', async () => {
      await expectSaga(testAsRootSaga(loggerSaga))
        .dispatch(actions.authFlowFailure(new CancelRequestOnSignoutError()))
        .silentRun()
    })

    it('capture error', async () => {
      await expectSaga(testAsRootSaga(loggerSaga)).dispatch(failureAction).silentRun()
    })
  })
})
