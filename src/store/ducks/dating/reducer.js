import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from './constants'

export const initialState = {
  datingGetPartners: {},
}

/**
 *
 */
const datingGetPartnersRequest = (state, action) => update(state, {
  datingGetPartners: {
    $resourceCacheSetRequest: {
      ...action,
      resourceKey: 'data',
      initialState: initialState.datingGetPartners,
    },
  },
})

const datingGetPartnersSuccess = (state, action) => update(state, {
  datingGetPartners: {
    $resourceCacheSetSuccess: {
      ...action,
      resourceKey: 'data',
      initialState: initialState.datingGetPartners,
    },
  },
})

const datingGetPartnersFailure = (state, action) => update(state, {
  datingGetPartners: {
    $resourceCacheSetFailure: {
      ...action,
      resourceKey: 'data',
      initialState: initialState.datingGetPartners,
    },
  },
})

/**
 *
 */

export default handleActions({
  [constants.DATING_GET_PARTNERS_REQUEST]: datingGetPartnersRequest,
  [constants.DATING_GET_PARTNERS_SUCCESS]: datingGetPartnersSuccess,
  [constants.DATING_GET_PARTNERS_FAILURE]: datingGetPartnersFailure,
}, initialState)
