import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/chat/constants'

const initialState = {
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
}

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
    payload: { $set: action.payload },
  },
})

const signupPhoneFailure = (state, action) => update(state, {
  signupPhone: {
    status: { $set: 'failure' },
    payload: { $set: action.payload },
  },
})

const signupPhoneIdle = (state, action) => update(state, {
  signupPhone: {
    status: { $set: 'idle' },
    payload: { $set: action.payload },
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
    payload: { $set: action.payload },
  },
})

const signupEmailFailure = (state, action) => update(state, {
  signupEmail: {
    status: { $set: 'failure' },
    payload: { $set: action.payload },
  },
})

const signupEmailIdle = (state, action) => update(state, {
  signupEmail: {
    status: { $set: 'idle' },
    payload: { $set: action.payload },
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
    payload: { $set: action.payload },
  },
})

const signupPasswordFailure = (state, action) => update(state, {
  signupPassword: {
    status: { $set: 'failure' },
    payload: { $set: action.payload },
  },
})

const signupPasswordIdle = (state, action) => update(state, {
  signupPassword: {
    status: { $set: 'idle' },
    payload: { $set: action.payload },
  },
})

export default handleActions({
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
}, initialState)
