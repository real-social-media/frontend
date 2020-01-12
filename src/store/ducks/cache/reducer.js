import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/cache/constants'

const initialState = {
  /**
   *
   */
  cacheFetch: {
    data: {},
    status: 'idle',
    error: {},
    payload: {},
  },
}

/**
 *
 */
const cacheFetchRequest = (state, action) => update(state, {
  cacheFetch: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const cacheFetchSuccess = (state, action) => update(state, {
  cacheFetch: {
    data: {
      [action.payload.data.partial]: { $set: action.payload.data },
    },
    status: { $set: 'success' },
  },
})

const cacheFetchFailure = (state, action) => update(state, {
  cacheFetch: {
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
  },
})

const cacheFetchIdle = (state, action) => update(state, {
  cacheFetch: {
    data: { $set: initialState.cacheFetch.data },
    status: { $set: 'idle' },
  },
})

const cacheFetchProgress = (state, action) => {
  return state
}

export default handleActions({
  [constants.CACHE_FETCH_REQUEST]: cacheFetchRequest,
  [constants.CACHE_FETCH_SUCCESS]: cacheFetchSuccess,
  [constants.CACHE_FETCH_FAILURE]: cacheFetchFailure,
  [constants.CACHE_FETCH_PROGRESS]: cacheFetchProgress,
  [constants.CACHE_FETCH_IDLE]: cacheFetchIdle,
}, initialState)
