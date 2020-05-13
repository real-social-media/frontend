import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/auth/constants'
import path from 'ramda/src/path'

const initialState = {
  /**
   *
   */
  user: {},

  /**
   *
   */
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

const globalAuthUserTrigger = (state, action) => update(state, {
  user: { $set: action.payload.data },
})

/**
 *
 */
const authCheckRequest = (state, action) => update(state, {
  authCheck: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const authCheckSuccess = (state, action) => update(state, {
  user: { $set: action.payload.data },
  authCheck: {
    message: { $set: action.payload.message },
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    nextRoute: { $set: action.payload.nextRoute },
  },
})

const authCheckFailure = (state, action) => update(state, {
  authCheck: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
    nextRoute: { $set: action.payload.nextRoute },
    meta: { $set: action.payload.meta },
  },
})

const authCheckIdle = (state, action) => update(state, {
  authCheck: {
    data: { $set: initialState.authCheck.data },
    status: { $set: 'idle' },
    nextRoute: { $set: path(['payload', 'nextRoute'])(action) || path(['authCheck', 'nextRoute'])(state) },
  },
})

const authCheckReset = (state, action) => update(state, {
  user: { $set: initialState.user },
})

/**
 *
 */
const authSigninRequest = (state, action) => update(state, {
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
    error: { $set: action.payload.message },
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
    error: { $set: action.payload.message },
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
    nextRoute: { $set: 'AuthHome' },
  },
})

const authSignoutFailure = (state, action) => update(state, {
  authSignout: {
    message: { $set: action.payload.message },
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
  },
})

const authSignoutIdle = (state, action) => update(state, {
  authSignout: {
    data: { $set: initialState.authSignout.data },
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
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
  },
})

const authForgotIdle = (state, action) => update(state, {
  authForgot: {
    data: { $set: initialState.authForgot.data },
    status: { $set: 'idle' },
    error: { $set: initialState.authForgot.error },
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
    error: { $set: action.payload.message },
    status: { $set: 'failure' },
  },
})

const authForgotConfirmIdle = (state, action) => update(state, {
  authForgotConfirm: {
    data: { $set: initialState.authForgotConfirm.data },
    status: { $set: 'idle' },
    error: { $set: initialState.authForgotConfirm.error },
  },
})

export default handleActions({
  ['GLOBAL_AUTH_USER_TRIGGER']: globalAuthUserTrigger,

  [constants.AUTH_CHECK_REQUEST]: authCheckRequest,
  [constants.AUTH_CHECK_SUCCESS]: authCheckSuccess,
  [constants.AUTH_CHECK_FAILURE]: authCheckFailure,
  [constants.AUTH_CHECK_IDLE]: authCheckIdle,
  [constants.AUTH_CHECK_RESET]: authCheckReset,

  [constants.AUTH_SIGNIN_REQUEST]: authSigninRequest,
  [constants.AUTH_SIGNIN_SUCCESS]: authSigninSuccess,
  [constants.AUTH_SIGNIN_FAILURE]: authSigninFailure,
  [constants.AUTH_SIGNIN_IDLE]: authSigninIdle,

  [constants.AUTH_GOOGLE_REQUEST]: authGoogleRequest,
  [constants.AUTH_GOOGLE_SUCCESS]: authGoogleSuccess,
  [constants.AUTH_GOOGLE_FAILURE]: authGoogleFailure,
  [constants.AUTH_GOOGLE_IDLE]: authGoogleIdle,

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
