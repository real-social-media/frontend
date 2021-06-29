import { put, getContext, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as navigationActions from 'navigation/actions'

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
      yield put(actions.authForgotFailure(error, { messageCode: 'USER_NOT_FOUND' }))
    } else {
      yield put(actions.authForgotFailure(error))
    }
  }
}

function* authForgotSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateAuthForgotConfirm(ReactNavigationRef.current)
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
    yield put(actions.authForgotConfirmSuccess({ data }))
  } catch (error) {
    if (error.code === 'InvalidPasswordException') {
      yield put(actions.authForgotConfirmFailure(error, { messageCode: 'INVALID_PASSWORD' }))
    } else if (error.code === 'CodeMismatchException') {
      yield put(actions.authForgotConfirmFailure(error, { messageCode: 'CODE_MISMATCH' }))
    } else {
      yield put(actions.authForgotConfirmFailure(error))
    }
  }
}

function* authForgotConfirmSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateAuthSigninEmail(ReactNavigationRef.current)
}

export default () => [
  takeLatest(constants.AUTH_FORGOT_REQUEST, authForgotRequest),
  takeLatest(constants.AUTH_FORGOT_SUCCESS, authForgotSuccess),
  takeLatest(constants.AUTH_FORGOT_CONFIRM_REQUEST, authForgotConfirmRequest),
  takeLatest(constants.AUTH_FORGOT_CONFIRM_SUCCESS, authForgotConfirmSuccess),
]
