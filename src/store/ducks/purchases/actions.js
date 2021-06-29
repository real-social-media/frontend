import { createAction } from 'redux-actions'
import { createFailureAction } from 'store/errors'
import * as constants from 'store/ducks/purchases/constants'

/**
 *
 */
export const purchaseRequest = createAction(constants.PURCHASE_REQUEST)
export const purchaseSuccess = createAction(constants.PURCHASE_SUCCESS)
export const purchaseFailure = createFailureAction(constants.PURCHASE_FAILURE)

/**
 *
 */
export const retryPurchaseRequest = createAction(constants.RETRY_PURCHASE_REQUEST)
export const retryPurchaseSuccess = createAction(constants.RETRY_PURCHASE_SUCCESS)
export const retryPurchaseFailure = createFailureAction(constants.RETRY_PURCHASE_FAILURE)

/**
 *
 */
export const subscriptionGetRequest = createAction(constants.SUBSCRIPTION_GET_REQUEST)
export const subscriptionGetSuccess = createAction(constants.SUBSCRIPTION_GET_SUCCESS)
export const subscriptionGetFailure = createFailureAction(constants.SUBSCRIPTION_GET_FAILURE)
