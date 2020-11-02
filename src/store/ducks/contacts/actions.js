import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/contacts/constants'

/**
 * 
 */
export const contactsGetRequest = createAction(constants.CONTACTS_GET_REQUEST)
export const contactsGetSuccess = createAction(constants.CONTACTS_GET_SUCCESS)
export const contactsGetFailure = createAction(constants.CONTACTS_GET_FAILURE)

/**
 * 
 */
export const contactsInviteRequest = createAction(constants.CONTACTS_INVITE_REQUEST)
export const contactsInviteSuccess = createAction(constants.CONTACTS_INVITE_SUCCESS)
export const contactsInviteFailure = createAction(constants.CONTACTS_INVITE_FAILURE)
export const contactsInviteIdle = createAction(constants.CONTACTS_INVITE_IDLE)

/**
 * 
 */
export const contactsFollowRequest = createAction(constants.CONTACTS_FOLLOW_REQUEST)
export const contactsFollowSuccess = createAction(constants.CONTACTS_FOLLOW_SUCCESS)
export const contactsFollowFailure = createAction(constants.CONTACTS_FOLLOW_FAILURE)