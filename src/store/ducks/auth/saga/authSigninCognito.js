import { put, call, getContext, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import propOr from 'ramda/src/propOr'
import authorize from 'store/ducks/auth/saga/authorize'

/**
 * Signin user. Currently supports email and password or phone number and password methods
 */
function* handleAuthSigninRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')

  yield call([AwsAuth, 'signIn'], payload.username, payload.password)
  yield call(authorize)
}

function* authSigninCognitoRequest(req) {
  try {
    yield handleAuthSigninRequest(req.payload)
    yield put(actions.authSigninCognitoSuccess())
  } catch (error) {
    const messageCode = propOr('GENERIC', error.code, {
      UserNotConfirmedException: 'USER_NOT_CONFIRMED',
      UserNotFoundException: 'USER_NOT_FOUND',
      NotAuthorizedException: 'USER_NOT_AUTHORIZED',
      InvalidParameterException: 'INVALID_PARAMETER',
    })

    yield put(actions.authSigninCognitoFailure(error, { messageCode }))
  }
}

export default () => [takeEvery(constants.AUTH_SIGNIN_COGNITO_REQUEST, authSigninCognitoRequest)]
