import { put, takeLatest, call } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as errors from 'store/ducks/signup/errors'
import { logEvent } from 'services/Analytics'
import { usernameStatusRequest } from 'services/Validation'

function* gatewayUsernameStatus(payload) {
  const usernameStatus = yield call(usernameStatusRequest, payload.username)

  if (usernameStatus !== 'AVAILABLE') {
    throw new Error('USER_EXISTS')
  }
}

function* signupCheckRequest(req) {
  try {
    yield gatewayUsernameStatus(req.payload)
    yield put(actions.signupCheckSuccess({ payload: req.payload }))
  } catch (error) {
    yield put(actions.signupCheckFailure({
      message: errors.getMessagePayload(constants.SIGNUP_CHECK_FAILURE, 'USER_EXISTS', error.message),
      payload: req.payload,
    }))
  }
}

function* signupCheckSuccess() {

}

function* signupPhoneRequest(req) {
  yield put(actions.signupPhoneSuccess({ payload: req.payload }))
}

function signupPhoneSuccess() {
  logEvent('SIGNUP_PHONE_SUCCESS')
}

function* signupEmailRequest(req) {
  yield put(actions.signupEmailSuccess({ payload: req.payload }))
}

function signupEmailSuccess() {
  logEvent('SIGNUP_EMAIL_SUCCESS')
}

export default () => [
  takeLatest(constants.SIGNUP_CHECK_REQUEST, signupCheckRequest),
  takeLatest(constants.SIGNUP_CHECK_SUCCESS, signupCheckSuccess),

  takeLatest(constants.SIGNUP_PHONE_REQUEST, signupPhoneRequest),
  takeLatest(constants.SIGNUP_PHONE_SUCCESS, signupPhoneSuccess),

  takeLatest(constants.SIGNUP_EMAIL_REQUEST, signupEmailRequest),
  takeLatest(constants.SIGNUP_EMAIL_SUCCESS, signupEmailSuccess),
]