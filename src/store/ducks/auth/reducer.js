import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/auth/constants'

export const initialState = {
  /**
   *
   */
  authGetUser: {
    data: {},
    status: 'idle',
  },

  /**
   *
   */
  authFlow: {
    status: 'idle',
  },

  /**
   *
   */
  authSigninAnonymous: {
    status: 'idle',
  },
  authSigninCognito: {
    status: 'idle',
    payload: {},
  },
  authSigninGoogle: {
    status: 'idle',
  },
  authSigninApple: {
    status: 'idle',
  },

  /**
   *
   */
  authForgot: {
    status: 'idle',
    payload: {},
  },
  authForgotConfirm: {
    status: 'idle',
  },
}



/**
 *
 */
const authFlowRequest = (state) => update(state, {
  authFlow: {
    status: { $set: 'loading' },
  },
})

const authFlowSuccess = (state) => update(state, {
  authFlow: {
    status: { $set: 'success' },
  },
})

const authFlowFailure = (state) => update(state, {
  authFlow: {
    status: { $set: 'failure' },
  },
})

const authFlowIdle = (state) => update(state, {
  authFlow: { $set: initialState.authFlow },
})

/**
 *
 */
const authSigninCognitoRequest = (state, action) => update(state, {
  authSigninCognito: {
    status: { $set: 'loading' },
    payload: { $merge: action.payload },
  },
})

const authSigninCognitoSuccess = (state) => update(state, {
  authSigninCognito: {
    status: { $set: 'success' },
  },
})

const authSigninCognitoFailure = (state) => update(state, {
  authSigninCognito: {
    status: { $set: 'failure' },
  },
})

const authSigninCognitoIdle = (state) => update(state, {
  authSigninCognito: { $set: initialState.authSigninCognito },
})

/**
 *
 */
const authSigninGoogleRequest = (state) => update(state, {
  authSigninGoogle: {
    status: { $set: 'loading' },
  },
})

const authSigninGoogleSuccess = (state) => update(state, {
  authSigninGoogle: {
    status: { $set: 'success' },
  },
})

const authSigninGoogleFailure = (state) => update(state, {
  authSigninGoogle: {
    status: { $set: 'failure' },
  },
})

