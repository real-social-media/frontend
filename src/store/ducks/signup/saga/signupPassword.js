import forge from 'node-forge'
import Config from 'react-native-config'
import { put, call, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as queries from 'store/ducks/signup/queries'
import * as queryService from 'services/Query'
import authorize from 'store/ducks/auth/saga/authorize'

/**
 *
 */
export function encryptPassword(password) {
  const publicKey = forge.pki.publicKeyFromPem(Config.REAL_PUBLIC_KEY_PEM)
  const encodedPassword = forge.util.encodeUtf8(password)
  const encrypted = publicKey.encrypt(encodedPassword, 'RSA-OAEP')
  const encryptedPassword = forge.util.encode64(encrypted)

  return encryptedPassword
}

/**
 *
 */
function* handleSignupPasswordRequest({ password }) {
  const encryptedPassword = yield call(encryptPassword, password)

  yield call([queryService, 'apiRequest'], queries.setUserPassword, { encryptedPassword })
  yield call(authorize)
}

/**
 *
 */
function* signupPasswordRequest(req) {
  try {
    yield call(handleSignupPasswordRequest, req.payload)
    yield put(actions.signupPasswordSuccess())
  } catch (error) {
    yield put(actions.signupPasswordFailure(error))
  }
}

export default () => [takeEvery(constants.SIGNUP_PASSWORD_REQUEST, signupPasswordRequest)]
