import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/signup/constants'

export const initialState = {
  signupUsername: {
    status: 'idle',
  },
  signupPassword: {
    status: 'idle',
  },
  signupCreate: {
    status: 'idle',
    payload: {},
  },
  signupConfirm: {
    status: 'idle',
  },
}

/**
 *
 */
const signupUsernameRequest = (state) => update(state, {
  signupUsername: {
    status: { $set: 'loading' },
  },
})

const signupUsernameSuccess = (state) => update(state, {
  signupUsername: {
    status: { $set: 'success' },
  },
})

const signupUsernameFailure = (state) => update(state, {
  signupUsername: {
    status: { $set: 'failure' },
  },
})

const signupUsernameIdle = (state) => update(state, {
  signupUsername: {
    $set: initialState.signupUsername,
  },
})

/**
 *
 */
const signupPasswordRequest = (state) => update(state, {
  signupPassword: {
    status: { $set: 'loading' },
  },
})

const signupPasswordSuccess = (state) => update(state, {
  signupPassword: {
    status: { $set: 'success' },
  },
})

const signupPasswordFailure = (state) => update(state, {
  signupPassword: {
    status: { $set: 'failure' },
  },
})

const signupPasswordIdle = (state) => update(state, {
  signupPassword: { $set: initialState.signupPassword },
})

/**
 *
 */
const signupCreateRequest = (state, action) => update(state, {
  signupCreate: {
    status: { $set: 'loading' },
    payload: { $merge: action.payload },
  },
})

const signupCreateSuccess = (state) => update(state, {
  signupCreate: {
    status: { $set: 'success' },
  },
})

const signupCreateFailure = (state) => update(state, {
  signupCreate: {
    status: { $set: 'failure' },
  },
})

const signupCreateIdle = (state) => update(state, {
  signupCreate: { $set: initialState.signupCreate },
})

/**
 *
 */
const signupConfirmRequest = (state) => update(state, {
  signupConfirm: {
    status: { $set: 'loading' },
  },
})

const signupConfirmSuccess = (state) => update(state, {
  signupConfirm: {
    status: { $set: 'success' },
  },
})

const signupConfirmFailure = (state) => update(state, {
  signupConfirm: {
    status: { $set: 'failure' },
  },
})

const signupConfirmIdle = (state) => update(state, {
  signupConfirm: {
    status: { $set: 'idle' },
  },
})

export default handleActions({
  [constants.SIGNUP_USERNAME_REQUEST]: signupUsernameRequest,
  [constants.SIGNUP_USERNAME_SUCCESS]: signupUsernameSuccess,
  [constants.SIGNUP_USERNAME_FAILURE]: signupUsernameFailure,
  [constants.SIGNUP_USERNAME_IDLE]: signupUsernameIdle,

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