const authSigninGoogleIdle = (state) => update(state, {
  authSigninGoogle: {
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authSigninAppleRequest = (state) => update(state, {
  authSigninApple: {
    status: { $set: 'loading' },
  },
})

const authSigninAppleSuccess = (state) => update(state, {
  authSigninApple: {
    status: { $set: 'success' },
  },
})

const authSigninAppleFailure = (state) => update(state, {
  authSigninApple: {
    status: { $set: 'failure' },
  },
})

const authSigninAppleIdle = (state) => update(state, {
  authSigninApple: {
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authSigninAnonymousRequest = (state) => update(state, {
  authSigninAnonymous: {
    status: { $set: 'loading' },
  },
})

const authSigninAnonymousSuccess = (state) => update(state, {
  authSigninAnonymous: {
    status: { $set: 'success' },
  },
})

const authSigninAnonymousFailure = (state) => update(state, {
  authSigninAnonymous: {
    status: { $set: 'failure' },
  },
})

const authSigninAnonymousIdle = (state) => update(state, {
  authSigninAnonymous: {
    $set: initialState.authSigninAnonymous,
  },
})

/**
 *
 */
const authForgotRequest = (state, action) => update(state, {
  authForgot: {
    status: { $set: 'loading' },
    payload: { $merge: action.payload },
  },
})

const authForgotSuccess = (state) => update(state, {
  authForgot: {
    status: { $set: 'success' },
  },
})

const authForgotFailure = (state) => update(state, {
  authForgot: {
    status: { $set: 'failure' },
  },
})

const authForgotIdle = (state) => update(state, {
  authForgot: {
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authForgotConfirmRequest = (state) => update(state, {
  authForgotConfirm: {
    status: { $set: 'loading' },
  },
})

const authForgotConfirmSuccess = (state) => update(state, {
  authForgotConfirm: {
    status: { $set: 'success' },
  },
})

const authForgotConfirmFailure = (state) => update(state, {
  authForgotConfirm: {
    status: { $set: 'failure' },
  },
})

const authForgotConfirmIdle = (state) => update(state, {
  authForgotConfirm: {
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authGetUserRequest = (state) => update(state, {
  authGetUser: {
    status: { $set: 'loading' },
  },
})

const authGetUserSuccess = (state, action) => update(state, {
  authGetUser: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const authGetUserFailure = (state) => update(state, {
  authGetUser: {
    status: { $set: 'failure' },
  },
})

const authGetUserIdle = (state) => update(state, {
  authGetUser: {
    $set: initialState.authGetUser,
  },
})

export default handleActions({
  [constants.AUTH_FLOW_REQUEST]: authFlowRequest,
  [constants.AUTH_FLOW_SUCCESS]: authFlowSuccess,
  [constants.AUTH_FLOW_FAILURE]: authFlowFailure,
  [constants.AUTH_FLOW_IDLE]: authFlowIdle,

  [constants.AUTH_SIGNIN_COGNITO_REQUEST]: authSigninCognitoRequest,
  [constants.AUTH_SIGNIN_COGNITO_SUCCESS]: authSigninCognitoSuccess,
  [constants.AUTH_SIGNIN_COGNITO_FAILURE]: authSigninCognitoFailure,
  [constants.AUTH_SIGNIN_COGNITO_IDLE]: authSigninCognitoIdle,

  [constants.AUTH_SIGNIN_GOOGLE_REQUEST]: authSigninGoogleRequest,
  [constants.AUTH_SIGNIN_GOOGLE_SUCCESS]: authSigninGoogleSuccess,
  [constants.AUTH_SIGNIN_GOOGLE_FAILURE]: authSigninGoogleFailure,
  [constants.AUTH_SIGNIN_GOOGLE_IDLE]: authSigninGoogleIdle,

  [constants.AUTH_SIGNIN_APPLE_REQUEST]: authSigninAppleRequest,
  [constants.AUTH_SIGNIN_APPLE_SUCCESS]: authSigninAppleSuccess,
  [constants.AUTH_SIGNIN_APPLE_FAILURE]: authSigninAppleFailure,
  [constants.AUTH_SIGNIN_APPLE_IDLE]: authSigninAppleIdle,

  [constants.AUTH_SIGNIN_ANONYMOUS_REQUEST]: authSigninAnonymousRequest,
  [constants.AUTH_SIGNIN_ANONYMOUS_SUCCESS]: authSigninAnonymousSuccess,
  [constants.AUTH_SIGNIN_ANONYMOUS_FAILURE]: authSigninAnonymousFailure,
  [constants.AUTH_SIGNIN_ANONYMOUS_IDLE]: authSigninAnonymousIdle,

  [constants.AUTH_FORGOT_REQUEST]: authForgotRequest,
  [constants.AUTH_FORGOT_SUCCESS]: authForgotSuccess,
  [constants.AUTH_FORGOT_FAILURE]: authForgotFailure,
  [constants.AUTH_FORGOT_IDLE]: authForgotIdle,

  [constants.AUTH_FORGOT_CONFIRM_REQUEST]: authForgotConfirmRequest,
  [constants.AUTH_FORGOT_CONFIRM_SUCCESS]: authForgotConfirmSuccess,
  [constants.AUTH_FORGOT_CONFIRM_FAILURE]: authForgotConfirmFailure,
  [constants.AUTH_FORGOT_CONFIRM_IDLE]: authForgotConfirmIdle,

  [constants.AUTH_GET_USER_REQUEST]: authGetUserRequest,
  [constants.AUTH_GET_USER_SUCCESS]: authGetUserSuccess,
  [constants.AUTH_GET_USER_FAILURE]: authGetUserFailure,
  [constants.AUTH_GET_USER_IDLE]: authGetUserIdle,
}, initialState)
