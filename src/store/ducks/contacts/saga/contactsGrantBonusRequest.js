import { Alert } from 'react-native'
import { put, call, select } from 'redux-saga/effects'
import * as usersActions from 'store/ducks/users/actions'
import * as selectors from 'store/ducks/contacts/selectors'
import * as queries from 'store/ducks/contacts/queries'
import * as queryService from 'services/Query'

function* contactsGrantBonusRequest() {
  try {
    const { invited } = yield select(selectors.contactsInvite)

    if (Object.keys(invited).length === 10) {
      yield call(queryService.apiRequest, queries.grantUserSubscriptionBonus)
      yield put(usersActions.usersGetProfileSelfRequest())
      yield call([Alert, 'alert'], 'Congratulations', 'Your earned free REAL Diamond')
    }
  } catch (error) {
    // ignore
  }
}

export default contactsGrantBonusRequest
