import * as RNIap from 'react-native-iap'
import { expectSaga } from 'redux-saga-test-plan'
import { testAsRootSaga } from 'tests/utils/helpers'
import purchases from 'store/ducks/purchases/saga'
import * as actions from 'store/ducks/purchases/actions'
import * as constants from 'store/ducks/purchases/constants'

/**
 * Mock Data
 */
const premium = { productId: constants.PRIMARY_SUBSCRIPTION }
const subscription = { localizedPrice: '9.99$' }

/**
 * Mock Functions
 */
jest.mock('react-native-iap', () => ({
  initConnection: jest.fn(),
  purchaseUpdatedListener: jest.fn(),
  purchaseErrorListener: jest.fn(),
  endConnection: jest.fn(),
  finishTransactionIOS: jest.fn(),
  requestSubscription: jest.fn(),
  getSubscriptions: jest.fn(),
}))

RNIap.getSubscriptions.mockResolvedValue([subscription])

describe('subscriptionGet', () => {
  afterEach(() => {
    RNIap.getSubscriptions.mockClear()
  })

  it('success', async () => {
    await expectSaga(testAsRootSaga(purchases))
      .call([RNIap, 'getSubscriptions'], [premium.productId])
      .put(actions.subscriptionGetSuccess(subscription))

      .dispatch(actions.subscriptionGetRequest(premium))
      .silentRun()
  })

  describe('failure', () => {
    it('request failure', async () => {
      const error = new Error('Error')
      RNIap.getSubscriptions.mockRejectedValueOnce(error)

      await expectSaga(testAsRootSaga(purchases))
        .call([RNIap, 'getSubscriptions'], [premium.productId])
        .put(actions.subscriptionGetFailure(error))

        .dispatch(actions.subscriptionGetRequest(premium))
        .silentRun()
    })

    it('not found', async () => {
      RNIap.getSubscriptions.mockResolvedValue([])

      await expectSaga(testAsRootSaga(purchases))
        .call([RNIap, 'getSubscriptions'], [premium.productId])
        .put(actions.subscriptionGetFailure(new Error('Subscriptions has not found')))

        .dispatch(actions.subscriptionGetRequest(premium))
        .silentRun()
    })
  })
})
