import * as AWS from 'aws-sdk/global'
import { put, getContext, takeEvery, takeLatest } from 'redux-saga/effects'
import path from 'ramda/src/path'
import {
  federatedGoogleSignin,
  federatedGoogleSignout,
  federatedAppleSignin,
} from 'services/AWS'
import {
  saveAppleSigninPersist,
  getAppleSigninPersist,
  resetAuthUserPersist,
} from 'services/Auth'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import Config from 'react-native-config'

/**
 * Signin user. Currently supports email and password or phone number and password methods
 */
function* handleAuthSigninRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  return yield AwsAuth.signIn(payload.username, payload.password)
}

function* authSigninRequest(req) {
  try {
    yield handleAuthSigninRequest(req.payload)
    yield put(actions.authSigninSuccess())
  } catch (error) {
    if (error.code === 'UserNotConfirmedException') {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_CONFIRMED'),
      }))
    } else if (error.code === 'UserNotFoundException') {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_FOUND'),
      }))
    } else if (error.code === 'NotAuthorizedException') {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_AUTHORIZED'),
      }))
    } else if (error.code === 'InvalidParameterException') {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'INVALID_PARAMETER'),
      }))
    } else {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

/**
 *
 */
function* handleAuthGoogleRequest() {
  const AwsAuth = yield getContext('AwsAuth')

  const google = yield federatedGoogleSignin()

  const userPayload = {
    id: google.user.id,
    name: google.user.name,
    email: google.user.email,
    authProvider: 'GOOGLE',
    token: google.token,
  }

  const GoogleCognitoIdentityCredentials = yield AwsAuth.federatedSignIn('google', {
    token: google.token,
    expires_at: google.expires_at,
  }, userPayload)

  AWS.config.region = Config.AWS_COGNITO_REGION
  AWS.config.credentials = GoogleCognitoIdentityCredentials

  return google
}

/**
 *
 */
function* authGoogleRequest(req) {
  try {
    const data = yield handleAuthGoogleRequest(req.payload)
    yield put(actions.authGoogleSuccess({
      message: errors.getMessagePayload(constants.AUTH_GOOGLE_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.message && error.message.includes('The user canceled the sign in request')) {
      yield put(actions.authGoogleFailure({
        message: errors.getMessagePayload(constants.AUTH_GOOGLE_FAILURE, 'CANCELED', error.message),
      }))
    } else {
      yield put(actions.authGoogleFailure({
        message: errors.getMessagePayload(constants.AUTH_GOOGLE_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

/**
 *
 */
function* mergeAppleCache(apple) {
  const cachedAppleUser = yield getAppleSigninPersist()
  const isSameCachedUser = path(['user', 'id'])(apple) === path(['user', 'id'])(cachedAppleUser)
  const isNewAppleUser = path(['user', 'email'])(apple)
  const isCachedAppleUser = path(['user', 'email'])(cachedAppleUser)

  if (isNewAppleUser) {
    yield saveAppleSigninPersist(apple)
    return apple
  } else if (isCachedAppleUser && isSameCachedUser) {
    return ({ ...apple, user: ({ ...apple.user, name: cachedAppleUser.user.name, email: cachedAppleUser.user.email }) })
  } else {
    return apple
  }
}

function* handleAuthAppleRequest() {
  const AwsAuth = yield getContext('AwsAuth')

  const apple = yield federatedAppleSignin()
  const cached = yield mergeAppleCache(apple)

  const userPayload = {
    id: apple.user.id,
    name: cached.user.name,
    email: cached.user.email,
    authProvider: 'APPLE',
    token: apple.token,
  }

  const AppleCognitoIdentityCredentials = yield AwsAuth.federatedSignIn('appleid.apple.com', {
    token: apple.token,
    expires_at: apple.expires_at,
  }, userPayload)

  AWS.config.region = Config.AWS_COGNITO_REGION
  AWS.config.credentials = AppleCognitoIdentityCredentials

  return apple
}

/**
 *
 */
function* authAppleRequest(req) {
  try {
    const data = yield handleAuthAppleRequest(req.payload)
    yield put(actions.authAppleSuccess({
      message: errors.getMessagePayload(constants.AUTH_APPLE_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.message && error.message.includes('The user canceled the sign in request')) {
      yield put(actions.authAppleFailure({
        message: errors.getMessagePayload(constants.AUTH_APPLE_FAILURE, 'CANCELED', error.message),
      }))
    } else {
      yield put(actions.authAppleFailure({
        message: errors.getMessagePayload(constants.AUTH_APPLE_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

/**
 *
 */
function* handleAuthSignoutRequest() {
  const AwsAuth = yield getContext('AwsAuth')

  try {
    yield federatedGoogleSignout()
  } catch (error) {
    // ignore
  }

  yield AwsAuth.signOut({ global: true })
}

function* authSignoutRequest(persistor, req) {
  try {
    const data = yield handleAuthSignoutRequest(req.payload)
    yield resetAuthUserPersist()
    yield persistor.purge()

    yield put(actions.authSignoutSuccess({
      message: errors.getMessagePayload(constants.AUTH_SIGNOUT_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    yield put(actions.authSignoutFailure({
      message: errors.getMessagePayload(constants.AUTH_SIGNOUT_FAILURE, 'GENERIC', error.message),
    }))
  }
}


/**
 *
 */
function* handleAuthForgotRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  return yield AwsAuth.forgotPassword(payload.username)
}

/**
 *
 */
function* authForgotRequest(req) {
  try {
    const data = yield handleAuthForgotRequest(req.payload)
    yield put(actions.authForgotSuccess({
      message: errors.getMessagePayload(constants.AUTH_FORGOT_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      yield put(actions.authForgotFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_FAILURE, 'USER_NOT_FOUND', error.message),
      }))
    } else {
      yield put(actions.authForgotFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

/**
 *
 */
function* handleAuthForgotConfirmRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  return yield AwsAuth.forgotPasswordSubmit(payload.username, payload.code, payload.password)
}

/**
 *
 */
function* authForgotConfirmRequest(req) {
  try {
    const data = yield handleAuthForgotConfirmRequest(req.payload)
    yield put(actions.authForgotConfirmSuccess({
      message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.code === 'InvalidPasswordException') {
      yield put(actions.authForgotConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'INVALID_PASSWORD', error.message),
      }))
    } else if (error.code === 'CodeMismatchException') {
      yield put(actions.authForgotConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'CODE_MISMATCH', error.message),
      }))
    } else {
      yield put(actions.authForgotConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

export default (persistor) => [
  takeEvery(constants.AUTH_SIGNIN_REQUEST, authSigninRequest),
  takeEvery(constants.AUTH_GOOGLE_REQUEST, authGoogleRequest),
  takeEvery(constants.AUTH_APPLE_REQUEST, authAppleRequest),
  takeEvery(constants.AUTH_SIGNOUT_REQUEST, authSignoutRequest, persistor),
  takeLatest(constants.AUTH_FORGOT_REQUEST, authForgotRequest),
  takeLatest(constants.AUTH_FORGOT_CONFIRM_REQUEST, authForgotConfirmRequest),
]