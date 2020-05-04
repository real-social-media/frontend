import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/auth/constants'
import path from 'ramda/src/path'

export const initialState = {
  /**
   *
   */
  user: {},

  /**
   *
   */
  authOnboard: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authCheck: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authSignin: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authSignup: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authSignupResend: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authSignupConfirm: {
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
  authFacebook: {
    data: [],
    status: 'idle',
    error: {},
    message: {},
    payload: {},
    nextRoute: null,
  },
  authGoogle: {
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
}

const globalAuthUserTrigger = (state, action) => update(state, {
  user: { $set: action.payload.data },
})

/**
 *
 */
const authOnboardRequest = (state, action) => update(state, {
  authOnboard: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const authOnboardSuccess = (state, action) => update(state, {
  authOnboard: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    nextRoute: { $set: action.payload.nextRoute },
  },
})

const authOnboardFailure = (state, action) => update(state, {
  authOnboard: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
    nextRoute: { $set: action.payload.nextRoute },
  },
})

const authOnboardIdle = (state, action) => update(state, {
  authOnboard: {
    data: { $set: initialState.authOnboard.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
export const authCheckRequest = (state, action) => update(state, {
  authCheck: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

export const authCheckSuccess = (state, action) => update(state, {
  user: { $set: action.payload.data },
  authCheck: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    nextRoute: { $set: action.payload.nextRoute },
  },
})

export const authCheckFailure = (state, action) => update(state, {
  authCheck: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
    nextRoute: { $set: action.payload.nextRoute },
    meta: { $set: action.payload.meta },
  },
})

export const authCheckIdle = (state, action) => update(state, {
  authCheck: {
    data: { $set: initialState.authCheck.data },
    status: { $set: 'idle' },
    nextRoute: { $set: path(['payload', 'nextRoute'])(action) || path(['authCheck', 'nextRoute'])(state) },
  },
})

export const authCheckReset = (state, action) => update(state, {
  user: { $set: initialState.user },
})

/**
 *
 */
export const authSigninRequest = (state, action) => update(state, {
  authSignin: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const authSigninSuccess = (state, action) => update(state, {
  authSignin: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    nextRoute: { $set: action.payload.nextRoute },
  },
})

const authSigninFailure = (state, action) => update(state, {
  authSignin: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
    nextRoute: { $set: action.payload.nextRoute },
  },
})

const authSigninIdle = (state, action) => update(state, {
  authSignin: {
    data: { $set: initialState.authSignin.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authSignupRequest = (state, action) => update(state, {
  authSignup: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const authSignupSuccess = (state, action) => update(state, {
  authSignup: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    nextRoute: { $set: action.payload.nextRoute },
  },
})

const authSignupFailure = (state, action) => update(state, {
  authSignup: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
    nextRoute: { $set: action.payload.nextRoute },
  },
})

const authSignupIdle = (state, action) => update(state, {
  authSignup: {
    data: { $set: initialState.authSignup.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authSignupResendRequest = (state, action) => update(state, {
  authSignupResend: {
    status: { $set: 'loading' },
  },
})

const authSignupResendSuccess = (state, action) => update(state, {
  authSignupResend: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const authSignupResendFailure = (state, action) => update(state, {
  authSignupResend: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
  },
})

const authSignupResendIdle = (state, action) => update(state, {
  authSignupResend: {
    data: { $set: initialState.authSignupResend.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authSignupConfirmRequest = (state, action) => update(state, {
  authSignupConfirm: {
    status: { $set: 'loading' },
  },
})

const authSignupConfirmSuccess = (state, action) => update(state, {
  authSignupConfirm: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const authSignupConfirmFailure = (state, action) => update(state, {
  authSignupConfirm: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
  },
})

const authSignupConfirmIdle = (state, action) => update(state, {
  authSignupConfirm: {
    data: { $set: initialState.authSignupConfirm.data },
    status: { $set: 'idle' },
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
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
  },
})

const authForgotIdle = (state, action) => update(state, {
  authForgot: {
    data: { $set: initialState.authForgot.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authForgotConfirmRequest = (state, action) => update(state, {
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
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
  },
})

const authForgotConfirmIdle = (state, action) => update(state, {
  authForgotConfirm: {
    data: { $set: initialState.authForgotConfirm.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authFacebookRequest = (state, action) => update(state, {
  authFacebook: {
    status: { $set: 'loading' },
  },
})

const authFacebookSuccess = (state, action) => update(state, {
  authFacebook: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const authFacebookFailure = (state, action) => update(state, {
  authFacebook: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
  },
})

const authFacebookIdle = (state, action) => update(state, {
  authFacebook: {
    data: { $set: initialState.authFacebook.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authGoogleRequest = (state, action) => update(state, {
  authGoogle: {
    status: { $set: 'loading' },
  },
})

const authGoogleSuccess = (state, action) => update(state, {
  authGoogle: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
  },
})

const authGoogleFailure = (state, action) => update(state, {
  authGoogle: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
  },
})

const authGoogleIdle = (state, action) => update(state, {
  authGoogle: {
    data: { $set: initialState.authGoogle.data },
    status: { $set: 'idle' },
  },
})

/**
 *
 */
const authSignoutRequest = (state, action) => update(state, {
  authSignout: {
    status: { $set: 'loading' },
  },
})

const authSignoutSuccess = (state, action) => update(initialState, {
  authCheck: {
    message: { $set: action.payload.message },
    nextRoute: { $set: 'Auth' },
  },
})

const authSignoutFailure = (state, action) => update(state, {
  authSignout: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.error },
    status: { $set: 'failure' },
  },
})

const authSignoutIdle = (state, action) => update(state, {
  authSignout: {
    data: { $set: initialState.authSignout.data },
    status: { $set: 'idle' },
  },
})

export default handleActions({
  ['GLOBAL_AUTH_USER_TRIGGER']: globalAuthUserTrigger,

  [constants.AUTH_ONBOARD_REQUEST]: authOnboardRequest,
  [constants.AUTH_ONBOARD_SUCCESS]: authOnboardSuccess,
  [constants.AUTH_ONBOARD_FAILURE]: authOnboardFailure,
  [constants.AUTH_ONBOARD_IDLE]: authOnboardIdle,

  [constants.AUTH_CHECK_REQUEST]: authCheckRequest,
  [constants.AUTH_CHECK_SUCCESS]: authCheckSuccess,
  [constants.AUTH_CHECK_FAILURE]: authCheckFailure,
  [constants.AUTH_CHECK_IDLE]: authCheckIdle,
  [constants.AUTH_CHECK_RESET]: authCheckReset,

  [constants.AUTH_SIGNIN_REQUEST]: authSigninRequest,
  [constants.AUTH_SIGNIN_SUCCESS]: authSigninSuccess,
  [constants.AUTH_SIGNIN_FAILURE]: authSigninFailure,
  [constants.AUTH_SIGNIN_IDLE]: authSigninIdle,

  [constants.AUTH_SIGNUP_REQUEST]: authSignupRequest,
  [constants.AUTH_SIGNUP_SUCCESS]: authSignupSuccess,
  [constants.AUTH_SIGNUP_FAILURE]: authSignupFailure,
  [constants.AUTH_SIGNUP_IDLE]: authSignupIdle,

  [constants.AUTH_SIGNUP_RESEND_REQUEST]: authSignupResendRequest,
  [constants.AUTH_SIGNUP_RESEND_SUCCESS]: authSignupResendSuccess,
  [constants.AUTH_SIGNUP_RESEND_FAILURE]: authSignupResendFailure,
  [constants.AUTH_SIGNUP_RESEND_IDLE]: authSignupResendIdle,

  [constants.AUTH_SIGNUP_CONFIRM_REQUEST]: authSignupConfirmRequest,
  [constants.AUTH_SIGNUP_CONFIRM_SUCCESS]: authSignupConfirmSuccess,
  [constants.AUTH_SIGNUP_CONFIRM_FAILURE]: authSignupConfirmFailure,
  [constants.AUTH_SIGNUP_CONFIRM_IDLE]: authSignupConfirmIdle,

  [constants.AUTH_FORGOT_REQUEST]: authForgotRequest,
  [constants.AUTH_FORGOT_SUCCESS]: authForgotSuccess,
  [constants.AUTH_FORGOT_FAILURE]: authForgotFailure,
  [constants.AUTH_FORGOT_IDLE]: authForgotIdle,

  [constants.AUTH_FORGOT_CONFIRM_REQUEST]: authForgotConfirmRequest,
  [constants.AUTH_FORGOT_CONFIRM_SUCCESS]: authForgotConfirmSuccess,
  [constants.AUTH_FORGOT_CONFIRM_FAILURE]: authForgotConfirmFailure,
  [constants.AUTH_FORGOT_CONFIRM_IDLE]: authForgotConfirmIdle,

  [constants.AUTH_FACEBOOK_REQUEST]: authFacebookRequest,
  [constants.AUTH_FACEBOOK_SUCCESS]: authFacebookSuccess,
  [constants.AUTH_FACEBOOK_FAILURE]: authFacebookFailure,
  [constants.AUTH_FACEBOOK_IDLE]: authFacebookIdle,

  [constants.AUTH_GOOGLE_REQUEST]: authGoogleRequest,
  [constants.AUTH_GOOGLE_SUCCESS]: authGoogleSuccess,
  [constants.AUTH_GOOGLE_FAILURE]: authGoogleFailure,
  [constants.AUTH_GOOGLE_IDLE]: authGoogleIdle,

  [constants.AUTH_SIGNOUT_REQUEST]: authSignoutRequest,
  [constants.AUTH_SIGNOUT_SUCCESS]: authSignoutSuccess,
  [constants.AUTH_SIGNOUT_FAILURE]: authSignoutFailure,
  [constants.AUTH_SIGNOUT_IDLE]: authSignoutIdle,
}, initialState)
