import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/dating/constants'

export const initialState = {
  datingGet: {
    data: [],
    status: 'idle',
    error: {}
  }
}

/**
 *
 */
const datingGetRequest = (state) => update(state, {
  datingGet: {
    status: { $set: 'loading' }
  }
})

const datingGetSuccess = (state, action) => update(state, {
  datingGet: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  }
})

const datingGetFailure = (state, action) => update(state, {
  datingGet: {
    error: { $set: action.payload.message },
    status: { $set: 'failure' }
  }
})

const datingGetIdle = (state) => update(state, {
  datingGet: {
    data: { $set: initialState.datingGet.data },
    error: { $set: initialState.datingGet.error },
    status: { $set: 'idle' }
  }
})

export default handleActions({
  [constants.DATING_GET_REQUEST]: datingGetRequest,
  [constants.DATING_GET_SUCCESS]: datingGetSuccess,
  [constants.DATING_GET_FAILURE]: datingGetFailure,
  [constants.DATING_GET_IDLE]:    datingGetIdle
}, initialState)
