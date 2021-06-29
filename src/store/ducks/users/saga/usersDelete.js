import { put, takeLatest, call } from 'redux-saga/effects'
import * as actions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/users/queries'
import * as constants from 'store/ducks/users/constants'
import * as queryService from 'services/Query'
import * as authActions from 'store/ducks/auth/actions'

/**
 *
 */
function* usersDeleteRequest() {
  try {
    yield call([queryService, 'apiRequest'], queries.deleteUser)
    yield put(authActions.authSignoutRequest())
    yield put(actions.usersDeleteSuccess())
  } catch (error) {
    yield put(actions.usersDeleteFailure(error))
  }
}

export default () => [takeLatest(constants.USERS_DELETE_REQUEST, usersDeleteRequest)]
