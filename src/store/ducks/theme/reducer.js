import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/theme/constants'

const initialState = {
  themeFetch: {
    data: [],
    status: 'idle',
  },
  themePreview: {
    data: {
      name: null,
      theme: {},
    },
    status: 'idle',
  },
}

/**
 *
 */
const themeFetchRequest = (state) => update(state, {
  themeFetch: {
    status: { $set: 'loading' },
  },
})

const themeFetchSuccess = (state, action) => update(state, {
  themeFetch: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const themeFetchFailure = (state) => update(state, {
  themeFetch: {
    status: { $set: 'failure' },
  },
})

const themeFetchIdle = (state) => update(state, {
  themeFetch: {
    data: { $set: initialState.themeFetch.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const themePreviewRequest = (state) => update(state, {
  themePreview: {
    status: { $set: 'loading' },
  },
})

const themePreviewSuccess = (state, action) => update(state, {
  themePreview: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const themePreviewFailure = (state) => update(state, {
  themePreview: {
    status: { $set: 'failure' },
  },
})

const themePreviewIdle = (state) => update(state, {
  themePreview: {
    data: { $set: initialState.themePreview.data },
    status: { $set: 'idle' },
  },
})

export default handleActions({
  [constants.THEME_FETCH_REQUEST]: themeFetchRequest,
  [constants.THEME_FETCH_SUCCESS]: themeFetchSuccess,
  [constants.THEME_FETCH_FAILURE]: themeFetchFailure,
  [constants.THEME_FETCH_IDLE]: themeFetchIdle,

  [constants.THEME_PREVIEW_REQUEST]: themePreviewRequest,
  [constants.THEME_PREVIEW_SUCCESS]: themePreviewSuccess,
  [constants.THEME_PREVIEW_FAILURE]: themePreviewFailure,
  [constants.THEME_PREVIEW_IDLE]: themePreviewIdle,
}, initialState)
