import { take, race, put, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'

/**
 * Fetching cognito credentials/tokens
 */
function* handleAuthSigninAnonymousRequest() {
  yield put(actions.authFlowRequest({ allowAnonymous: true }))
  const { flowSuccess, flowFailure } = yield race({
    flowSuccess: take(constants.AUTH_FLOW_SUCCESS),
    flowFailure: take(constants.AUTH_FLOW_FAILURE),
  })

  if (flowFailure) {
    throw new Error('Failed to obtain flow')
  }

  return flowSuccess
}

/**
 *
 */
function* authSigninAnonymousRequest(req) {
  try {
    const data = yield handleAuthSigninAnonymousRequest(req.payload)
    yield put(actions.authSigninAnonymousSuccess({
      message: errors.getMessagePayload(constants.AUTH_SIGNIN_ANONYMOUS_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.message && error.message.includes('The user canceled the sign in request')) {
      yield put(actions.authSigninAnonymousFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_ANONYMOUS_FAILURE, 'CANCELED', error.message),
      }))
    } else {
      yield put(actions.authSigninAnonymousFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_ANONYMOUS_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

export default () => [
  takeEvery(constants.AUTH_SIGNIN_ANONYMOUS_REQUEST, authSigninAnonymousRequest),
]