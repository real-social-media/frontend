import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/purchases/constants'

/**
 *
 */
export const purchaseRequest = createAction(constants.PURCHASE_REQUEST)
export const purchaseSuccess = createAction(constants.PURCHASE_SUCCESS)
export const purchaseFailure = createAction(constants.PURCHASE_FAILURE)

/**
 *
 */
export const retryPurchaseRequest = createAction(constants.RETRY_PURCHASE_REQUEST)
export const retryPurchaseSuccess = createAction(constants.RETRY_PURCHASE_SUCCESS)
export const retryPurchaseFailure = createAction(constants.RETRY_PURCHASE_FAILURE)
