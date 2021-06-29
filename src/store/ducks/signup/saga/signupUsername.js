import { put, call, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as queries from 'store/ducks/signup/queries'
import * as queryService from 'services/Query'
import * as navigationActions from 'navigation/actions'
import * as NavigationService from 'services/Navigation'
import path from 'ramda/src/path'
import authorize from 'store/ducks/auth/saga/authorize'

/**
 *
 */
function* handleSignupUsernameRequest(payload) {
  yield call([queryService, 'apiRequest'], queries.setUsername, { username: payload.username })
}

/**
 *
 */
function* signupUsernameRequest(req) {
  try {
    yield call(handleSignupUsernameRequest, req.payload)

    yield put(actions.signupUsernameSuccess(req.payload))
  } catch (error) {
    yield put(actions.signupUsernameFailure(error))
  }
}

function* signupUsernameSuccess(req) {
  const nextRoute = path(['nextRoute'], req.payload)
  const navigation = yield NavigationService.getNavigation()

  if (nextRoute === 'app') {
    yield call(authorize)
  } else {
    navigationActions.navigateAuthPassword(navigation)
  }
}

function* signupUsernameSkip(req) {
  yield call(signupUsernameSuccess, req)
}

export default () => [
  takeEvery(constants.SIGNUP_USERNAME_REQUEST, signupUsernameRequest),
  takeEvery(constants.SIGNUP_USERNAME_SUCCESS, signupUsernameSuccess),
  takeEvery(constants.SIGNUP_USERNAME_SKIP, signupUsernameSkip),
]
