import { put, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/camera/actions'
import * as constants from 'store/ducks/camera/constants'

function* handleCameraCaptureRequest(payload) {
  const response = yield payload.map(photo => ({
    uri: photo.uri,
    takenInReal: photo.takenInReal,
    preview: photo.preview,
    originalFormat: photo.originalFormat,
    originalMetadata: photo.originalMetadata,
    imageFormat: photo.imageFormat,
    crop: photo.crop,
  }))
  return response
}

function* cameraCaptureRequest(req) {
  try {
    const data = yield handleCameraCaptureRequest(req.payload)
    yield put(actions.cameraCaptureSuccess({ data }))
  } catch (error) {
    yield put(actions.cameraCaptureFailure({ message: error.message }))
  }
}

export default () => [
  takeLatest(constants.CAMERA_CAPTURE_REQUEST, cameraCaptureRequest),
]