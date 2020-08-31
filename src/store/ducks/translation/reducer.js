import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/translation/constants'

const initialState = {
  /**
   *
   */
  translationFetch: {
    data: {
      en: {},
      de: {},
    },
    status: 'idle',
    error: {},
    payload: {},
  },
}

/**
 *
 */
const translationFetchRequest = (state, action) =>
  update(state, {
    translationFetch: {
      status: { $set: 'loading' },
      payload: { $set: action.payload },
    },
  })

const translationFetchSuccess = (state, action) =>
  update(state, {
    translationFetch: {
      data: { $set: action.payload.data },
      status: { $set: 'success' },
    },
  })

const translationFetchFailure = (state, action) =>
  update(state, {
    translationFetch: {
      error: { $set: action.payload.error },
      status: { $set: 'failure' },
    },
  })

const translationFetchIdle = (state) =>
  update(state, {
    translationFetch: {
      data: { $set: initialState.translationFetch.data },
      status: { $set: 'idle' },
    },
  })

export default handleActions(
  {
    [constants.TRANSLATION_FETCH_REQUEST]: translationFetchRequest,
    [constants.TRANSLATION_FETCH_SUCCESS]: translationFetchSuccess,
    [constants.TRANSLATION_FETCH_FAILURE]: translationFetchFailure,
    [constants.TRANSLATION_FETCH_IDLE]: translationFetchIdle,
  },
  initialState,
)
