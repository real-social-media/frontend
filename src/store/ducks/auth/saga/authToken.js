import { call, put, race, take, getContext, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'

class MissingCognitoTokenError extends Error {
  constructor(...args) {
    super(...args)
    this.code = 'MISSING_COGNITO_TOKEN_ERROR'
  }
}

class UnauthorizedTokenError extends Error {
  constructor(...args) {
    super(...args)
    this.code = 'UNAUTHORIZED_TOKEN_ERROR'
  }
}

/**
 * Fetch identity pool token
 * Validate cache support with online/offline handlers ?!
 * Cached in asyncstorage under: @MemoryStorage:CognitoIdentityId-${AWS_COGNITO_IDENTITY_POOL_ID}
 */
function* fetchCognitoCredentials() {
  const AwsAuth = yield getContext('AwsAuth')

  /**
   * Fetch latest token from cognito api, bypass cache from asyncstorage
   */
  const credentials = yield call([AwsAuth, 'currentUserCredentials'], { bypassCache: true })

  /**
   * Cognito may throw an error if user is unathorized to stale token coming from asyncStorage
   */
  if (credentials.message && credentials.message.includes('Access to Identity') && credentials.message.includes('is forbidden')) {
    yield put(actions.authResetRequest({}))
    yield race({
      resetSuccess: take(constants.AUTH_RESET_SUCCESS),
      resetFailure: take(constants.AUTH_RESET_FAILURE),
    })

    return yield call([AwsAuth, 'currentUserCredentials'], { bypassCache: true })
  }

  return credentials
}

/**
 * Authenticated users federation info from identity pool
 * Cached in asyncstorage under: @MemoryStorage:aws-amplify-federatedInfo
 */
function* fetchCognitoUser() {
  const AwsAuth = yield getContext('AwsAuth')
  return yield call([AwsAuth, 'currentAuthenticatedUser'])
}

/**
 * Fetch authenticated tokens, fail if unauthenticated
 */
function* authenticatedToken() {
  const credentials = yield call(fetchCognitoCredentials)
  yield call(fetchCognitoUser)

  if (!credentials.sessionToken) {
    throw new MissingCognitoTokenError()
  }

  if (!credentials.authenticated) {
    throw new UnauthorizedTokenError()
  }

  return credentials
}

/**
 * Fetch unauthenticated tokens
 */
function* unauthenticatedToken() {
  const credentials = yield call(fetchCognitoCredentials)

  if (!credentials.sessionToken) {
    throw new MissingCognitoTokenError()
  }

  return credentials
}

/**
 * Fetch guest tokens
 */
function* guestToken() {
  const credentials = yield call(fetchCognitoCredentials)

  if (!credentials.sessionToken) {
    throw new MissingCognitoTokenError()
  }

  return {
    ...credentials,
    authenticated: true,
  }
}

function* handleAuthTokenRequest(payload = {}) {
  if (payload.allowAnonymous) {
    const credentials = yield call(guestToken)
    return { data: credentials, meta: { type: 'COGNITO_GUEST' } }
  }

  try {
    const credentials = yield call(authenticatedToken)
    return { data: credentials, meta: { type: 'COGNITO_AUTHENTICATED' } }
  } catch (error) {
    const credentials = yield call(unauthenticatedToken)
    return { data: credentials, meta: { type: 'COGNITO_UNAUTHENTICATED' } }
  }
}

/**
 * Fetch, Refresh and Validate Cognito tokens
 */
function* authTokenRequest(req) {
  try {
    const { data, meta } = yield handleAuthTokenRequest(req.payload)
    yield put(actions.authTokenSuccess({
      message: errors.getMessagePayload(constants.AUTH_FLOW_SUCCESS, 'GENERIC'),
      data,
      meta,
    }))
  } catch (error) {
    yield put(actions.authTokenFailure({
      message: errors.getMessagePayload(constants.AUTH_FLOW_FAILURE, 'GENERIC', error.message),
      data: {},
      meta: { type: 'COGNITO_UNAUTHENTICATED' },
    }))
  }
}

export default () => [
  takeEvery(constants.AUTH_TOKEN_REQUEST, authTokenRequest),
]