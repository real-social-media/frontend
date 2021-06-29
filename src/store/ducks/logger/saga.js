import { takeEvery, call, select } from 'redux-saga/effects'
import { CancelRequestOnSignoutError } from 'store/errors'
import * as authSelector from 'store/ducks/auth/selectors'
import * as constants from 'store/ducks/auth/constants'
import * as Logger from 'services/Logger'

const SINGIN_ACTIONS = [
  constants.AUTH_SIGNIN_COGNITO_SUCCESS,
  constants.AUTH_SIGNIN_ANONYMOUS_SUCCESS,
  constants.AUTH_SIGNIN_GOOGLE_SUCCESS,
  constants.AUTH_SIGNIN_APPLE_SUCCESS,
]

/**
 *
 */
function* setScope() {
  const authUser = yield select(authSelector.authUser)
  const authenticated = {
    id: authUser.userId,
    username: authUser.username,
    email: authUser.email,
  }
  yield call([Logger, 'setUser'], authenticated)
}

/**
 *
 */
function* clearScope() {
  yield call([Logger, 'clearScope'])
}

/**
 *
 */
function* captureErrors(action) {
  try {
    const error = action.payload

    if (error instanceof CancelRequestOnSignoutError) {
      return false
    }

    Logger.withScope((scope) => {
      scope.setExtra('action', action.type)
      scope.setExtra('meta', JSON.stringify(action.meta))
      Logger.captureException(error)
    })
  } catch (error) {
    yield call([Logger, 'captureException'], error)
  }
}

export default () => [
  takeEvery(SINGIN_ACTIONS, setScope),
  takeEvery(constants.AUTH_SIGNOUT_SUCCESS, clearScope),
  takeEvery((action) => /FAILURE$/.test(action.type), captureErrors),
]
