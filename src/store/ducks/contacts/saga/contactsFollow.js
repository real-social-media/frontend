import { put, race, take } from 'redux-saga/effects'
import * as actions from 'store/ducks/contacts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as usersConstants from 'store/ducks/users/constants'
import path from 'ramda/src/path'

function* contactsFollowRequest(req) {
  const contactId = path(['payload', 'contactId'], req)

  try {
    const userId = req.payload.user.userId

    yield put(usersActions.usersFollowRequest({ userId }))

    const { failure } = yield race({
      failure: take(usersConstants.USERS_FOLLOW_FAILURE),
      success: take(usersConstants.USERS_FOLLOW_SUCCESS),
    })

    if (failure) {
      throw new Error(failure.payload.message)
    }

    yield put(actions.contactsFollowSuccess({ contactId }))
  } catch (error) {
    yield put(actions.contactsFollowFailure({ error, contactId }))
  }
}

export default contactsFollowRequest
