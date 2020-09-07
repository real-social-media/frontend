import { call, put, getContext, takeEvery } from 'redux-saga/effects'
import path from 'ramda/src/path'
import {
  checkPhotoValidation,
  getAuthUserPersist,
  saveAuthUserPersist,
} from 'services/Auth'
import * as actions from 'store/ducks/auth/actions'
import * as queries from 'store/ducks/auth/queries'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as normalizer from 'normalizer/schemas'
import * as queryService from 'services/Query'
import * as Logger from 'services/Logger'
import { isAvatarEmpty } from 'components/Settings/helpers' 

export function getPrimaryGraphqlError(error) {
  const firstError = path(['errors', '0'])(error)

  if (!firstError || firstError.name !== 'GraphQLError') {
    return false
  }

  return firstError
}

export function getPrimaryClientError(error) {
  const firstError = path(['errors', '0'])(error)

  if (!firstError || firstError.errorType !== 'ClientError') {
    return false
  }

  return firstError
}

/**
 * AwsAuth.currentAuthenticatedUser method is used to check if a user is logged in.
 * It will throw an error if there is no user logged in.
 */
export function* getCognitoCredentials() {
  const AwsAuth = yield getContext('AwsAuth')

  try {
    yield AwsAuth.currentAuthenticatedUser(),
    yield AwsAuth.currentCredentials()
    yield AwsAuth.currentUserPoolUser()
  } catch (error) {
    if (typeof error === 'string' && error.includes('Network request failed')) {
      return 
    }

    if (typeof error === 'string' && error.includes('No current user')) {
      return
    }

    if (typeof error === 'string' && error.includes('not authenticated')) {
      throw error
    }

    throw error
  }

}

export function* handleAuthCheckValidation(self) {
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
  return isAvatarEmpty(path(['data', 'self'])(self))
}

export function* authCheckRequestData(req, api) {
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

/**
 *
 */
export function* handleAuthCheckRequest() {
  const cachedResponse = yield getAuthUserPersist()

  try {
    const response = yield queryService.apiRequest(queries.self)
    yield saveAuthUserPersist(response)
    return response
  } catch (error) {
    const primaryGraphqlError = getPrimaryGraphqlError(error)

    if (!primaryGraphqlError || !primaryGraphqlError.message === 'Network Error') {
      throw error
    }

    if (!cachedResponse || !cachedResponse.data.self.userId) {
      throw error
    }

    return cachedResponse
  }
}

export function getAuthCheckNextRouteSuccess(validation) {
  return validation ? 'AuthPhoto' : 'Root'
}

/**
 * Check if user is logged in, not authenticated users will be redirected to Auth page.
 * Authenticated users with empty `self graphql query` return will be redirected to Onboard page,
 * meaning that user authenticated in Cognito pool but didn't create an entry in database on backend.
 *
 * Auth flow:
 * - Fetch aws credentials (incl. expired token refresh)
 * - Fetch user data with graphql api
 * - Check if user has profile photo
 */
export function* authCheckRequest(req) {
  try {
    const credentials = yield call(getCognitoCredentials)
    const data = yield call(handleAuthCheckRequest, credentials)
    const validation = yield call(handleAuthCheckValidation, data)
    const next = yield call(authCheckRequestData, req, data)
    const nextRoute = yield call(getAuthCheckNextRouteSuccess, validation)

    yield put(actions.authCheckSuccess({ data: next.data, payload: next.payload, nextRoute }))
  } catch (error) {
    const primaryGraphqlError = yield call(getPrimaryGraphqlError, error)
    const primaryClientError = yield call(getPrimaryClientError, error)

    if (primaryGraphqlError && primaryGraphqlError.message === 'Network Error') {
      yield put(actions.authCheckFailure({
        message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'NETWORK', error.message),
        nextRoute: null,
      }))
    } else if (primaryClientError && primaryClientError.message === 'User does not exist') {
      yield put(actions.authCheckFailure({
        message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'USER_JUST_CREATED', error.message),
        nextRoute: 'AuthCognito',
      }))
    } else {
      yield put(actions.authCheckFailure({
        message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'GENERIC', error.message),
        nextRoute: 'AuthHome',
      }))
    }
  }
}

export default () => [
  takeEvery(constants.AUTH_CHECK_REQUEST, authCheckRequest),
]