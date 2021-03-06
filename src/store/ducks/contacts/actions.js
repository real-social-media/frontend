import { createAction } from 'redux-actions'
import { createFailureAction } from 'store/errors'
import * as constants from 'store/ducks/contacts/constants'

/**
 *
 */
export const contactsGetRequest = createAction(constants.CONTACTS_GET_REQUEST)
export const contactsGetSuccess = createAction(constants.CONTACTS_GET_SUCCESS)
export const contactsGetFailure = createFailureAction(constants.CONTACTS_GET_FAILURE)

/**
 *
 */
export const contactsInviteRequest = createAction(constants.CONTACTS_INVITE_REQUEST)
export const contactsInviteSuccess = createAction(constants.CONTACTS_INVITE_SUCCESS)
export const contactsInviteFailure = createFailureAction(constants.CONTACTS_INVITE_FAILURE)

/**
 *
 */
export const contactsFollowRequest = createAction(constants.CONTACTS_FOLLOW_REQUEST)
export const contactsFollowSuccess = createAction(constants.CONTACTS_FOLLOW_SUCCESS)
export const contactsFollowFailure = createFailureAction(constants.CONTACTS_FOLLOW_FAILURE)

/**
 *
 */
export const contactsGrantBonusRequest = createAction(constants.CONTACTS_GRANT_BONUS_REQUEST)
export const contactsGrantBonusSuccess = createAction(constants.CONTACTS_GRANT_BONUS_SUCCESS)
export const contactsGrantBonusFailure = createFailureAction(constants.CONTACTS_GRANT_BONUS_FAILURE)

/**
 *
 */
export const contactsCheckBonusRequest = createAction(constants.CONTACTS_CHECK_BONUS_REQUEST)
export const contactsCheckBonusSuccess = createAction(constants.CONTACTS_CHECK_BONUS_SUCCESS)
export const contactsCheckBonusFailure = createFailureAction(constants.CONTACTS_CHECK_BONUS_FAILURE)
