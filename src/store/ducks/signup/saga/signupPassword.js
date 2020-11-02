import { put, call, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as queries from 'store/ducks/signup/queries'
import * as errors from 'store/ducks/signup/errors'
import * as queryService from 'services/Query'
import * as authActions from 'store/ducks/auth/actions'
import { logEvent } from 'services/Analytics'
import forge from 'node-forge'
import Config from 'react-native-config' 

/**
 *
 */
function* handleSignupPasswordRequest(payload) {
  const publicKey = forge.pki.publicKeyFromPem(Config.AWS_API_PUBLIC_KEY)
  const password = forge.util.encodeUtf8(payload.password)
  const encrypted = publicKey.encrypt(password, 'RSA-OAEP')
  const encryptedPassword = forge.util.encode64(encrypted)
  return yield queryService.apiRequest(queries.setUserPassword, { encryptedPassword })
}

/**
 *
 */
function* signupPasswordRequest(req) {
  try {
    const data = yield call(handleSignupPasswordRequest, req.payload)
    yield put(actions.signupPasswordSuccess({
      message: errors.getMessagePayload(constants.SIGNUP_PASSWORD_SUCCESS, 'GENERIC'),
      payload: req.payload,
      data,
    }))
  } catch (error) {
    yield put(actions.signupPasswordFailure({
      message: errors.getMessagePayload(constants.SIGNUP_PASSWORD_FAILURE, 'GENERIC', error.message),
      payload: req.payload,
    }))
  }
}

function* signupPasswordSuccess() {
  logEvent('SIGNUP_PASSWORD_SUCCESS')
  yield put(authActions.authFlowRequest())
}

export default () => [
  takeEvery(constants.SIGNUP_PASSWORD_REQUEST, signupPasswordRequest),
  takeEvery(constants.SIGNUP_PASSWORD_SUCCESS, signupPasswordSuccess),
]