import purchaseRequest from 'store/ducks/purchases/saga/purchase'
import purchaseRetryRequest from 'store/ducks/purchases/saga/retryPurchase'
import subscriptionGet from 'store/ducks/purchases/saga/subscriptionGet'

export default () =>
  []
    .concat(purchaseRequest())
    .concat(purchaseRetryRequest())
    .concat(subscriptionGet())
