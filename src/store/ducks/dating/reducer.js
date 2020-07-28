import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/dating/constants'

export const initialState = {
  datingGet: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },

  datingGetCache: {},
}

/**
 *
 */
const datingGetRequest = (state, action) => update(state, {
  datingGetCache: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: action.payload.userId,
      initialState: initialState.datingGet,
    },
  },
});

const datingGetSuccess = (state, action) => update(state, {
  datingGetCache: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.datingGet,
    },
  },
})

const datingGetFailure = (state, action) => update(state, {
  datingGetCache: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.datingGet,
    },
  },
})

const datingGetIdle = (state, action) => update(state, {
  datingGetCache: {
    $resourceCacheSetIdle: {
      ...action,
      resourceKey: action.payload.payload.userId,
      initialState: initialState.datingGet,
    },
  },
})

export default handleActions({
  [constants.DATING_GET_REQUEST]: datingGetRequest,
  [constants.DATING_GET_SUCCESS]: datingGetSuccess,
  [constants.DATING_GET_FAILURE]: datingGetFailure,
  [constants.DATING_GET_IDLE]: datingGetIdle,

}, initialState)
