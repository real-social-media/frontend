import { call, put, takeEvery, getContext } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import * as queries from 'store/ducks/auth/queries'
import * as queryService from 'services/Query'
import {
  saveAuthUserPersist,
  getAuthUserPersist,
} from 'services/Auth'

import * as entitiesActions from 'store/ducks/entities/actions'
import * as normalizer from 'normalizer/schemas'
import * as Logger from 'services/Logger'
import path from 'ramda/src/path'
import Config from 'react-native-config'

const COGNITO_PROVIDER = `cognito-idp.${Config.AWS_COGNITO_REGION}.amazonaws.com/${Config.AWS_COGNITO_USER_POOL_ID}`

class MissingUserAttributeError extends Error {
  constructor(...args) {
    super(...args)
    this.code = 'MISSING_USER_ATTRIBUTEE_ERROR'
  }
}

class GuestUserError extends Error {
  constructor(...args) {
    super(...args)
    this.code = 'GUEST_USER_ERROR'
  }
}

export function* handleAnonymousSignin(anonymousUser) {
  const AwsAuth = yield getContext('AwsAuth')

  /**
   *
   */
  const cognito = {
    id: null,
    name: null,
    email: null,
    authProvider: 'COGNITO',
    token: anonymousUser.IdToken,
    expires_at: new Date().getTime() + (50 * 60 * 1000),
  }
  const credentials = {
    token: cognito.token,
    expires_at: cognito.expires_at,
  }
  
  yield AwsAuth.federatedSignIn(COGNITO_PROVIDER, credentials, {})
}

/**
 * Sentry logger
 */
export function* handleAuthLogger(api) {
  const dataSelector = path(['data', 'self'])

  const data = dataSelector(api)
  const authenticated = {
    id: data.userId,
    username: data.username,
    email: data.email,
  }
  yield call([Logger, 'setUser'], authenticated)
}

/**
 * Spread user data through normalized reducers
 */
export function* handleAuthDataRequestData(req, api) {
  const dataSelector = path(['data', 'self'])

  const data = dataSelector(api)
  const meta = req.meta || {}
  const payload = req.payload || {}

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

/**
 * Get user data from api and cache into asyncstorage
 */
function* onlineData() {
  const response = yield queryService.apiRequest(queries.self)
  yield saveAuthUserPersist(response)

  if (!path(['data', 'self', 'userId'])(response)) {
    throw new MissingUserAttributeError()
  }

  return response
}

/**
 *
 */
function* cachedData() {
  const response = yield getAuthUserPersist()

  if (!path(['data', 'self', 'userId'])(response)) {
    throw new MissingUserAttributeError()
  }

  // temporary check to only return active user data
  if (path(['data', 'self', 'userStatus'])(response) !== 'ACTIVE') {
    throw new GuestUserError()
  }

  return response
}

/**
 * Handled anonymous user creation, throws an error if user already exists
 */
function* createAnonymousUser() {
  try {
    const request = yield queryService.apiRequest(queries.createAnonymousUser)
    yield call(handleAnonymousSignin, request.data.createAnonymousUser)
  } catch (error) {
    // ignore
  }
}

function* handleAuthDataRequest(payload = {}) {
  if (payload.allowAnonymous) {
    yield createAnonymousUser()
  }

  const data = yield (function* () {
    try {
      return yield call(cachedData)
    } catch (error) {
      return yield call(onlineData)
    }
  })()

  const next = yield call(handleAuthDataRequestData, { meta: { type: 'ONLINE' } }, data)
  yield handleAuthLogger(data)
  return next
}

/**
 * Conditional user data fetching with online/offline support
 */
function* authDataRequest(req) {
  try {
    const { data, meta } = yield handleAuthDataRequest(req.payload)
    yield put(actions.authDataSuccess({
      message: errors.getMessagePayload(constants.AUTH_DATA_SUCCESS, 'GENERIC'),
      data,
      meta,
    }))
  } catch (error) {
    const primaryClientError = queryService.getPrimaryClientError(error)
      
    if (primaryClientError && primaryClientError.message.includes('User does not exist')) {
      yield put(actions.authDataFailure({
        message: errors.getMessagePayload(constants.AUTH_DATA_FAILURE, 'USER_DOES_NOT_EXIST', error.message),
      }))
    } else {
      yield put(actions.authDataFailure({
        message: errors.getMessagePayload(constants.AUTH_DATA_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

export default () => [
  takeEvery(constants.AUTH_DATA_REQUEST, authDataRequest),
]