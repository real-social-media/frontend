import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/snackbars/constants'

/**
 *
 */
export const toggleDebugMode = createAction(constants.TOGGLE_DEBUG_MODE)
