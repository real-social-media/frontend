/* eslint-disable no-useless-catch */
import * as RNIap from 'react-native-iap'
import { put, call, race, delay, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as actions from 'store/ducks/purchases/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/purchases/queries'
import * as queryService from 'services/Query'
import * as Logger from 'services/Logger'

/**
 *
 */
async function purchaseEmitter() {
  await RNIap.initConnection()

  return eventChannel((emitter) => {
    const handleSuccess = (purchase) => emitter({ eventType: 'success', eventData: { purchase } })
    const handleError = (error) => emitter({ eventType: 'error', eventData: { error } })

    const listeners = [RNIap.purchaseUpdatedListener(handleSuccess), RNIap.purchaseErrorListener(handleError)]

    return () => {
      listeners.forEach((listener) => listener.remove())
      RNIap.endConnection()
    }
  })
}

/**
 *
 */
export function* purchaseComplete(purchase) {
  yield call(queryService.apiRequest, queries.addAppStoreReceipt, { receiptData: purchase.transactionReceipt })
  yield call([RNIap, 'finishTransactionIOS'], purchase.transactionId)
}

/**
 *
 */
export function* purchaseRequest(productId) {
  let channel
  const finishTransactionAutomatically = false

  try {
    channel = yield call(purchaseEmitter)

    yield call([RNIap, 'getSubscriptions'], [productId])
    yield call([RNIap, 'requestSubscription'], productId, finishTransactionAutomatically)

    const { timeout, response } = yield race({
      timeout: delay(10000),
      response: take(channel),
    })

    if (timeout) {
      throw new Error('Purchase Request Timeout')
    }

    if (response.eventType === 'error') {
      throw response.eventData.error
    }

    yield call(purchaseComplete, response.eventData.purchase)
  } catch (error) {
    throw error
  } finally {
    if (channel) {
      channel.close()
    }
  }
}

function* purchase(req) {
  try {
    const { productId } = req.payload
    yield call(purchaseRequest, productId)
    yield put(actions.purchaseSuccess())
    yield put(usersActions.usersGetProfileSelfRequest())
  } catch (error) {
    yield put(actions.purchaseFailure(error.message))
    yield call([Logger, 'captureException'], error)
  }
}

export default purchase
