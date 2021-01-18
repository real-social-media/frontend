import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import * as actions from 'store/ducks/auth/actions'
import authFlow from 'store/ducks/auth/saga/authFlow'
import { testAsRootSaga, testNavigate } from 'tests/utils/helpers'

const navigation = { navigate: jest.fn(), reset: jest.fn() }

describe('Auth flow', () => {
  afterEach(() => {
    navigation.navigate.mockClear()
  })

  it('authPrefetchRequest on success', async () => {
    await expectSaga(testAsRootSaga(authFlow))
      .provide([[getContext('ReactNavigationRef'), { current: navigation }]])
      .put(actions.authPrefetchRequest())

      .dispatch(actions.authFlowSuccess())
      .silentRun()

    expect(navigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'App' }] })
  })

  it('redirect to auth home on failure', async () => {
    await expectSaga(testAsRootSaga(authFlow))
      .provide([[getContext('ReactNavigationRef'), { current: navigation }]])
      .dispatch(actions.authFlowFailure())
      .silentRun()

    testNavigate(navigation, 'Auth.AuthHome')
  })
})
