import * as AWS from 'aws-sdk/global'
import { put, getContext, takeEvery, takeLatest } from 'redux-saga/effects'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import { federatedGoogleSignin, federatedGoogleSignout, federatedAppleSignin } from 'services/AWS'
import {
  checkPhotoValidation,
  resetPhotoValidation,
  saveAppleSigninPersist,
  getAppleSigninPersist,
} from 'services/Auth'
import * as actions from 'store/ducks/auth/actions'
import * as queries from 'store/ducks/auth/queries'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as normalizer from 'normalizer/schemas'
import Config from 'react-native-config'
import * as queryService from 'services/Query'
import * as Logger from 'services/Logger'

/**
 * AwsAuth.currentAuthenticatedUser method is used to check if a user is logged in.
 * It will throw an error if there is no user logged in.
 */
function* handleAuthCheckRequest() {
  const AwsAuth = yield getContext('AwsAuth')
  const credentials = yield AwsAuth.currentCredentials()
  yield AwsAuth.currentAuthenticatedUser({
    bypassCache: false,
  })

  return credentials
}

function* handleAuthCheckValidation(self) {
  /**
   * Define user for sentry logger, authorized users will be re-defined at services/providers/App
   * But some users might not reach that step due to missing profile photo
   */
  Logger.setUser({
    id: path(['data', 'self', 'userId'])(self),
    username: path(['data', 'self', 'username'])(self),
    email: path(['data', 'self', 'email'])(self),
  })

  /**
   * Checks if user dismissed photo validation against asyncstorage skip validation flag
   * Failed photo verification info should never appear anymore once dismissed manually
   */
  if (yield checkPhotoValidation()) {
    return false
  }

  /**
   * Check if user has profile photo set
   * only photos that passed backend verification could be set as profile photos
   */
  const photoUrl = path(['data', 'self', 'photo', 'url'])(self)
  return !photoUrl || photoUrl.includes('placeholder-photos')
}

/**
 * Check if user is logged in, not authenticated users will be redirected to Auth page.
 * Authenticated users with empty `self graphql query` return will be redirected to Onboard page,
 * meaning that user authenticated in Cognito pool but didn't create an entry in database on backend.
 */
function* authCheckRequestData(req, api) {
  const dataSelector = path(['data', 'self'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* authCheckRequest(req) {
  try {
    const credentials = yield handleAuthCheckRequest(req.payload)
    const data = yield queryService.apiRequest(queries.self, req.payload)
    const authValidation = yield handleAuthCheckValidation(data)
    const nextRoute = authValidation ? 'AuthPhoto' : 'Root'
    const next = yield authCheckRequestData(req, data)
    yield put(actions.authCheckSuccess({ data: next.data, payload: next.payload, meta: credentials, nextRoute }))
  } catch (error) {
    if (pathOr('', ['message'])(error).includes('Network request failed')) {
      yield put(
        actions.authCheckFailure({
          message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'NETWORK', error.message),
          nextRoute: 'AuthHome',
        }),
      )
    } else if (pathOr('', ['message'])(error) === 'PROFILE_PHOTO_MISSING') {
      yield put(
        actions.authCheckFailure({
          message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'PROFILE_PHOTO_MISSING', error.message),
          nextRoute: 'AuthPhoto',
        }),
      )
    } else if (path(['errors', '0', 'path', '0'])(error) === 'self') {
      yield put(
        actions.authCheckFailure({
          message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'USER_JUST_CREATED', error.message),
          nextRoute: 'AuthCognito',
        }),
      )
    } else {
      yield put(
        actions.authCheckFailure({
          message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'GENERIC', error.message),
          nextRoute: 'AuthHome',
        }),
      )
    }
  }
}

/**
 * Signin user. Currently supports email and password or phone number and password methods
 */
function* handleAuthSigninRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  return yield AwsAuth.signIn(payload.username, payload.password)
}

