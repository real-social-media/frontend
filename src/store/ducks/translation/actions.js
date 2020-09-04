import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/translation/constants'

/**
 * 
 */
export const translationFetchIdle = createAction(constants.TRANSLATION_FETCH_IDLE)
export const translationFetchRequest = createAction(constants.TRANSLATION_FETCH_REQUEST)
export const translationFetchSuccess = createAction(constants.TRANSLATION_FETCH_SUCCESS)
export const translationFetchFailure = createAction(constants.TRANSLATION_FETCH_FAILURE)
