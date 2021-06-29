import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import Contacts from 'react-native-contacts'
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions'
import contacts from 'store/ducks/contacts/saga'
import parsePhoneNumber from 'libphonenumber-js/min'
import * as actions from 'store/ducks/contacts/actions'
import { testAsRootSaga } from 'tests/utils/helpers'
import * as queryService from 'services/Query'

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))
Contacts.getAll.mockRejectedValue(new Error('Get All Error'))

const emailAddresses = [{ email: 'test1@email.com' }, { email: 'test2@email.com' }]
const phoneNumbers = [
  { number: '+19999999' },
  { number: '+2999999' },
  { number: '(888) 555-5512' },
  { number: '999-999' },
  { number: '7' },
  { number: '' },
]
const items = [
  {
    recordID: 1,
    givenName: 'givenName1',
    middleName: 'middleName1',
    familyName: 'familyName1',
    thumbnailPath: 'thumbnailPath',
    emailAddresses,
    phoneNumbers,
  },
  {
    recordID: 2,
    givenName: '',
    middleName: 'middleName1',
    familyName: 'familyName1',
    thumbnailPath: 'thumbnailPath',
    emailAddresses,
    phoneNumbers,
  },
  {
    recordID: 3,
    givenName: 'givenName1',
    middleName: '',
    familyName: 'familyName1',
    thumbnailPath: 'thumbnailPath',
    emailAddresses,
    phoneNumbers,
  },
  {
    recordID: 4,
    givenName: '',
    middleName: '',
    familyName: '',
    thumbnailPath: 'thumbnailPath',
    emailAddresses,
    phoneNumbers,
  },
]

const normalizedItems = [
  {
    contactId: 1,
    fullName: 'givenName1 middleName1 familyName1',
    emails: ['test1@email.com', 'test2@email.com'],
    phones: ['+19999999', '+2999999', '(888) 555-5512', '999-999', '7', ''],
    thumbnailPath: 'thumbnailPath',
  },
  {
    contactId: 2,
    fullName: 'middleName1 familyName1',
    emails: ['test1@email.com', 'test2@email.com'],
    phones: ['+19999999', '+2999999', '(888) 555-5512', '999-999', '7', ''],
    thumbnailPath: 'thumbnailPath',
  },
  {
    contactId: 3,
    fullName: 'givenName1 familyName1',
    emails: ['test1@email.com', 'test2@email.com'],
    phones: ['+19999999', '+2999999', '(888) 555-5512', '999-999', '7', ''],
    thumbnailPath: 'thumbnailPath',
  },
  {
    contactId: 4,
    fullName: 'Anonymous',
    emails: ['test1@email.com', 'test2@email.com'],
    phones: ['+19999999', '+2999999', '(888) 555-5512', '999-999', '7', ''],
    thumbnailPath: 'thumbnailPath',
  },
]

describe('Contacts saga', () => {
  afterEach(() => {
    queryService.apiRequest.mockClear()
  })

  it('phone validation', () => {
    const testNumber = (phoneStr, expected) => {
      const phone = parsePhoneNumber(phoneStr, 'US')
      expect(phone.format('E.164')).toBe(expected.number)
      expect(phone.isValid()).toBe(expected.isValid)
    }

    testNumber('(888) 555-5512', { number: '+18885555512', isValid: true })
    testNumber('+18885555512', { number: '+18885555512', isValid: true })
    testNumber('(888) 555-551', { number: '+1888555551', isValid: false })
    testNumber('8885555512', { number: '+18885555512', isValid: true })
    testNumber('555-5512', { number: '+15555512', isValid: false })
  })

  it('Permission UNAVAILABLE', () => {
    const context = [[matchers.call.fn(check), RESULTS.UNAVAILABLE]]

    return expectSaga(testAsRootSaga(contacts))
      .provide(context)

      .call(check, PERMISSIONS.IOS.CONTACTS)
      .not.call(request, PERMISSIONS.IOS.CONTACTS)
      .put(actions.contactsGetFailure(new Error('Contacts permission is UNAVAILABLE')))

      .dispatch(actions.contactsGetRequest())
      .silentRun()
  })

  it('Permission BLOCKED', () => {
    const context = [[matchers.call.fn(check), RESULTS.BLOCKED]]

    return expectSaga(testAsRootSaga(contacts))
      .provide(context)

      .call(check, PERMISSIONS.IOS.CONTACTS)
      .not.call(request, PERMISSIONS.IOS.CONTACTS)
      .put(actions.contactsGetFailure(new Error('Contacts permission is BLOCKED')))

      .dispatch(actions.contactsGetRequest())
      .silentRun()
  })

  it('Permission DENIED', () => {
    const context = [
      [matchers.call.fn(check), RESULTS.DENIED],
      [matchers.call.fn(request), RESULTS.DENIED],
    ]

    return expectSaga(testAsRootSaga(contacts))
      .provide(context)

      .call(check, PERMISSIONS.IOS.CONTACTS)
      .call(request, PERMISSIONS.IOS.CONTACTS)
      .put(actions.contactsGetFailure(new Error('Contacts permission is DENIED')))

      .dispatch(actions.contactsGetRequest())
      .silentRun()
  })

  it('failed get contacts', () => {
    const context = [[matchers.call.fn(check), RESULTS.GRANTED]]

    return expectSaga(testAsRootSaga(contacts))
      .provide(context)

      .call(check, PERMISSIONS.IOS.CONTACTS)
      .put(actions.contactsGetFailure(new Error('Get All Error')))

      .dispatch(actions.contactsGetRequest())
      .silentRun()
  })

  it('return pure contacts when findContacts failed', () => {
    Contacts.getAll.mockResolvedValueOnce(items)

    queryService.apiRequest.mockRejectedValueOnce(false)

    const context = [[matchers.call.fn(check), RESULTS.GRANTED]]

    return expectSaga(testAsRootSaga(contacts))
      .provide(context)

      .put(actions.contactsGetSuccess({ data: normalizedItems }))

      .dispatch(actions.contactsGetRequest())
      .silentRun()
  })
})
