import { put, call, take, race, takeEvery, getContext } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as queries from 'store/ducks/signup/queries'
import * as errors from 'store/ducks/signup/errors'
import * as authActions from 'store/ducks/auth/actions'
import * as authConstants from 'store/ducks/auth/constants'
import * as queryService from 'services/Query'
import * as navigationActions from 'navigation/actions'
import { logEvent } from 'services/Analytics'

/**
 *
 */
function* queryBasedOnSignupType(payload) {
  if (payload.usernameType === 'email') {
    return yield queryService.apiRequest(queries.startChangeUserEmail, { email: payload.email })
  }
  if (payload.usernameType === 'phone') {
    return yield queryService.apiRequest(queries.startChangeUserPhoneNumber, { phoneNumber: payload.phone })
  }
  return {}
}

function* handleSignuptCreateRequest(payload) {
  /**
   * Fetching cognito credentials/tokens
   */
  yield put(authActions.authTokenRequest({ allowAnonymous: true }))
  const { tokenFailure } = yield race({
    tokenSuccess: take(authConstants.AUTH_TOKEN_SUCCESS),
    tokenFailure: take(authConstants.AUTH_TOKEN_FAILURE),
  })

  if (tokenFailure) {
    throw new Error('Failed to obtain token')
  }

  /**
   * Fetching user data from api
   */
  yield put(authActions.authDataRequest({ allowAnonymous: true }))
  const { dataFailure } = yield race({
    dataSuccess: take(authConstants.AUTH_DATA_SUCCESS),
    dataFailure: take(authConstants.AUTH_DATA_FAILURE),
  })

  if (dataFailure) {
    throw new Error('Failed to fetch data')
  }

  yield call(queryBasedOnSignupType, payload)
}

/**
 *
 */
function* signupCreateRequest(req) {
  try {
    yield handleSignuptCreateRequest(req.payload)

    yield put(actions.signupCreateSuccess({
      message: errors.getMessagePayload(constants.SIGNUP_CREATE_SUCCESS, 'GENERIC'),
      payload: req.payload,
      data: { cognitoDelivery: req.payload.usernameType },
    }))
  } catch (error) {
    if (error.message === 'USER_CONFIRMATION_DELIVERY') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'USER_CONFIRMATION_DELIVERY', error.message),
        payload: req.payload,
      }))
    } else if (error.code === 'UsernameExistsException') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'USER_EXISTS', error.message),
        payload: req.payload,
      }))
    } else if (error.code === 'InvalidPasswordException') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'INVALID_PASSWORD', error.message),
        payload: req.payload,
      }))
    } else if (error.code === 'InvalidParameterException') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'INVALID_PARAMETER', error.message),
        payload: req.payload,
      }))
    } else {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'GENERIC', error.message),
        payload: req.payload,
      }))
    }
  }
}

function* signupCreateSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateAuthEmailConfirm(ReactNavigationRef.current)
  logEvent('SIGNUP_CREATE_SUCCESS')
}

export default () => [
  takeEvery(constants.SIGNUP_CREATE_REQUEST, signupCreateRequest),
  takeEvery(constants.SIGNUP_CREATE_SUCCESS, signupCreateSuccess),
]