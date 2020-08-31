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
  authApple: {
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
const authCheckRequest = (state, action) =>
  update(state, {
    authCheck: {
      status: { $set: 'loading' },
      payload: { $set: action.payload },
    },
  })

const authCheckSuccess = (state, action) =>
  update(state, {
    user: { $set: action.payload.data },
    authCheck: {
      message: { $set: action.payload.message },
      data: { $set: action.payload.data },
      status: { $set: 'success' },
      nextRoute: { $set: action.payload.nextRoute },
      meta: { $set: action.payload.meta },
    },
  })

const authCheckFailure = (state, action) =>
  update(state, {
    authCheck: {
      message: { $set: action.payload.message },
      error: { $set: action.payload.message },
      status: { $set: 'failure' },
      nextRoute: { $set: action.payload.nextRoute },
      meta: { $set: action.payload.meta },
    },
  })

const authCheckIdle = (state, action) =>
  update(state, {
    authCheck: {
      data: { $set: initialState.authCheck.data },
      status: { $set: 'idle' },
      error: { $set: initialState.authCheck.error },
      message: { $set: initialState.authCheck.message },
      nextRoute: { $set: path(['payload', 'nextRoute'])(action) || path(['authCheck', 'nextRoute'])(state) },
    },
  })

const authCheckReset = (state) =>
  update(state, {
    user: { $set: initialState.user },
  })

/**
 *
 */
const authSigninRequest = (state, action) =>
  update(state, {
    authSignin: {
      status: { $set: 'loading' },
      payload: { $set: action.payload },
    },
  })

const authSigninSuccess = (state, action) =>
  update(state, {
    authSignin: {
      message: { $set: action.payload.message },
      data: { $set: action.payload.data },
      status: { $set: 'success' },
      nextRoute: { $set: action.payload.nextRoute },
    },
  })

const authSigninFailure = (state, action) =>
  update(state, {
    authSignin: {
      message: { $set: action.payload.message },
      error: { $set: action.payload.message },
      status: { $set: 'failure' },
      nextRoute: { $set: action.payload.nextRoute },
    },
  })

const authSigninIdle = (state) =>
  update(state, {
    authSignin: {
      data: { $set: initialState.authSignin.data },
      status: { $set: 'idle' },
      error: { $set: initialState.authSignin.error },
      message: { $set: initialState.authSignin.message },
    },
  })

/**
 *
 */
const authGoogleRequest = (state) =>
  update(state, {
    authGoogle: {
      status: { $set: 'loading' },
    },
  })

const authGoogleSuccess = (state, action) =>
  update(state, {
    authGoogle: {
      message: { $set: action.payload.message },
      data: { $set: action.payload.data },
      status: { $set: 'success' },
    },
  })

const authGoogleFailure = (state, action) =>
  update(state, {
    authGoogle: {
      message: { $set: action.payload.message },
      error: { $set: action.payload.message },
      status: { $set: 'failure' },
    },
  })

const authGoogleIdle = (state) =>
  update(state, {
    authGoogle: {
      data: { $set: initialState.authGoogle.data },
      status: { $set: 'idle' },
      error: { $set: initialState.authGoogle.error },
      message: { $set: initialState.authGoogle.message },
    },
  })

/**
 *
 */
const authAppleRequest = (state) =>
  update(state, {
    authApple: {
      status: { $set: 'loading' },
    },
  })

const authAppleSuccess = (state, action) =>
  update(state, {
    authApple: {
      message: { $set: action.payload.message },
      data: { $set: action.payload.data },
      status: { $set: 'success' },
    },
  })

const authAppleFailure = (state, action) =>
  update(state, {
    authApple: {
      message: { $set: action.payload.message },
      error: { $set: action.payload.message },
      status: { $set: 'failure' },
    },
  })

const authAppleIdle = (state) =>
  update(state, {
    authApple: {
      data: { $set: initialState.authApple.data },
      status: { $set: 'idle' },
      error: { $set: initialState.authApple.error },
      message: { $set: initialState.authApple.message },
    },
  })

/**
 *
 */
const authSignoutRequest = (state) =>
  update(state, {
    authSignout: {
      status: { $set: 'loading' },
    },
  })

const authSignoutSuccess = (state, action) =>
  update(initialState, {
    authCheck: {
      message: { $set: action.payload.message },
      nextRoute: { $set: 'AuthHome' },
    },
  })

const authSignoutFailure = (state, action) =>
  update(state, {
    authSignout: {
      message: { $set: action.payload.message },
      error: { $set: action.payload.message },
      status: { $set: 'failure' },
    },
  })

const authSignoutIdle = (state) =>
  update(state, {
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
const authForgotRequest = (state, action) =>
  update(state, {
    authForgot: {
      status: { $set: 'loading' },
      payload: { $set: action.payload },
    },
  })

const authForgotSuccess = (state, action) =>
  update(state, {
    authForgot: {
      message: { $set: action.payload.message },
      data: { $set: action.payload.data },
      status: { $set: 'success' },
    },
  })

const authForgotFailure = (state, action) =>
  update(state, {
    authForgot: {
      message: { $set: action.payload.message },
      error: { $set: action.payload.message },
      status: { $set: 'failure' },
    },
  })

const authForgotIdle = (state) =>
  update(state, {
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
const authForgotConfirmRequest = (state) =>
  update(state, {
    authForgotConfirm: {
      status: { $set: 'loading' },
    },
  })

const authForgotConfirmSuccess = (state, action) =>
  update(state, {
    authForgotConfirm: {
      message: { $set: action.payload.message },
      data: { $set: action.payload.data },
      status: { $set: 'success' },
    },
  })

const authForgotConfirmFailure = (state, action) =>
  update(state, {
    authForgotConfirm: {
      message: { $set: action.payload.message },
      error: { $set: action.payload.message },
      status: { $set: 'failure' },
    },
  })

const authForgotConfirmIdle = (state) =>
  update(state, {
    authForgotConfirm: {
      data: { $set: initialState.authForgotConfirm.data },
      status: { $set: 'idle' },
      error: { $set: initialState.authForgotConfirm.error },
      message: { $set: initialState.authForgotConfirm.message },
    },
  })

export default handleActions(
  {
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

    [constants.AUTH_APPLE_REQUEST]: authAppleRequest,
    [constants.AUTH_APPLE_SUCCESS]: authAppleSuccess,
    [constants.AUTH_APPLE_FAILURE]: authAppleFailure,
    [constants.AUTH_APPLE_IDLE]: authAppleIdle,

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
  },
  initialState,
)
