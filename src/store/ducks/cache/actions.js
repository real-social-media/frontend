import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/cache/constants'

/**
 *
 */
export const cacheFetchRequest = createAction(constants.CACHE_FETCH_REQUEST)
export const cacheFetchSuccess = createAction(constants.CACHE_FETCH_SUCCESS)
export const cacheFetchFailure = createAction(constants.CACHE_FETCH_FAILURE)
export const cacheFetchProgress = createAction(constants.CACHE_FETCH_PROGRESS)
export const cacheFetchIdle = createAction(constants.CACHE_FETCH_IDLE)
