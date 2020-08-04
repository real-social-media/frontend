import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/dating/constants'

/**
 * 
 */
export const datingGetIdle    = createAction(constants.DATING_GET_IDLE)
export const datingGetRequest = createAction(constants.DATING_GET_REQUEST)
export const datingGetSuccess = createAction(constants.DATING_GET_SUCCESS)
export const datingGetFailure = createAction(constants.DATING_GET_FAILURE)
