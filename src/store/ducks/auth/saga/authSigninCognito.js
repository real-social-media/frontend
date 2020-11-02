import { put, call, take, race, getContext, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import * as navigationActions from 'navigation/actions'

/**
 * Authenticate using cognito into user pool
 */
function* cognitoAuthentication(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  yield AwsAuth.signIn(payload.username, payload.password)
}

/**
 * Signin user. Currently supports email and password or phone number and password methods
 */
function* handleAuthSigninRequest(payload) {
  yield call(cognitoAuthentication, payload)

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

function* authSigninCognitoRequest(req) {
  try {
    const data = yield handleAuthSigninRequest(req.payload)
    yield put(actions.authSigninCognitoSuccess({ data }))
  } catch (error) {
    if (error.code === 'UserNotConfirmedException') {
      yield put(actions.authSigninCognitoFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_COGNITO_FAILURE, 'USER_NOT_CONFIRMED'),
      }))
    } else if (error.code === 'UserNotFoundException') {
      yield put(actions.authSigninCognitoFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_COGNITO_FAILURE, 'USER_NOT_FOUND'),
      }))
    } else if (error.code === 'NotAuthorizedException') {
      yield put(actions.authSigninCognitoFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_COGNITO_FAILURE, 'USER_NOT_AUTHORIZED'),
      }))
    } else if (error.code === 'InvalidParameterException') {
      yield put(actions.authSigninCognitoFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_COGNITO_FAILURE, 'INVALID_PARAMETER'),
      }))
    } else {
      yield put(actions.authSigninCognitoFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_COGNITO_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

function* authSigninCognitoSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateApp(ReactNavigationRef.current)
}

export default () => [
  takeEvery(constants.AUTH_SIGNIN_COGNITO_REQUEST, authSigninCognitoRequest),
  takeEvery(constants.AUTH_SIGNIN_COGNITO_SUCCESS, authSigninCognitoSuccess),
]