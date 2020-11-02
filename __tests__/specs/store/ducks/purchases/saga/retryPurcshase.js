import * as RNIap from 'react-native-iap'
import { expectSaga, testSaga } from 'redux-saga-test-plan'
import { call, delay } from 'redux-saga/effects'
import * as matchers from 'redux-saga-test-plan/matchers'
import { throwError } from 'redux-saga-test-plan/providers'
import { testAsRootSaga } from 'tests/utils/helpers'
import purchases from 'store/ducks/purchases/saga'
import { purchaseRequest } from 'store/ducks/purchases/saga/purchase'
import retryPurchaseRequest from 'store/ducks/purchases/saga/retryPurchase'
import * as usersActions from 'store/ducks/users/actions'
import * as actions from 'store/ducks/purchases/actions'
import * as queries from 'store/ducks/purchases/queries'
import * as queryService from 'services/Query'
import * as Logger from 'services/Logger'

jest.mock('services/Query', () => ({
  apiRequest: jest.fn(),
}))

jest.mock('react-native-iap', () => ({
  getPendingPurchasesIOS: jest.fn(),
  finishTransactionIOS: jest.fn(),
  clearTransactionIOS: jest.fn(),
}))

const purchase = {
  transactionReceipt: 'transactionReceipt',
  transactionId: 'transactionId',
}

const action = actions.retryPurchaseRequest({ productId: '123' })

describe('Finish pending purchases saga', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
    RNIap.getPendingPurchasesIOS.mockClear()
    RNIap.finishTransactionIOS.mockClear()
    RNIap.clearTransactionIOS.mockClear()

    Logger.captureException.mockClear()
  })

  describe('retry request', () => {
    it('no pending transactions', () => {
      testSaga(retryPurchaseRequest, action)
        .next()
        .race({
          timeout: delay(10000),
          transactions: call([RNIap, 'getPendingPurchasesIOS']),
        })

        .next({ transactions: [] })
        .call(purchaseRequest, action.payload.productId)

        .next()
        .put(actions.retryPurchaseSuccess())

        .next()
        .put(usersActions.usersGetProfileSelfRequest())

        .next()
        .isDone()
    })

    it('pending purchases request timeout', () => {
      testSaga(retryPurchaseRequest, action)
        .next()
        .race({
          timeout: delay(10000),
          transactions: call([RNIap, 'getPendingPurchasesIOS']),
        })

        .next({ timeout: true })
        .call(purchaseRequest, action.payload.productId)

        .next()
        .put(actions.retryPurchaseSuccess())

        .next()
        .put(usersActions.usersGetProfileSelfRequest())

        .next()
        .isDone()
    })
  })

  describe('finish pending purchases', () => {
    it('backend error', () => {
      const error = new Error('Backend error')

      return expectSaga(testAsRootSaga(purchases))
        .provide([
          [call([RNIap, 'getPendingPurchasesIOS']), [purchase]],
          [matchers.call.fn(queryService.apiRequest), throwError(error)],
        ])

        .call(queryService.apiRequest, queries.addAppStoreReceipt, { receiptData: purchase.transactionReceipt })
        .not.call([RNIap, 'finishTransactionIOS'], purchase.transactionId)
        .put(actions.retryPurchaseFailure(error.message))
        .call([Logger, 'captureException'], error)

        .dispatch(action)
        .silentRun()
    })

    it('success', () => {
      return expectSaga(testAsRootSaga(purchases))
        .provide([
          [call([RNIap, 'getPendingPurchasesIOS']), [purchase]],
          [matchers.call.fn(queryService.apiRequest), Promise.resolve()],
        ])

        .call(queryService.apiRequest, queries.addAppStoreReceipt, { receiptData: purchase.transactionReceipt })
        .call([RNIap, 'finishTransactionIOS'], purchase.transactionId)
        .put(actions.retryPurchaseSuccess())
        .put(usersActions.usersGetProfileSelfRequest())

        .dispatch(action)
        .silentRun()
    })
  })
})
