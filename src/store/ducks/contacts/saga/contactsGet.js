import prop from 'ramda/src/prop'
import sort from 'ramda/src/sort'
import path from 'ramda/src/path'
import indexBy from 'ramda/src/indexBy'
import compose from 'ramda/src/compose'
import head from 'ramda/src/head'
import propOr from 'ramda/src/propOr'
import { getLocales } from 'react-native-localize'
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import { call, getContext, put } from 'redux-saga/effects'
import Contacts from 'react-native-contacts'
import parsePhoneNumber from 'libphonenumber-js/min'
import * as actions from 'store/ducks/contacts/actions'
import * as queries from 'store/ducks/contacts/queries'
import * as queryService from 'services/Query'

function normalizeContacts(contacts) {
  const makeFullName = (user) => {
    const fullName = [user.givenName, user.middleName, user.familyName].filter((i) => i).join(' ')

    return fullName ? fullName : 'Anonymous'
  }

  return contacts.map((item) => ({
    contactId: item.recordID,
    fullName: makeFullName(item),
    emails: item.emailAddresses.map(prop('email')),
    phones: item.phoneNumbers.map(prop('number')),
    thumbnailPath: item.thumbnailPath,
  }))
}

const getLocale = compose(propOr('US', 'countryCode'), head, getLocales)

function normalizeContactsForGQLRequest(contacts) {
  const locale = getLocale()

  return contacts.map((item) => ({
    contactId: item.contactId,
    emails: item.emails,
    phones: item.phones.reduce((acc, phone) => {
      try {
        const parsedNumber = parsePhoneNumber(phone, locale)
        return parsedNumber.isValid() ? [...acc, parsedNumber.format('E.164')] : acc
      } catch (error) {
        return acc
      }
    }, []),
  }))
}

const sortContacts = sort((a, b) => {
  if (a.user && b.user) {
    return a.fullName < b.fullName ? -1 : 1
  }

  if (!b.user) {
    return -1
  } else {
    return 1
  }
})

function* findContacts() {
  const contacts = yield call([Contacts, 'getAll'])
  const normalizedContacts = yield call(normalizeContacts, contacts)

  try {
    const variables = { contacts: normalizeContactsForGQLRequest(normalizedContacts) }
    const response = yield call([queryService, 'apiRequest'], queries.findContacts, variables)
    const users = indexBy(prop('contactId'), response.data.findContacts)
    const mixedContacts = normalizedContacts.map((item) => ({ ...item, user: path([item.contactId, 'user'], users) }))

    return sortContacts(mixedContacts)
  } catch (error) {
    return normalizedContacts
  }
}

function* checkContactsPermission() {
  const permission = yield call(function* () {
    const status = yield call(check, PERMISSIONS.IOS.CONTACTS)

    if (status === RESULTS.DENIED) {
      return yield call(request, PERMISSIONS.IOS.CONTACTS)
    } else {
      return status
    }
  })

  if ([RESULTS.BLOCKED, RESULTS.UNAVAILABLE, RESULTS.DENIED].includes(permission)) {
    throw new Error(`Contacts permission is ${permission}`)
  }
}

function* contactsGetRequest() {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    yield call(checkContactsPermission)
    const contacts = yield call(findContacts)
    yield put(actions.contactsGetSuccess({ data: contacts }))
  } catch (error) {
    yield put(actions.contactsGetFailure({ message: errorWrapper(error) }))
  }
}

export default contactsGetRequest
