import { takeEvery } from 'redux-saga/effects'
import * as constants from 'store/ducks/purchases/constants'
import purchaseRequest from 'store/ducks/purchases/saga/purchase'
import retryPurchaseRequest from 'store/ducks/purchases/saga/retryPurchase'

export default () => [
  takeEvery(constants.PURCHASE_REQUEST, purchaseRequest),
  takeEvery(constants.RETRY_PURCHASE_REQUEST, retryPurchaseRequest),
]
