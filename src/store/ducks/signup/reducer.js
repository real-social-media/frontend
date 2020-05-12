import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/signup/constants'

const initialState = {
  /**
   *
   */
  signupCognitoIdentity: {
    
  },

  signupUsername: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  signupPhone: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  signupEmail: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  signupPassword: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  signupCreate: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
  signupConfirm: {
    data: [],
    status: 'idle',
    error: {},
    payload: {},
  },
}

/**
 *
 */
const signupUsernameRequest = (state, action) => update(state, {
  signupUsername: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const signupUsernameSuccess = (state, action) => update(state, {
  signupUsername: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const signupUsernameFailure = (state, action) => update(state, {
  signupUsername: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
    error: { $set: action.payload.message },
  },
})

const signupUsernameIdle = (state, action) => update(state, {
  signupUsername: {
    status: { $set: 'idle' },
    payload: { $set: initialState.signupUsername.payload },
  },
})

/**
 *
 */
const signupPhoneRequest = (state, action) => update(state, {
  signupPhone: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const signupPhoneSuccess = (state, action) => update(state, {
  signupPhone: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const signupPhoneFailure = (state, action) => update(state, {
  signupPhone: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
    error: { $set: action.payload.message },
  },
})

const signupPhoneIdle = (state, action) => update(state, {
  signupPhone: {
    status: { $set: 'idle' },
    payload: { $set: initialState.signupPhone.payload },
  },
})

/**
 *
 */
const signupEmailRequest = (state, action) => update(state, {
  signupEmail: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const signupEmailSuccess = (state, action) => update(state, {
  signupEmail: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const signupEmailFailure = (state, action) => update(state, {
  signupEmail: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
    error: { $set: action.payload.message },
  },
})

const signupEmailIdle = (state, action) => update(state, {
  signupEmail: {
    status: { $set: 'idle' },
    payload: { $set: initialState.signupEmail.payload },
  },
})

/**
 *
 */
const signupPasswordRequest = (state, action) => update(state, {
  signupPassword: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const signupPasswordSuccess = (state, action) => update(state, {
  signupPassword: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
})

const signupPasswordFailure = (state, action) => update(state, {
  signupPassword: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
    error: { $set: action.payload.message },
  },
})

const signupPasswordIdle = (state, action) => update(state, {
  signupPassword: {
    status: { $set: 'idle' },
    payload: { $set: initialState.signupPassword.payload },
  },
})

/**
 *
 */
const signupCreateRequest = (state, action) => update(state, {
  signupCreate: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const signupCreateSuccess = (state, action) => update(state, {
  signupCreate: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
  signupCognitoIdentity: {
    $set: action.payload.data,
  },
})

const signupCreateFailure = (state, action) => update(state, {
  signupCreate: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
    error: { $set: action.payload.message },
  },
})

const signupCreateIdle = (state, action) => update(state, {
  signupCreate: {
    status: { $set: 'idle' },
    payload: { $set: initialState.signupCreate.payload },
  },
})

/**
 *
 */
const signupConfirmRequest = (state, action) => update(state, {
  signupConfirm: {
    status: { $set: 'loading' },
    payload: { $set: action.payload },
  },
})

const signupConfirmSuccess = (state, action) => update(state, {
  signupConfirm: {
    data: { $set: action.payload.data },
    status: { $set: 'success' },
    payload: { $set: action.payload.payload },
  },
  signupCognitoIdentity: {
    $set: initialState.signupCognitoIdentity,
  },
})

const signupConfirmFailure = (state, action) => update(state, {
  signupConfirm: {
    status: { $set: 'failure' },
    payload: { $set: action.payload.payload },
    error: { $set: action.payload.message },
  },
})

const signupConfirmIdle = (state, action) => update(state, {
  signupConfirm: {
    status: { $set: 'idle' },
    payload: { $set: initialState.signupCreate.payload },
  },
})

export default handleActions({
  [constants.SIGNUP_USERNAME_REQUEST]: signupUsernameRequest,
  [constants.SIGNUP_USERNAME_SUCCESS]: signupUsernameSuccess,
  [constants.SIGNUP_USERNAME_FAILURE]: signupUsernameFailure,
  [constants.SIGNUP_USERNAME_IDLE]: signupUsernameIdle,

  [constants.SIGNUP_PHONE_REQUEST]: signupPhoneRequest,
  [constants.SIGNUP_PHONE_SUCCESS]: signupPhoneSuccess,
  [constants.SIGNUP_PHONE_FAILURE]: signupPhoneFailure,
  [constants.SIGNUP_PHONE_IDLE]: signupPhoneIdle,

  [constants.SIGNUP_EMAIL_REQUEST]: signupEmailRequest,
  [constants.SIGNUP_EMAIL_SUCCESS]: signupEmailSuccess,
  [constants.SIGNUP_EMAIL_FAILURE]: signupEmailFailure,
  [constants.SIGNUP_EMAIL_IDLE]: signupEmailIdle,

  [constants.SIGNUP_PASSWORD_REQUEST]: signupPasswordRequest,
  [constants.SIGNUP_PASSWORD_SUCCESS]: signupPasswordSuccess,
  [constants.SIGNUP_PASSWORD_FAILURE]: signupPasswordFailure,
  [constants.SIGNUP_PASSWORD_IDLE]: signupPasswordIdle,

  [constants.SIGNUP_CREATE_REQUEST]: signupCreateRequest,
  [constants.SIGNUP_CREATE_SUCCESS]: signupCreateSuccess,
  [constants.SIGNUP_CREATE_FAILURE]: signupCreateFailure,
  [constants.SIGNUP_CREATE_IDLE]: signupCreateIdle,

  [constants.SIGNUP_CONFIRM_REQUEST]: signupConfirmRequest,
  [constants.SIGNUP_CONFIRM_SUCCESS]: signupConfirmSuccess,
  [constants.SIGNUP_CONFIRM_FAILURE]: signupConfirmFailure,
  [constants.SIGNUP_CONFIRM_IDLE]: signupConfirmIdle,
}, initialState)
