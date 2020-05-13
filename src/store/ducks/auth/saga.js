import * as AWS from 'aws-sdk/global'
import { put, getContext, takeEvery, takeLatest } from 'redux-saga/effects'
import path from 'ramda/src/path'
import {
  federatedGoogleSignin,
  federatedGoogleSignout,
} from 'services/AWS'
import * as actions from 'store/ducks/auth/actions'
import * as queries from 'store/ducks/auth/queries'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import Config from 'react-native-config'
import * as queryService from 'services/Query'

/**
 * AwsAuth.currentAuthenticatedUser method is used to check if a user is logged in.
 * It will throw an error if there is no user logged in.
 */
function* handleAuthCheckRequest() {
  const AwsAuth = yield getContext('AwsAuth')
  yield AwsAuth.currentCredentials()
  yield AwsAuth.currentAuthenticatedUser({
    bypassCache: false,
  })
}

function handleAuthCheckValidation(self) {
  const photoUrl = path(['photo', 'url'])(self)
  if (!photoUrl || photoUrl.includes('placeholder-photos')) {
    throw new Error('PROFILE_PHOTO_MISSING')
  }
}

/**
 * Check if user is logged in, not authenticated users will be redirected to Auth page.
 * Authenticated users with empty `self graphql query` return will be redirected to Onboard page,
 * meaning that user authenticated in Cognito pool but didn't create an entry in database on backend.
 */
function* authCheckRequest(req) {
  try {
    yield handleAuthCheckRequest(req.payload)

    const data = yield queryService.apiRequest(queries.self, req.payload)
    const selector = path(['data', 'self'])

    yield put(actions.authCheckReady({
      data: { userId: selector(data).userId },
    }))

    handleAuthCheckValidation(selector(data))

    yield put(actions.authCheckSuccess({
      message: errors.getMessagePayload(constants.AUTH_CHECK_SUCCESS, 'GENERIC'),
      data: selector(data),
      nextRoute: 'Root',
    }))
  } catch (error) {
    // yield AwsAuth.signOut({ global: true })
    if (path(['message'])(error) === 'PROFILE_PHOTO_MISSING') {
      yield put(actions.authCheckFailure({
        message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'PROFILE_PHOTO_MISSING', error.message),
        nextRoute: 'AuthPhoto',
      }))
    } else if (path(['errors', '0', 'path', '0'])(error) === 'self') {
      yield put(actions.authCheckFailure({
        message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'USER_JUST_CREATED', error.message),
        nextRoute: 'OnboardName',
      }))
    } else {
      yield put(actions.authCheckFailure({
        message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'GENERIC', error.message),
        nextRoute: 'AuthHome',
      }))
    }
  }
}

/**
 * Signin user. Currently supports email and password or phone number and password methods
 */
function* handleAuthSigninRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')

  yield AwsAuth.signIn(payload.username, payload.password)
}

function* authSigninRequest(req) {
  try {
    const data = yield handleAuthSigninRequest(req.payload)
    yield put(actions.authSigninSuccess({ data, nextRoute: 'Root' }))
  } catch (error) {
    if (error.code === 'UserNotConfirmedException') {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_CONFIRMED'),
        nextRoute: 'AuthSignup',
      }))
    } else if (error.code === 'UserNotFoundException') {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_FOUND'),
        nextRoute: 'AuthSignup',
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
    yield put(actions.authGoogleFailure({
      message: errors.getMessagePayload(constants.AUTH_GOOGLE_FAILURE, 'GENERIC', error.message),
    }))
  }
}

/**
 *
 */
function* handleAuthSignoutRequest() {
  const AwsAuth = yield getContext('AwsAuth')
  const AwsCache = yield getContext('AwsCache')
  const AwsCredentials = yield getContext('AwsCredentials')

  try {
    yield federatedGoogleSignout()
  } catch (error) {}

  yield AwsAuth.signOut({ global: true })
  yield AwsCredentials.clear()
  yield AwsCache.clear()
}

function* authSignoutRequest(persistor, req) {
  try {
    const data = yield handleAuthSignoutRequest(req.payload)
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
  takeEvery(constants.AUTH_CHECK_REQUEST, authCheckRequest),
  takeEvery(constants.AUTH_SIGNIN_REQUEST, authSigninRequest),
  takeEvery(constants.AUTH_GOOGLE_REQUEST, authGoogleRequest),
  takeEvery(constants.AUTH_SIGNOUT_REQUEST, authSignoutRequest, persistor),
  takeLatest(constants.AUTH_FORGOT_REQUEST, authForgotRequest),
  takeLatest(constants.AUTH_FORGOT_CONFIRM_REQUEST, authForgotConfirmRequest),
]