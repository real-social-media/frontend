import { put, call, take, race, getContext, takeEvery } from 'redux-saga/effects'
import {
  federatedAppleSignin,
  validateUserExistance,
} from 'services/AWS'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as queries from 'store/ducks/auth/queries'
import * as queryService from 'services/Query'

function* getApplePayload() {
  const apple = yield call(federatedAppleSignin)

  const userPayload = {
    id: apple.user.id,
    fullName: apple.user.fullName,
    email: apple.user.email,
    authProvider: 'APPLE',
    token: apple.token,
    expires_at: apple.expires_at,
  }

  return userPayload
}

/**
 *
 */
function* appleAuthenticateExisting(userPayload) {
  const AwsAuth = yield getContext('AwsAuth')

  return yield AwsAuth.federatedSignIn('appleid.apple.com', {
    token: userPayload.token,
    expires_at: userPayload.expires_at,
  }, userPayload)
}

function* setFullname(fullName) {
  try {
    yield call([queryService, 'apiRequest'], queries.setFullname, { fullName })
  } catch (error) {
    // ignore
  }
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
    yield call([queryService, 'apiRequest'], queries.linkAppleLogin, { appleIdToken: userPayload.token })
    yield call(setFullname, userPayload.fullName)
  }
}

function* handleAuthAppleRequest() {
  const userPayload = yield call(getApplePayload)
  const userExists = yield call(validateUserExistance, userPayload)

  if (!userExists) {
    yield call(createAnonymousUser, userPayload)
  }

  yield call(appleAuthenticateExisting, userPayload)
  yield put(actions.authFlowRequest({ allowAnonymous: userExists, authProvider: 'APPLE', userExists }))

  const { flowFailure } = yield race({
    flowSuccess: take(constants.AUTH_FLOW_SUCCESS),
    flowFailure: take(constants.AUTH_FLOW_FAILURE),
  })

  if (flowFailure) {
    throw new Error('Failed to obtain flow')
  }
}

/**
 *
 */
function* authSigninAppleRequest(req) {
  try {
    yield handleAuthAppleRequest(req.payload)
    yield put(actions.authSigninAppleSuccess())
  } catch (error) {
    if (error.message && error.message.includes('The user canceled the sign in request')) {
      yield put(actions.authSigninAppleFailure(error, { messageCode: 'CANCELED' }))
    } else {
      yield put(actions.authSigninAppleFailure(error))
    }
  }
}

export default () => [
  takeEvery(constants.AUTH_SIGNIN_APPLE_REQUEST, authSigninAppleRequest),
]
