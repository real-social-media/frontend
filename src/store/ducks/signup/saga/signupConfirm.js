import { put, getContext, call, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as queries from 'store/ducks/signup/queries'
import * as errors from 'store/ducks/signup/errors'
import * as queryService from 'services/Query'
import * as navigationActions from 'navigation/actions'
import { logEvent } from 'services/Analytics'
import { Keyboard } from 'react-native'

/**
 *
 */
function* queryBasedOnSignupType(payload) {
  if (payload.usernameType === 'email') {
    return yield queryService.apiRequest(queries.finishChangeUserEmail, { verificationCode: payload.confirmationCode })
  }
  if (payload.usernameType === 'phone') {
    return yield queryService.apiRequest(queries.finishChangeUserPhoneNumber, { verificationCode: payload.confirmationCode })
  }
  return {}
}

function* handleSignupConfirmRequest(payload) {
  yield call(queryBasedOnSignupType, payload)
}

/**
 *
 */
function* signupConfirmRequest(req) {
  try {
    const data = yield handleSignupConfirmRequest(req.payload)
    yield put(actions.signupConfirmSuccess({
      message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_SUCCESS, 'GENERIC'),
      payload: req.payload,
      data,
    }))
  } catch (error) {
    if (error.code === 'AliasExistsException') {
      yield put(actions.signupConfirmFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'ALIAS_EXISTS', error.message),
        payload: req.payload,
      }))
    } else if (error.code === 'ExpiredCodeException') {
      yield put(actions.signupConfirmFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'CODE_EXPIRED', error.message),
        payload: req.payload,
      }))
    } else if (error.code === 'CodeMismatchException') {
      yield put(actions.signupConfirmFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'CODE_MISMATCH', error.message),
        payload: req.payload,
      }))
    } else {
      yield put(actions.signupConfirmFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'GENERIC', error.message),
        payload: req.payload,
      }))
    }
  }
}

function* signupConfirmSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateAuthUsername(ReactNavigationRef.current)
  logEvent('SIGNUP_CONFIRM_SUCCESS')

  yield put(actions.signupCreateIdle({}))
  yield put(actions.signupConfirmIdle({}))
  yield put(actions.signupCheckIdle({}))
  yield put(actions.signupPasswordIdle({}))

  Keyboard.dismiss()
}

export default () => [
  takeEvery(constants.SIGNUP_CONFIRM_REQUEST, signupConfirmRequest),
  takeEvery(constants.SIGNUP_CONFIRM_SUCCESS, signupConfirmSuccess),
]
