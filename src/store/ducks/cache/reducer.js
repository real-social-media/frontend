import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/cache/constants'

const initialState = {
  cached: {},
  buffer: {},
  progress: {},
  failed: {},
}

/**
 *
 */
const cacheFetchProgress = (state, action) => update(state, {
  progress: {
    [action.payload.signature.partial]: { $set: action.payload.progress },
  },
  cached: {
    $unset: [action.payload.signature.partial],
  },
  failed: {
    $unset: [action.payload.signature.partial],
  },
})

const cacheFetchSuccess = (state, action) => update(state, {
  cached: {
    [action.payload.signature.partial]: { $set: action.payload.signature.path },
  },
  progress: {
    $unset: [action.payload.signature.partial],
  },
  failed: {
    $unset: [action.payload.signature.partial],
  },
})

const cacheFetchFailure = (state, action) => update(state, {
  progress: {
    $unset: [action.payload.signature.partial],
  },
  cached: {
    $unset: [action.payload.signature.partial],
  },
  failed: {
    [action.payload.signature.partial]: { $set: action.payload.signature.path },
  },
})

const cacheFetchIdle = (state, action) => update(state, {
  progress: {
    $unset: [action.payload.signature.partial],
  },
  cached: {
    $unset: [action.payload.signature.partial],
  },
  failed: {
    $unset: [action.payload.signature.partial],
  },
})

export default handleActions({
  [constants.CACHE_FETCH_SUCCESS]: cacheFetchSuccess,
  [constants.CACHE_FETCH_FAILURE]: cacheFetchFailure,
  [constants.CACHE_FETCH_PROGRESS]: cacheFetchProgress,
  [constants.CACHE_FETCH_IDLE]: cacheFetchIdle,
}, initialState)
