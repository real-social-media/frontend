import { Linking } from 'react-native'
import { put, call, select } from 'redux-saga/effects'
import { authUserSelector } from 'store/ducks/auth/selectors'
import * as actions from 'store/ducks/contacts/actions'
import path from 'ramda/src/path'

const getContactId = path(['payload', 'user', 'contactId'])

function* contactsInviteRequest(req) {
  const contactId = getContactId(req)

  try {
    const authUser = yield select(authUserSelector)
    const subject = 'Invite to REAL.app'
    const body = `https://apps.apple.com/us/app/real-social-media/id1485194570?referralId=${authUser.username}&ls=1`
    const { contact } = req.payload

    if (contact.type === 'email') {
      yield call([Linking, 'openURL'], `mailto:${contact.value}?subject=${subject}&body=${body}`)
    } else if (contact.type === 'phone') {
      yield call([Linking, 'openURL'], `sms:${contact.value}&body=${body}`)
    } else {
      throw new Error('Invite supports only email and phone type')
    }

    yield put(actions.contactsInviteSuccess({ contactId }))
  } catch (error) {
    yield put(actions.contactsInviteFailure({ message: error.message, contactId }))
  }
}

export default contactsInviteRequest
