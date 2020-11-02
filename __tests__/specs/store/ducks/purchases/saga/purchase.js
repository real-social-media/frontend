import * as RNIap from 'react-native-iap'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { testAsRootSaga, provideDelay } from 'tests/utils/helpers'
import purchases from 'store/ducks/purchases/saga'
import * as actions from 'store/ducks/purchases/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as constants from 'store/ducks/purchases/constants'
import * as queries from 'store/ducks/purchases/queries'
import * as queryService from 'services/Query'
import * as Logger from 'services/Logger'

jest.mock('services/Query', () => ({
  apiRequest: jest.fn(),
}))

jest.mock('react-native-iap', () => ({
  initConnection: jest.fn(),
  purchaseUpdatedListener: jest.fn(),
  purchaseErrorListener: jest.fn(),
  endConnection: jest.fn(),
  finishTransactionIOS: jest.fn(),
  requestSubscription: jest.fn(),
  getSubscriptions: jest.fn(),
}))

const premium = { productId: constants.PRIMARY_SUBSCRIPTION }
const purchase = {
  transactionReceipt: 'transactionReceipt',
  transactionId: 'transactionId',
}

const updatedListener = { remove: jest.fn() }
const errorListener = { remove: jest.fn() }
RNIap.purchaseUpdatedListener.mockReturnValue(updatedListener)
RNIap.purchaseErrorListener.mockReturnValue(errorListener)
RNIap.initConnection.mockResolvedValue(true)

function expectClosedChannel() {
  expect(RNIap.initConnection).toHaveBeenCalled()
  expect(RNIap.purchaseUpdatedListener).toHaveBeenCalled()
  expect(RNIap.purchaseErrorListener).toHaveBeenCalled()
  expect(updatedListener.remove).toHaveBeenCalled()
  expect(errorListener.remove).toHaveBeenCalled()
  expect(RNIap.endConnection).toHaveBeenCalled()
}

function getCallbacks() {
  return {
    handleSuccess: RNIap.purchaseUpdatedListener.mock.calls[0][0],
    handleError: RNIap.purchaseErrorListener.mock.calls[0][0],
  }
}

describe('Purchases saga', () => {
  afterEach(() => {
    updatedListener.remove.mockClear()
    errorListener.remove.mockClear()

    Logger.captureException.mockClear()

    RNIap.initConnection.mockClear()
    RNIap.purchaseUpdatedListener.mockClear()
    RNIap.purchaseErrorListener.mockClear()
    RNIap.endConnection.mockClear()
    RNIap.finishTransactionIOS.mockClear()
    RNIap.requestSubscription.mockClear()
  })

  it('timeout error', () => {
    const promise = expectSaga(testAsRootSaga(purchases))
      .provide([provideDelay(true)])

      .call([RNIap, 'getSubscriptions'], [premium.productId])
      .call([RNIap, 'requestSubscription'], premium.productId, false)
      .put(actions.purchaseFailure('Purchase Request Timeout'))

      .dispatch(actions.purchaseRequest(premium))
      .silentRun()

    setTimeout(() => {
      expectClosedChannel()
      expect(Logger.captureException).toHaveBeenCalled()
      expect(Logger.captureException.mock.calls[0][0].message).toBe('Purchase Request Timeout')
    }, 0)

    return promise
  })

  it('error from listener', () => {
    const error = new Error('Listener error')
    const promise = expectSaga(testAsRootSaga(purchases))
      .call([RNIap, 'getSubscriptions'], [premium.productId])
      .call([RNIap, 'requestSubscription'], premium.productId, false)
      .put(actions.purchaseFailure(error.message))
      .call([Logger, 'captureException'], error)

      .dispatch(actions.purchaseRequest(premium))
      .silentRun()

    setTimeout(() => {
      getCallbacks().handleError(error)
      expectClosedChannel()
    }, 0)

    return promise
  })

  it('success', () => {
    const promise = expectSaga(testAsRootSaga(purchases))
      .provide([[matchers.call.fn(queryService.apiRequest), Promise.resolve()]])

      .call([RNIap, 'getSubscriptions'], [premium.productId])
      .call([RNIap, 'requestSubscription'], premium.productId, false)
      .call(queryService.apiRequest, queries.addAppStoreReceipt, { receiptData: purchase.transactionReceipt })
      .call([RNIap, 'finishTransactionIOS'], purchase.transactionId)
      .put(actions.purchaseSuccess())
      .put(usersActions.usersGetProfileSelfRequest())

      .dispatch(actions.purchaseRequest(premium))
      .silentRun()

    setTimeout(() => {
      getCallbacks().handleSuccess(purchase)
    }, 0)

    setTimeout(expectClosedChannel, 10)

    return promise
  })

  it('backend error', () => {
    const error = new Error('Backend error')

    const promise = expectSaga(testAsRootSaga(purchases))
      .provide([[matchers.call.fn(queryService.apiRequest), throwError(error)]])

      .call([RNIap, 'requestSubscription'], premium.productId, false)
      .call(queryService.apiRequest, queries.addAppStoreReceipt, { receiptData: purchase.transactionReceipt })
      .not.call([RNIap, 'finishTransactionIOS'], purchase.transactionId)
      .put(actions.purchaseFailure(error.message))
      .call([Logger, 'captureException'], error)

      .dispatch(actions.purchaseRequest(premium))
      .silentRun()

    setTimeout(() => {
      getCallbacks().handleSuccess(purchase)
      expectClosedChannel()
    }, 0)

    return promise
  })
})
