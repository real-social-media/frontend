import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as actions from 'store/ducks/auth/actions'
import authFlow from 'store/ducks/auth/saga/authFlow'
import { testAsRootSaga, testNavigate } from 'tests/utils/helpers'

describe('Auth flow', () => {
  it('redirect an user to explore page on success signup/signin', async () => {
    const navigation = { current: { navigate: jest.fn() } }

    await expectSaga(testAsRootSaga(authFlow))
      .provide([[getContext('ReactNavigationRef'), navigation]])
      .put(actions.authPrefetchRequest())

      .dispatch(actions.authFlowSuccess())
      .silentRun()

    testNavigate(navigation.current, 'App.Root.Home.Search')
  })
})
