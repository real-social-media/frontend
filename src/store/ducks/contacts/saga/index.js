import { takeLeading, takeEvery } from 'redux-saga/effects'
import * as constants from 'store/ducks/contacts/constants'
import contactsGetRequest from 'store/ducks/contacts/saga/contactsGet'
import contactsInviteRequest from 'store/ducks/contacts/saga/contactsInvite'
import contactsFollowRequest from 'store/ducks/contacts/saga/contactsFollow'
import contactsGrantBonusRequest from 'store/ducks/contacts/saga/contactsGrantBonusRequest'

export default () => [
  takeLeading(constants.CONTACTS_GET_REQUEST, contactsGetRequest),
  takeLeading(constants.CONTACTS_INVITE_REQUEST, contactsInviteRequest),
  takeEvery(constants.CONTACTS_FOLLOW_REQUEST, contactsFollowRequest),
  takeEvery([constants.CONTACTS_FOLLOW_SUCCESS, constants.CONTACTS_INVITE_SUCCESS], contactsGrantBonusRequest),
]
