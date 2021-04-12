import { put, call, getContext, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import { federatedGoogleSignout } from 'services/AWS'
import * as navigationActions from 'navigation/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'

/**
 * Remove cognito credentials
 */
function* handleAuthSignoutRequest() {
  const AwsAuth = yield getContext('AwsAuth')

  yield call([AwsAuth, 'signOut'])
  yield call(federatedGoogleSignout)

  yield put(subscriptionsActions.subscriptionsMainIdle())
  yield put(subscriptionsActions.subscriptionsPollIdle())

  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateReset(ReactNavigationRef.current)
}

function* authSignoutRequest() {
  try {
    yield handleAuthSignoutRequest()
    yield put(actions.authSignoutSuccess())
  } catch (error) {
    yield put(actions.authSignoutFailure(error))
  }
}

export default () => [takeEvery(constants.AUTH_SIGNOUT_REQUEST, authSignoutRequest)]
