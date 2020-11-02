import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/app/constants'

export const initialState = {
  appReady: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },

  appThemePreview: {
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
const appReadyRequest = (state) => update(state, {
  appReady: {
    status: { $set: 'loading' },
  },
})

const appReadySuccess = (state, action) => update(state, {
  user: {
    $set: action.payload.data,
  },
  appReady: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    error: { $set: initialState.appReady.error },
    payload: {},
    meta: { $set: action.payload.meta },
  },
})

const appReadyFailure = (state, action) => update(state, {
  appReady: {
    data: { $set: initialState.appReady.data },
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
    payload: {},
    meta: { $set: action.payload.meta },
  },
})

const appReadyIdle = (state) => update(state, {
  appReady: { $set: initialState.appReady },
})

/**
 *
 */
const appThemePreviewRequest = (state) => update(state, {
  appThemePreview: {
    status: { $set: 'loading' },
  },
})

const appThemePreviewSuccess = (state, action) => update(state, {
  appThemePreview: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const appThemePreviewFailure = (state) => update(state, {
  appThemePreview: {
    status: { $set: 'failure' },
  },
})

const appThemePreviewIdle = (state) => update(state, {
  appThemePreview: {
    data: { $set: initialState.appThemePreview.data },
    status: { $set: 'idle' },
  },
})

export default handleActions({
  [constants.APP_READY_REQUEST]: appReadyRequest,
  [constants.APP_READY_SUCCESS]: appReadySuccess,
  [constants.APP_READY_FAILURE]: appReadyFailure,
  [constants.APP_READY_IDLE]: appReadyIdle,

  [constants.APP_THEME_PREVIEW_REQUEST]: appThemePreviewRequest,
  [constants.APP_THEME_PREVIEW_SUCCESS]: appThemePreviewSuccess,
  [constants.APP_THEME_PREVIEW_FAILURE]: appThemePreviewFailure,
  [constants.APP_THEME_PREVIEW_IDLE]: appThemePreviewIdle,
}, initialState)
