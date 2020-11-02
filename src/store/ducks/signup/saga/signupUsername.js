import { put, call, takeEvery, getContext } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as queries from 'store/ducks/signup/queries'
import * as errors from 'store/ducks/signup/errors'
import * as queryService from 'services/Query'
import * as navigationActions from 'navigation/actions'
import { logEvent } from 'services/Analytics'

/**
 *
 */
function* handleSignupUsernameRequest(payload) {
  return yield queryService.apiRequest(queries.setUsername, { username: payload.username })
}

/**
 *
 */
function* signupUsernameRequest(req) {
  try {
    const data = yield call(handleSignupUsernameRequest, req.payload)
    yield put(actions.signupUsernameSuccess({
      message: errors.getMessagePayload(constants.SIGNUP_USERNAME_SUCCESS, 'GENERIC'),
      payload: req.payload,
      data,
    }))
  } catch (error) {
    yield put(actions.signupUsernameFailure({
      message: errors.getMessagePayload(constants.SIGNUP_USERNAME_FAILURE, 'GENERIC', error.message),
      payload: req.payload,
    }))
  }
}

function* signupUsernameSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateAuthPassword(ReactNavigationRef.current)
  logEvent('SIGNUP_USERNAME_SUCCESS')
}

export default () => [
  takeEvery(constants.SIGNUP_USERNAME_REQUEST, signupUsernameRequest),
  takeEvery(constants.SIGNUP_USERNAME_SUCCESS, signupUsernameSuccess),
]