import { put, race, take } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as navigationActions from 'navigation/actions'
import * as NavigationService from 'services/Navigation'
import * as constants from 'store/ducks/auth/constants'
import * as pushActions from 'store/ducks/push/actions'

function* authorize() {
  const navigation = yield NavigationService.getNavigation()
  yield put(actions.authGetUserRequest())

  const { getUserFailure } = yield race({
    getUserSuccess: take(constants.AUTH_GET_USER_SUCCESS),
    getUserFailure: take(constants.AUTH_GET_USER_FAILURE),
  })

  if (getUserFailure) {
    throw getUserFailure.payload
  }

  yield put(actions.authPrefetchRequest())
  yield put(pushActions.pushStartRequest())

  navigationActions.navigateResetToApp(navigation)
}

export default authorize
