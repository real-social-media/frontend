import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/cache/constants'

/**
 * 
 */
export const cacheFetchIdle = createAction(constants.CACHE_FETCH_IDLE)
export const cacheFetchRequest = createAction(constants.CACHE_FETCH_REQUEST)
export const cacheFetchSuccess = createAction(constants.CACHE_FETCH_SUCCESS)
export const cacheFetchProgress = createAction(constants.CACHE_FETCH_PROGRESS)
export const cacheFetchFailure = createAction(constants.CACHE_FETCH_FAILURE)

export const cacheFetch64pRequest = createAction(constants.CACHE_FETCH_64P_REQUEST)
export const cacheFetch480pRequest = createAction(constants.CACHE_FETCH_480P_REQUEST)
export const cacheFetch1080pRequest = createAction(constants.CACHE_FETCH_1080P_REQUEST)
export const cacheFetch4kRequest = createAction(constants.CACHE_FETCH_4K_REQUEST)