import { put, call, getContext, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as queries from 'store/ducks/signup/queries'
import * as queryService from 'services/Query'
import Config from 'react-native-config'
import path from 'ramda/src/path'
import { generateExpirationDate } from 'store/ducks/signup/saga/helpers'
import authorize from 'store/ducks/auth/saga/authorize'

export const COGNITO_PROVIDER = `cognito-idp.${Config.AWS_COGNITO_REGION}.amazonaws.com/${Config.AWS_COGNITO_USER_POOL_ID}`

function* createAnonymousUser() {
  const response = yield call([queryService, 'apiRequest'], queries.createAnonymousUser)
  const tokens = path(['data', 'createAnonymousUser'], response)

  return tokens
}

export function* handleAnonymousSignin() {
  const AwsAuth = yield getContext('AwsAuth')
  const credentials = yield AwsAuth.currentUserCredentials()

  if (!credentials.authenticated) {
    const tokens = yield call(createAnonymousUser)
    const payload = { token: tokens.IdToken, expires_at: generateExpirationDate() }

    yield call([AwsAuth, 'federatedSignIn'], COGNITO_PROVIDER, payload, {})
  }
}

/**
 *
 */
function* authSigninAnonymousRequest() {
  try {
    yield call(handleAnonymousSignin)
    yield call(authorize)
    yield put(actions.authSigninAnonymousSuccess())
  } catch (error) {
    if (error.message && error.message.includes('The user canceled the sign in request')) {
      yield put(actions.authSigninAnonymousFailure(error, { messageCode: 'CANCELED' }))
    } else {
      yield put(actions.authSigninAnonymousFailure(error))
    }
  }
}

export default () => [takeEvery(constants.AUTH_SIGNIN_ANONYMOUS_REQUEST, authSigninAnonymousRequest)]
