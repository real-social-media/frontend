import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/chat/constants'

/**
 * 
 */
export const signupPhoneIdle = createAction(constants.SIGNUP_PHONE_IDLE)
export const signupPhoneRequest = createAction(constants.SIGNUP_PHONE_REQUEST)
export const signupPhoneSuccess = createAction(constants.SIGNUP_PHONE_SUCCESS)
export const signupPhoneFailure = createAction(constants.SIGNUP_PHONE_FAILURE)

/**
 * 
 */
export const signupEmailIdle = createAction(constants.SIGNUP_EMAIL_IDLE)
export const signupEmailRequest = createAction(constants.SIGNUP_EMAIL_REQUEST)
export const signupEmailSuccess = createAction(constants.SIGNUP_EMAIL_SUCCESS)
export const signupEmailFailure = createAction(constants.SIGNUP_EMAIL_FAILURE)

/**
 * 
 */
export const signupPasswordIdle = createAction(constants.SIGNUP_PASSWORD_IDLE)
export const signupPasswordRequest = createAction(constants.SIGNUP_PASSWORD_REQUEST)
export const signupPasswordSuccess = createAction(constants.SIGNUP_PASSWORD_SUCCESS)
export const signupPasswordFailure = createAction(constants.SIGNUP_PASSWORD_FAILURE)
