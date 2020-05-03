import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/camera/constants'

export const initialState = {
  cameraCapture: {
    data: [],
    payload: [],
    status: 'idle',
  },
}

/**
 *
 */
export const cameraCaptureRequest = (state, action) => update(state, {
  cameraCapture: {
    payload: { $set: action.payload },
    status: { $set: 'loading' },
  },
})

export const cameraCaptureSuccess = (state, action) => update(state, {
  cameraCapture: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

export const cameraCaptureFailure = (state, action) => update(state, {
  cameraCapture: {
    status: { $set: 'failure' },
  },
})

export const cameraCaptureIdle = (state, action) => update(state, {
  cameraCapture: {
    data: { $set: state.cameraCapture.data.filter(item => item.uri !== action.payload.payload.uri) },
    status: { $set: 'idle' },
  },
})

export default handleActions({
  [constants.CAMERA_CAPTURE_REQUEST]: cameraCaptureRequest,
  [constants.CAMERA_CAPTURE_SUCCESS]: cameraCaptureSuccess,
  [constants.CAMERA_CAPTURE_FAILURE]: cameraCaptureFailure,
  [constants.CAMERA_CAPTURE_IDLE]: cameraCaptureIdle,
}, initialState)
