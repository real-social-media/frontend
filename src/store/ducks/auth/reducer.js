import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/auth/constants'

export const initialState = {
  /**
   *
   */
  user: {},

  /**
   *
   */
  authFlow: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  authToken: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  authData: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },
  authPrefetch: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
    meta: {},
  },

  /**
   *
   */
  authSigninAnonymous: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authSigninCognito: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authSigninGoogle: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authSigninApple: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authSignout: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authForgot: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authForgotConfirm: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
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

const authFlowSuccess = (state, action) => update(state, {
  authFlow: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    error: { $set: initialState.authFlow.error },
    payload: {},
    meta: { $set: action.payload.meta },
  },
})

const authFlowFailure = (state, action) => update(state, {
  authFlow: {
    data: { $set: initialState.authFlow.data },
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
    payload: {},
    meta: { $set: action.payload.meta },
  },
})

const authFlowIdle = (state) => update(state, {
  authFlow: { $set: initialState.authFlow },
})

/**
 *
 */
const authDataRequest = (state) => update(state, {
  authData: {
    status: { $set: 'loading' },
  },
})

const authDataSuccess = (state, action) => update(state, {
  user: {
    $set: action.payload.data,
  },
  authData: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    error: { $set: initialState.authData.error },
    payload: {},
    meta: { $set: action.payload.meta },
  },
})

const authDataFailure = (state, action) => update(state, {
  authData: {
    data: { $set: initialState.authData.data },
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
    payload: {},
    meta: { $set: action.payload.meta },
  },
})

const authDataIdle = (state) => update(state, {
  authData: { $set: initialState.authData },
})

/**
 *
 */
const authTokenRequest = (state) => update(state, {
  authToken: {
    status: { $set: 'loading' },
  },
})

const authTokenSuccess = (state, action) => update(state, {
  authToken: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    error: { $set: initialState.authToken.error },
    payload: {},
    meta: { $set: action.payload.meta },
  },
})

const authTokenFailure = (state, action) => update(state, {
  authToken: {
    data: { $set: initialState.authToken.data },
    status: { $set: 'failure' },
    error: { $set: action.payload.message },
    payload: {},
    meta: { $set: action.payload.meta },
  },
})

const authTokenIdle = (state) => update(state, {
  authToken: { $set: initialState.authToken },
})

/**
 *
 */
const authSigninCognitoRequest = (state, action) => update(state, {
  authSigninCognito: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
    error: { $set: initialState.authSigninCognito.error },
  },
})

const authSigninCognitoSuccess = (state, action) => update(state, {
  authSigninCognito: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    nextRoute: { $set: action.payload.nextRoute },
  },
})

const authSigninCognitoFailure = (state, action) => update(state, {
  authSigninCognito: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
    nextRoute: { $set: action.payload.nextRoute },
  },
})

const authSigninCognitoIdle = (state) => update(state, {
  authSigninCognito: {
    data: { $set: initialState.authSigninCognito.data },
    status: { $set: 'idle' },
    error: { $set: initialState.authSigninCognito.error },
    message: { $set: initialState.authSigninCognito.message },
  },
})

/**
 *
 */
const authSigninGoogleRequest = (state) => update(state, {
  authSigninGoogle: {
    status: { $set: 'loading' },
  },
})

