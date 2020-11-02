import { put, call, take, race, getContext, takeEvery } from 'redux-saga/effects'
import {
  federatedGoogleSignin,
  validateUserExistance,
} from 'services/AWS'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import * as queries from 'store/ducks/auth/queries'
import * as queryService from 'services/Query'

/**
 * Authenticate using google into identity pool
 */
function* getGooglePayload() {
  const google = yield federatedGoogleSignin()

  const userPayload = {
    id: google.user.id,
    name: google.user.name,
    email: google.user.email,
    authProvider: 'GOOGLE',
    token: google.token,
    expires_at: google.expires_at,
  }

  return userPayload
}

/**
 *
 */
function* googleAuthenticateExisting(userPayload) {
  const AwsAuth = yield getContext('AwsAuth')

  return yield AwsAuth.federatedSignIn('google', {
    token: userPayload.token,
    expires_at: userPayload.expires_at,
  }, userPayload)
}

/**
 *
 */
function* createAnonymousUser(userPayload) {
  try {
    yield call([queryService, 'apiRequest'], queries.createAnonymousUser)
  } catch (error) {
    // ignore
  } finally {
    yield call([queryService, 'apiRequest'], queries.linkGoogleLogin, { googleIdToken: userPayload.token })
    yield call([queryService, 'apiRequest'], queries.setFullname, { fullName: userPayload.name })
  }
}

/**
 *
 */
function* handleAuthSigninGoogleRequest() {
  const userPayload = yield call(getGooglePayload)
  const userExists = yield call(validateUserExistance, userPayload)

  if (!userExists) {
    yield call(createAnonymousUser, userPayload)
  }

  yield call(googleAuthenticateExisting, userPayload)
  yield put(actions.authFlowRequest({ allowAnonymous: userExists }))

  yield race({
    flowSuccess: take(constants.AUTH_FLOW_SUCCESS),
    flowFailure: take(constants.AUTH_FLOW_FAILURE),
  })
}

/**
 *
 */
function* authSigninGoogleRequest(req) {
  try {
    const data = yield handleAuthSigninGoogleRequest(req.payload)
    yield put(actions.authSigninGoogleSuccess({
      message: errors.getMessagePayload(constants.AUTH_SIGNIN_GOOGLE_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.message && error.message.includes('The user canceled the sign in request')) {
      yield put(actions.authSigninGoogleFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_GOOGLE_FAILURE, 'CANCELED', error.message),
      }))
    } else {
      yield put(actions.authSigninGoogleFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_GOOGLE_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

export default () => [
  takeEvery(constants.AUTH_SIGNIN_GOOGLE_REQUEST, authSigninGoogleRequest),
]