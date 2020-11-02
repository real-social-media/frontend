import { expectSaga } from 'redux-saga-test-plan'
import contactsFollowRequest from 'store/ducks/contacts/saga/contactsFollow'
import * as actions from 'store/ducks/contacts/actions'
import * as usersActions from 'store/ducks/users/actions'

const userId = 2
const contactId = 1
const payload = { contactId, user: { userId } }

describe('Contacts Follow saga', () => {
  it('success', () => {
    return expectSaga(contactsFollowRequest, actions.contactsInviteRequest(payload))
      .put(usersActions.usersFollowRequest({ userId }))
      .put(actions.contactsFollowSuccess({ contactId }))

      .dispatch(usersActions.usersFollowSuccess())
      .silentRun()
  })

  it('failure', () => {
    const error = new Error('Error')

    return expectSaga(contactsFollowRequest, actions.contactsInviteRequest(payload))
      .put(usersActions.usersFollowRequest({ userId }))
      .put(actions.contactsFollowFailure({ error, contactId }))

      .dispatch(usersActions.usersFollowFailure(error))
      .silentRun()
  })
})
