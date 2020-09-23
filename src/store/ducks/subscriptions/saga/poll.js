import { call, put, take, takeEvery } from 'redux-saga/effects'
import * as postsActions from 'store/ducks/posts/actions'
import * as constants from 'store/ducks/subscriptions/constants'
import { intervalEmitter } from 'store/ducks/subscriptions/saga/helpers'

/**
 *
 */
function* subscriptionPollStart() {
  const channel = yield call(intervalEmitter, {
    frequency: 30 * 60000,
  })

  yield takeEvery(channel, function* () {
    yield put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
  })

  /**
   * Close channel subscription on application toggle
   */
  yield take(constants.SUBSCRIPTIONS_POLL_IDLE)
  channel.close()
}

function* _subscriptionPollStart() {
  try {
    yield subscriptionPollStart()
  } catch (error) {
    // ignore
  }
}

export default _subscriptionPollStart
