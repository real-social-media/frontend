import { expectSaga } from 'redux-saga-test-plan'
import { testAsRootSaga, makeAuthorizedState } from 'tests/utils/helpers'
import * as actions from 'store/ducks/appState/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as updatesActions from 'store/ducks/updates/actions'
import appState from 'store/ducks/appState/saga'

describe('App state', () => {
  it('on launched', async () => {
    await expectSaga(testAsRootSaga(appState))
      .put(updatesActions.updatesCheckRequest())
      .put(authActions.authFlowRequest())

      .dispatch(actions.appStateLaunched())
      .silentRun()
  })

  it('on background', async () => {
    await expectSaga(testAsRootSaga(appState))
      .put(subscriptionsActions.subscriptionsMainIdle())
      .put(subscriptionsActions.subscriptionsPollIdle())

      .dispatch(actions.appStateBackground())
      .silentRun()
  })

  describe('on foreground', () => {
    it('guest', async () => {
      await expectSaga(testAsRootSaga(appState))
        .put(updatesActions.updatesCheckRequest())
        .not.put(authActions.authPrefetchRequest())

        .dispatch(actions.appStateForeground())
        .silentRun()
    })

    it('authorized', async () => {
      const user = { userId: '1', username: 'username' }

      await expectSaga(testAsRootSaga(appState))
        .withState(makeAuthorizedState(user))
        .put(updatesActions.updatesCheckRequest())
        .put(authActions.authPrefetchRequest())

        .dispatch(actions.appStateForeground())
        .silentRun()
    })
  })
})
