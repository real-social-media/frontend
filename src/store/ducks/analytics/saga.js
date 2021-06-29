import { call, takeEvery } from 'redux-saga/effects'
import * as Analytics from 'services/Analytics'
import * as authConstants from 'store/ducks/auth/constants'
import * as signupConstants from 'store/ducks/signup/constants'
import * as Logger from 'services/Logger'

const ACTIONS = [
  authConstants.AUTH_FORGOT_SUCCESS,
  authConstants.AUTH_FORGOT_CONFIRM_SUCCESS,
  signupConstants.SIGNUP_CONFIRM_REQUEST,
  signupConstants.SIGNUP_CONFIRM_SUCCESS,
  signupConstants.SIGNUP_CREATE_REQUEST,
  signupConstants.SIGNUP_CREATE_SUCCESS,
  signupConstants.SIGNUP_PASSWORD_REQUEST,
  signupConstants.SIGNUP_PASSWORD_SUCCESS,
  signupConstants.SIGNUP_USERNAME_REQUEST,
  signupConstants.SIGNUP_USERNAME_SUCCESS,
]

function* facebookLogger(action) {
  try {
    yield call([Analytics, 'logEvent'], action.type)
  } catch (error) {
    Logger.captureException(error)
  }
}

export default () => [takeEvery(ACTIONS, facebookLogger)]
