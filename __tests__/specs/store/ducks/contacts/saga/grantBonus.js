import { Linking, Alert } from 'react-native'
import { expectSaga } from 'redux-saga-test-plan'
import { testAsRootSaga } from 'tests/utils/helpers'
import contacts from 'store/ducks/contacts/saga'
import * as authSelectors from 'store/ducks/auth/selectors'
import * as usersActions from 'store/ducks/users/actions'
import * as actions from 'store/ducks/contacts/actions'
import * as queries from 'store/ducks/contacts/queries'
import * as queryService from 'services/Query'

jest.spyOn(Alert, 'alert')
jest.spyOn(Linking, 'openURL')
Linking.openURL.mockResolvedValue(true)

jest.mock('react-native-contacts', () => ({ getAll: jest.fn() }))

jest.mock('services/Query', () => ({ apiRequest: jest.fn().mockResolvedValue(true) }))
jest.mock('store/ducks/auth/selectors', () => ({ authUserSelector: jest.fn() }))

authSelectors.authUserSelector.mockReturnValue({ username: 'username' })

const user = { contactId: 1 }
const tenInvited = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
}

describe('Contacts Grand bonus saga', () => {
  describe('success', () => {
    it('grand bonus on contactsInviteSuccess', () => {
      return expectSaga(testAsRootSaga(contacts))
        .withState({ contacts: { contactsInvite: { invited: tenInvited } } })

        .call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
        .put(usersActions.usersGetProfileSelfRequest())
        .call([Alert, 'alert'], 'Congratulations', 'Your earned free REAL Diamond')

        .dispatch(actions.contactsInviteSuccess(user))
        .silentRun()
    })

    it('grand bonus on contactsFollowSuccess', () => {
      return expectSaga(testAsRootSaga(contacts))
        .withState({ contacts: { contactsInvite: { invited: tenInvited } } })

        .call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
        .put(usersActions.usersGetProfileSelfRequest())
        .call([Alert, 'alert'], 'Congratulations', 'Your earned free REAL Diamond')

        .dispatch(actions.contactsFollowSuccess(user))
        .silentRun()
    })
  })

  describe('failure', () => {
    it('request error', () => {
      queryService.apiRequest.mockRejectedValueOnce(false)

      return expectSaga(testAsRootSaga(contacts))
        .withState({ contacts: { contactsInvite: { invited: tenInvited } } })

        .call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
        .not.put(usersActions.usersGetProfileSelfRequest())
        .not.call([Alert, 'alert'], 'Congratulations', 'Your earned free REAL Diamond')

        .dispatch(actions.contactsInviteSuccess(user))
        .silentRun()
    })

    it('not enough invited', () => {
      return expectSaga(testAsRootSaga(contacts))
        .withState({ contacts: { contactsInvite: { invited: { 1: true } } } })

        .not.call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
        .not.put(usersActions.usersGetProfileSelfRequest())
        .not.call([Alert, 'alert'], 'Congratulations', 'Your earned free REAL Diamond')

        .dispatch(actions.contactsInviteSuccess(user))
        .silentRun()
    })
  })
})
