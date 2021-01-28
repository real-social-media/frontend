import { put, getContext, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import * as navigationActions from 'navigation/actions'
import { logEvent } from 'services/Analytics'

/**
 *
 */
function* handleAuthForgotRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  return yield AwsAuth.forgotPassword(payload.username)
}

/**
 *
 */
function* authForgotRequest(req) {
  try {
    yield handleAuthForgotRequest(req.payload)
    yield put(actions.authForgotSuccess())
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      yield put(actions.authForgotFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_FAILURE, 'USER_NOT_FOUND', error),
      }))
    } else {
      yield put(actions.authForgotFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_FAILURE, 'GENERIC', error),
      }))
    }
  }
}

function* authForgotSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateAuthForgotConfirm(ReactNavigationRef.current)
  logEvent('authForgotSuccess')
}

/**
 *
 */
function* handleAuthForgotConfirmRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  return yield AwsAuth.forgotPasswordSubmit(payload.username, payload.confirmationCode, payload.password)
}

/**
 *
 */
function* authForgotConfirmRequest(req) {
  try {
    const data = yield handleAuthForgotConfirmRequest(req.payload)
    yield put(actions.authForgotConfirmSuccess({
      message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.code === 'InvalidPasswordException') {
      yield put(actions.authForgotConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'INVALID_PASSWORD', error),
      }))
    } else if (error.code === 'CodeMismatchException') {
      yield put(actions.authForgotConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'CODE_MISMATCH', error),
      })) 
    } else {
      yield put(actions.authForgotConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'GENERIC', error),
      }))
    }
  }
}

function* authForgotConfirmSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateAuthSigninEmail(ReactNavigationRef.current)
  logEvent('AUTH_FORGOT_CONFIRM_SUCCESS')
}

export default () => [
  takeLatest(constants.AUTH_FORGOT_REQUEST, authForgotRequest),
  takeLatest(constants.AUTH_FORGOT_SUCCESS, authForgotSuccess),
  takeLatest(constants.AUTH_FORGOT_CONFIRM_REQUEST, authForgotConfirmRequest),
  takeLatest(constants.AUTH_FORGOT_CONFIRM_SUCCESS, authForgotConfirmSuccess),
]