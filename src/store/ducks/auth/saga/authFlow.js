import { put, take, race, takeEvery, getContext } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import pathOr from 'ramda/src/pathOr'
import * as navigationActions from 'navigation/actions'

function hasAuthenticatedCondition({ dataSuccess }) {
  const authenticated = pathOr('', ['payload', 'data'])(dataSuccess).includes('us-east-1')

  return (authenticated)
}

function* handleAuthFlowRequest(payload = {}) {
  /**
   * Fetching cognito credentials/tokens
   */
  yield put(actions.authTokenRequest({ allowAnonymous: payload.allowAnonymous }))
  const { tokenSuccess, tokenFailure } = yield race({
    tokenSuccess: take(constants.AUTH_TOKEN_SUCCESS),
    tokenFailure: take(constants.AUTH_TOKEN_FAILURE),
  })

  if (tokenFailure) {
    throw new Error('Failed to obtain token')
  }

  /**
   * Fetching user data from api
   */
  yield put(actions.authDataRequest({ allowAnonymous: payload.allowAnonymous }))
  const { dataSuccess, dataFailure } = yield race({
    dataSuccess: take(constants.AUTH_DATA_SUCCESS),
    dataFailure: take(constants.AUTH_DATA_FAILURE),
  })

  if (dataFailure) {
    throw new Error('Failed to fetch data')
  }

  return {
    meta: {
      authenticated: hasAuthenticatedCondition({ dataSuccess }),
    },
    data: {
      authToken: tokenSuccess.payload,
      authData: dataSuccess.payload,
    },
  }
}

/**
 * Applications main entry point, responsible for:
 * - Fetching assets such as language and translation
 * - Fetching credentials and tokens
 * - Fetching user data
 * - Fetching initial data such as feed/cards/trending
 * - Initializing subscriptions
 */
function* authFlowRequest(req) {
  try {
    const { data, meta } = yield handleAuthFlowRequest(req.payload)
    yield put(actions.authFlowSuccess({
      message: errors.getMessagePayload(constants.AUTH_FLOW_SUCCESS, 'GENERIC'),
      data,
      meta,
    }))
  } catch (error) {
    yield put(actions.authFlowFailure({
      message: errors.getMessagePayload(constants.AUTH_FLOW_FAILURE, 'GENERIC', error.message),
      meta: {
        authenticated: false,
      },
    }))
  }
}

/**
 * Fetching initial data such as feed/cards/trending
 */
function* authFlowSuccess() {  
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  yield put(actions.authPrefetchRequest())

  navigationActions.navigateSearch(ReactNavigationRef.current)
}

export default () => [
  takeEvery(constants.AUTH_FLOW_REQUEST, authFlowRequest),
  takeEvery(constants.AUTH_FLOW_SUCCESS, authFlowSuccess),
]