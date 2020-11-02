import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/dating/constants'

/**
 * 
 */
export const datingMatchedUsersIdle = createAction(constants.DATING_MATCHED_USERS_IDLE)
export const datingMatchedUsersRequest = createAction(constants.DATING_MATCHED_USERS_REQUEST)
export const datingMatchedUsersSuccess = createAction(constants.DATING_MATCHED_USERS_SUCCESS)
export const datingMatchedUsersFailure = createAction(constants.DATING_MATCHED_USERS_FAILURE)

/**
 * 
 */
export const datingConfirmedUsersIdle = createAction(constants.DATING_CONFIRMED_USERS_IDLE)
export const datingConfirmedUsersRequest = createAction(constants.DATING_CONFIRMED_USERS_REQUEST)
export const datingConfirmedUsersSuccess = createAction(constants.DATING_CONFIRMED_USERS_SUCCESS)
export const datingConfirmedUsersFailure = createAction(constants.DATING_CONFIRMED_USERS_FAILURE)

/**
 * 
 */
export const datingMatchApproveIdle = createAction(constants.DATING_MATCH_APPROVE_IDLE)
export const datingMatchApproveRequest = createAction(constants.DATING_MATCH_APPROVE_REQUEST)
export const datingMatchApproveSuccess = createAction(constants.DATING_MATCH_APPROVE_SUCCESS)
export const datingMatchApproveFailure = createAction(constants.DATING_MATCH_APPROVE_FAILURE)

/**
 * 
 */
export const datingMatchRejectIdle = createAction(constants.DATING_MATCH_REJECT_IDLE)
export const datingMatchRejectRequest = createAction(constants.DATING_MATCH_REJECT_REQUEST)
export const datingMatchRejectSuccess = createAction(constants.DATING_MATCH_REJECT_SUCCESS)
export const datingMatchRejectFailure = createAction(constants.DATING_MATCH_REJECT_FAILURE)
