import * as RNIap from 'react-native-iap'
import { put, call, takeEvery } from 'redux-saga/effects'
import * as constants from 'store/ducks/purchases/constants'
import * as actions from 'store/ducks/purchases/actions'

function* subscriptionGetRequest(req) {
  try {
    const response = yield call([RNIap, 'getSubscriptions'], [req.payload.productId])

    if (!response.length) {
      throw new Error('Subscriptions has not found')
    }

    yield put(actions.subscriptionGetSuccess(response[0]))
  } catch (error) {
    yield put(actions.subscriptionGetFailure(error))
  }
}

export default () => [takeEvery(constants.SUBSCRIPTION_GET_REQUEST, subscriptionGetRequest)]
