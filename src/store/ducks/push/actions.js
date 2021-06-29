import { createAction } from 'redux-actions'
import { createFailureAction } from 'store/errors'
import * as constants from 'store/ducks/push/constants'

/**
 *
 */
export const pushStartRequest = createAction(constants.PUSH_START_REQUEST)
export const pushStartSuccess = createAction(constants.PUSH_START_SUCCESS)
export const pushStartFailure = createFailureAction(constants.PUSH_START_FAILURE)