const authSigninGoogleSuccess = (state, action) => update(state, {
  authSigninGoogle: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const authSigninGoogleFailure = (state, action) => update(state, {
  authSigninGoogle: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
  },
})

const authSigninGoogleIdle = (state) => update(state, {
  authSigninGoogle: {
    data: { $set: initialState.authSigninGoogle.data },
    status: { $set: 'idle' },
    error: { $set: initialState.authSigninGoogle.error },
    message: { $set: initialState.authSigninGoogle.message },
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

const authSigninAppleSuccess = (state, action) => update(state, {
  authSigninApple: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const authSigninAppleFailure = (state, action) => update(state, {
  authSigninApple: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
  },
})

const authSigninAppleIdle = (state) => update(state, {
  authSigninApple: {
    data: { $set: initialState.authSigninApple.data },
    status: { $set: 'idle' },
    error: { $set: initialState.authSigninApple.error },
    message: { $set: initialState.authSigninApple.message },
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

const authSigninAnonymousSuccess = (state, action) => update(state, {
  authSigninAnonymous: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const authSigninAnonymousFailure = (state, action) => update(state, {
  authSigninAnonymous: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
  },
})

const authSigninAnonymousIdle = (state) => update(state, {
  authSigninAnonymous: {
    data: { $set: initialState.authSigninAnonymous.data },
    status: { $set: 'idle' },
    error: { $set: initialState.authSigninAnonymous.error },
    message: { $set: initialState.authSigninAnonymous.message },
  },
})


/**
 *
 */
const authSignoutRequest = (state) => update(state, {
  authSignout: {
    status: { $set: 'loading' },
  },
})

const authSignoutSuccess = () => update(initialState, {
  authFlow: { $set: initialState.authFlow },
  authData: { $set: initialState.authData },
})

const authSignoutFailure = (state, action) => update(state, {
  authSignout: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
  },
})

const authSignoutIdle = (state) => update(state, {
  authSignout: {
    data: { $set: initialState.authSignout.data },
    status: { $set: 'idle' },
    error: { $set: initialState.authSignout.error },
    message: { $set: initialState.authSignout.message },
  },
})


/**
 *
 */
const authForgotRequest = (state, action) => update(state, {
  authForgot: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const authForgotSuccess = (state, action) => update(state, {
  authForgot: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const authForgotFailure = (state, action) => update(state, {
  authForgot: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
  },
})

const authForgotIdle = (state) => update(state, {
  authForgot: {
    data: { $set: initialState.authForgot.data },
    status: { $set: 'idle' },
    error: { $set: initialState.authForgot.error },
    message: { $set: initialState.authForgot.message },
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

const authForgotConfirmSuccess = (state, action) => update(state, {
  authForgotConfirm: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const authForgotConfirmFailure = (state, action) => update(state, {
  authForgotConfirm: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
  },
})

const authForgotConfirmIdle = (state) => update(state, {
  authForgotConfirm: {
    data: { $set: initialState.authForgotConfirm.data },
    status: { $set: 'idle' },
    error: { $set: initialState.authForgotConfirm.error },
    message: { $set: initialState.authForgotConfirm.message },
  },
})

export default handleActions({
  [constants.AUTH_FLOW_REQUEST]: authFlowRequest,
  [constants.AUTH_FLOW_SUCCESS]: authFlowSuccess,
  [constants.AUTH_FLOW_FAILURE]: authFlowFailure,
  [constants.AUTH_FLOW_IDLE]: authFlowIdle,

  [constants.AUTH_DATA_REQUEST]: authDataRequest,
  [constants.AUTH_DATA_SUCCESS]: authDataSuccess,
  [constants.AUTH_DATA_FAILURE]: authDataFailure,
  [constants.AUTH_DATA_IDLE]: authDataIdle,

  [constants.AUTH_TOKEN_REQUEST]: authTokenRequest,
  [constants.AUTH_TOKEN_SUCCESS]: authTokenSuccess,
  [constants.AUTH_TOKEN_FAILURE]: authTokenFailure,
  [constants.AUTH_TOKEN_IDLE]: authTokenIdle,

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

  [constants.AUTH_SIGNOUT_REQUEST]: authSignoutRequest,
  [constants.AUTH_SIGNOUT_SUCCESS]: authSignoutSuccess,
  [constants.AUTH_SIGNOUT_FAILURE]: authSignoutFailure,
  [constants.AUTH_SIGNOUT_IDLE]: authSignoutIdle,

  [constants.AUTH_FORGOT_REQUEST]: authForgotRequest,
  [constants.AUTH_FORGOT_SUCCESS]: authForgotSuccess,
  [constants.AUTH_FORGOT_FAILURE]: authForgotFailure,
  [constants.AUTH_FORGOT_IDLE]: authForgotIdle,

  [constants.AUTH_FORGOT_CONFIRM_REQUEST]: authForgotConfirmRequest,
  [constants.AUTH_FORGOT_CONFIRM_SUCCESS]: authForgotConfirmSuccess,
  [constants.AUTH_FORGOT_CONFIRM_FAILURE]: authForgotConfirmFailure,
  [constants.AUTH_FORGOT_CONFIRM_IDLE]: authForgotConfirmIdle,
}, initialState)
