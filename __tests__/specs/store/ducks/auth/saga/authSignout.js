import { getContext } from 'redux-saga/effects'
import { expectSaga } from 'redux-saga-test-plan'
import authSignout from 'store/ducks/auth/saga/authSignout'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as actions from 'store/ducks/auth/actions'
import { testAsRootSaga } from 'tests/utils/helpers'
import { federatedGoogleSignout } from 'services/AWS'

/**
 * Mock Functions
 */
const AwsAuth = { signOut: jest.fn() }
const navigation = { navigate: jest.fn(), reset: jest.fn() }

jest.mock('services/AWS', () => ({ federatedGoogleSignout: jest.fn() }))

/**
 * Mock Context
 */
const context = [
  [getContext('AwsAuth'), AwsAuth],
  [getContext('ReactNavigationRef'), { current: navigation }],
]

describe('authSignout', () => {
  describe('success', () => {
    const testSignout = async (action) => {
      await expectSaga(testAsRootSaga(authSignout))
        .provide(context)

        .call([AwsAuth, 'signOut'])
        .call(federatedGoogleSignout)

        .dispatch(action)
        .silentRun()

      expect(navigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Auth' }] })
    }

    it('authSignoutRequest', async () => {
      await expectSaga(testAsRootSaga(authSignout))
        .provide(context)

        .call([AwsAuth, 'signOut'])
        .call(federatedGoogleSignout)
        .put(subscriptionsActions.subscriptionsMainIdle())
        .put(subscriptionsActions.subscriptionsPollIdle())
        .put(actions.authSignoutSuccess())

        .dispatch(actions.authSignoutRequest())
        .silentRun()

      expect(navigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Auth' }] })
    })

    it('authFlowFailure', async () => {
      await expectSaga(testAsRootSaga(authSignout))
        .provide(context)

        .call([AwsAuth, 'signOut'])
        .call(federatedGoogleSignout)
        .put(subscriptionsActions.subscriptionsMainIdle())
        .put(subscriptionsActions.subscriptionsPollIdle())
        .put(actions.authSignoutSuccess())

        .dispatch(actions.authFlowFailure())
        .silentRun()

      expect(navigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Auth' }] })
    })

    it('authSigninAnonymousFailure', async () => {
      await testSignout(actions.authSigninAnonymousFailure())
    })

    it('authSigninAppleFailure', async () => {
      await testSignout(actions.authSigninAppleFailure())
    })

    it('authSigninCognitoFailure', async () => {
      await testSignout(actions.authSigninCognitoFailure())
    })

    it('authSigninGoogleFailure', async () => {
      await testSignout(actions.authSigninGoogleFailure())
    })
  })

  it('failure', async () => {
    const error = new Error('Error')
    AwsAuth.signOut.mockRejectedValueOnce(error)

    await expectSaga(testAsRootSaga(authSignout))
      .provide(context)

      .put(actions.authSignoutFailure(error))

      .dispatch(actions.authSignoutRequest())
      .silentRun()

    expect(navigation.reset).toHaveBeenCalledWith({ index: 0, routes: [{ name: 'Auth' }] })
  })
})
