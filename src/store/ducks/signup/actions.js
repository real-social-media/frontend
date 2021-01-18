import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/signup/constants'

/**
 * 
 */
export const signupUsernameIdle = createAction(constants.SIGNUP_USERNAME_IDLE)
export const signupUsernameRequest = createAction(constants.SIGNUP_USERNAME_REQUEST)
export const signupUsernameSuccess = createAction(constants.SIGNUP_USERNAME_SUCCESS)
export const signupUsernameFailure = createAction(constants.SIGNUP_USERNAME_FAILURE)

/**
 * 
 */
export const signupPasswordIdle = createAction(constants.SIGNUP_PASSWORD_IDLE)
export const signupPasswordRequest = createAction(constants.SIGNUP_PASSWORD_REQUEST)
export const signupPasswordSuccess = createAction(constants.SIGNUP_PASSWORD_SUCCESS)
export const signupPasswordFailure = createAction(constants.SIGNUP_PASSWORD_FAILURE)

/**
 * 
 */
export const signupCreateIdle = createAction(constants.SIGNUP_CREATE_IDLE)
export const signupCreateRequest = createAction(constants.SIGNUP_CREATE_REQUEST)
export const signupCreateSuccess = createAction(constants.SIGNUP_CREATE_SUCCESS)
export const signupCreateFailure = createAction(constants.SIGNUP_CREATE_FAILURE)

/**
 * 
 */
export const signupConfirmIdle = createAction(constants.SIGNUP_CONFIRM_IDLE)
export const signupConfirmRequest = createAction(constants.SIGNUP_CONFIRM_REQUEST)
export const signupConfirmSuccess = createAction(constants.SIGNUP_CONFIRM_SUCCESS)
export const signupConfirmFailure = createAction(constants.SIGNUP_CONFIRM_FAILURE)
