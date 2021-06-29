import { put, takeLatest, select } from 'redux-saga/effects'
import * as constants from 'store/ducks/appState/constants'
import * as authActions from 'store/ducks/auth/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as updatesActions from 'store/ducks/updates/actions'
import * as authSelector from 'store/ducks/auth/selectors'

function* appStateLaunched() {
  yield put(updatesActions.updatesCheckRequest())
  yield put(authActions.authFlowRequest())
}

function* appStateForeground() {
  const userId = yield select(authSelector.authUserId)

  yield put(updatesActions.updatesCheckRequest())

  if (userId) {
    yield put(authActions.authPrefetchRequest())
  }
}

function* appStateBackground() {
  yield put(subscriptionsActions.subscriptionsMainIdle())
  yield put(subscriptionsActions.subscriptionsPollIdle())
}

export default () => [
  takeLatest(constants.APP_STATE_LAUNCHED, appStateLaunched),
  takeLatest(constants.APP_STATE_FOREGROUND, appStateForeground),
  takeLatest(constants.APP_STATE_BACKGROUND, appStateBackground),
]
