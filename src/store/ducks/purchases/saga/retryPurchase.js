import * as RNIap from 'react-native-iap'
import isEmpty from 'ramda/src/isEmpty'
import { put, call, delay, race, all } from 'redux-saga/effects'
import * as actions from 'store/ducks/purchases/actions'
import * as usersActions from 'store/ducks/users/actions'
import { purchaseComplete, purchaseRequest } from 'store/ducks/purchases/saga/purchase'
import * as Logger from 'services/Logger'

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
function* retryPurchase(req) {
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
    yield put(usersActions.usersGetProfileSelfRequest())
  } catch (error) {
    yield call([RNIap, 'clearTransactionIOS'])
    yield put(actions.retryPurchaseFailure(error.message))
    yield call([Logger, 'captureException'], error)
  }
}

export default retryPurchase
