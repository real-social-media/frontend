import * as RNIap from 'react-native-iap'
import isEmpty from 'ramda/src/isEmpty'
import propOr from 'ramda/src/propOr'
import { put, call, delay, race, all, takeEvery } from 'redux-saga/effects'
import * as constants from 'store/ducks/purchases/constants'
import * as authActions from 'store/ducks/auth/actions'
import * as actions from 'store/ducks/purchases/actions'
import { purchaseComplete, purchaseRequest } from 'store/ducks/purchases/saga/purchase'

/**
 *
 */
function* completePendingTransactions(transactions) {
  const { timeout } = yield race({
    timeout: delay(10000),
    done: all(transactions.map((purchase) => call(purchaseComplete, purchase))),
  })

  if (timeout) {
    throw new Error('Finish pending purchases request timeout')
  }
}

/**
 *
 */
export function* retryPurchase(req) {
  try {
    const { transactions } = yield race({
      timeout: delay(10000),
      transactions: call([RNIap, 'getPendingPurchasesIOS']),
    })

    if (transactions === undefined || isEmpty(transactions)) {
      const { productId } = req.payload
      yield call(purchaseRequest, productId)
    } else {
      yield call(completePendingTransactions, transactions)
    }

    yield put(actions.retryPurchaseSuccess())
    yield put(authActions.authGetUserRequest())
  } catch (error) {
    yield call([RNIap, 'clearTransactionIOS'])
    const messageCode = propOr('GENERIC', 'code', error)
    yield put(actions.retryPurchaseFailure(error, { messageCode }))
  }
}

export default () => [takeEvery(constants.RETRY_PURCHASE_REQUEST, retryPurchase)]