function* authSigninRequest(req) {
  try {
    const data = yield handleAuthSigninRequest(req.payload)
    yield put(actions.authSigninSuccess({ data, nextRoute: 'Root' }))
  } catch (error) {
    if (error.code === 'UserNotConfirmedException') {
      yield put(
        actions.authSigninFailure({
          message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_CONFIRMED'),
        }),
      )
    } else if (error.code === 'UserNotFoundException') {
      yield put(
        actions.authSigninFailure({
          message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_FOUND'),
        }),
      )
    } else if (error.code === 'NotAuthorizedException') {
      yield put(
        actions.authSigninFailure({
          message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_AUTHORIZED'),
        }),
      )
    } else if (error.code === 'InvalidParameterException') {
      yield put(
        actions.authSigninFailure({
          message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'INVALID_PARAMETER'),
        }),
      )
    } else {
      yield put(
        actions.authSigninFailure({
          message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'GENERIC', error.message),
        }),
      )
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

  const GoogleCognitoIdentityCredentials = yield AwsAuth.federatedSignIn(
    'google',
    {
      token: google.token,
      expires_at: google.expires_at,
    },
    userPayload,
  )

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
    yield put(
      actions.authGoogleSuccess({
        message: errors.getMessagePayload(constants.AUTH_GOOGLE_SUCCESS, 'GENERIC'),
        data,
      }),
    )
  } catch (error) {
    if (error.message && error.message.includes('The user canceled the sign in request')) {
      yield put(
        actions.authGoogleFailure({
          message: errors.getMessagePayload(constants.AUTH_GOOGLE_FAILURE, 'CANCELED', error.message),
        }),
      )
    } else {
      yield put(
        actions.authGoogleFailure({
          message: errors.getMessagePayload(constants.AUTH_GOOGLE_FAILURE, 'GENERIC', error.message),
        }),
      )
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
    return { ...apple, user: { ...apple.user, name: cachedAppleUser.user.name, email: cachedAppleUser.user.email } }
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

  const AppleCognitoIdentityCredentials = yield AwsAuth.federatedSignIn(
    'appleid.apple.com',
    {
      token: apple.token,
      expires_at: apple.expires_at,
    },
    userPayload,
  )

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
    yield put(
      actions.authAppleSuccess({
        message: errors.getMessagePayload(constants.AUTH_APPLE_SUCCESS, 'GENERIC'),
        data,
      }),
    )
  } catch (error) {
    if (error.message && error.message.includes('The user canceled the sign in request')) {
      yield put(
        actions.authAppleFailure({
          message: errors.getMessagePayload(constants.AUTH_APPLE_FAILURE, 'CANCELED', error.message),
        }),
      )
    } else {
      yield put(
        actions.authAppleFailure({
          message: errors.getMessagePayload(constants.AUTH_APPLE_FAILURE, 'GENERIC', error.message),
        }),
      )
    }
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
    yield resetPhotoValidation()
    yield federatedGoogleSignout()
  } catch (error) {
    // ignore
  }

  yield AwsAuth.signOut({ global: true })
  yield AwsCredentials.clear()
  yield AwsCache.clear()
}

function* authSignoutRequest(persistor, req) {
  try {
    const data = yield handleAuthSignoutRequest(req.payload)
    yield persistor.purge()

    yield put(
      actions.authSignoutSuccess({
        message: errors.getMessagePayload(constants.AUTH_SIGNOUT_SUCCESS, 'GENERIC'),
        data,
      }),
    )
  } catch (error) {
    yield put(
      actions.authSignoutFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNOUT_FAILURE, 'GENERIC', error.message),
      }),
    )
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
    yield put(
      actions.authForgotSuccess({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_SUCCESS, 'GENERIC'),
        data,
      }),
    )
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      yield put(
        actions.authForgotFailure({
          message: errors.getMessagePayload(constants.AUTH_FORGOT_FAILURE, 'USER_NOT_FOUND', error.message),
        }),
      )
    } else {
      yield put(
        actions.authForgotFailure({
          message: errors.getMessagePayload(constants.AUTH_FORGOT_FAILURE, 'GENERIC', error.message),
        }),
      )
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
    yield put(
      actions.authForgotConfirmSuccess({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_SUCCESS, 'GENERIC'),
        data,
      }),
    )
  } catch (error) {
    if (error.code === 'InvalidPasswordException') {
      yield put(
        actions.authForgotConfirmFailure({
          message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'INVALID_PASSWORD', error.message),
        }),
      )
    } else if (error.code === 'CodeMismatchException') {
      yield put(
        actions.authForgotConfirmFailure({
          message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'CODE_MISMATCH', error.message),
        }),
      )
    } else {
      yield put(
        actions.authForgotConfirmFailure({
          message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'GENERIC', error.message),
        }),
      )
    }
  }
}

export default (persistor) => [
  takeEvery(constants.AUTH_CHECK_REQUEST, authCheckRequest),
  takeEvery(constants.AUTH_SIGNIN_REQUEST, authSigninRequest),
  takeEvery(constants.AUTH_GOOGLE_REQUEST, authGoogleRequest),
  takeEvery(constants.AUTH_APPLE_REQUEST, authAppleRequest),
  takeEvery(constants.AUTH_SIGNOUT_REQUEST, authSignoutRequest, persistor),
  takeLatest(constants.AUTH_FORGOT_REQUEST, authForgotRequest),
  takeLatest(constants.AUTH_FORGOT_CONFIRM_REQUEST, authForgotConfirmRequest),
]
