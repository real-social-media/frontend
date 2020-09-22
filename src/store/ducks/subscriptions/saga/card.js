import { call, put, take, takeEvery } from 'redux-saga/effects'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as usersQueries from 'store/ducks/users/queries'
import * as constants from 'store/ducks/subscriptions/constants'
import { createChannel } from 'store/ducks/subscriptions/saga/helpers'

/**
 * Cards subscription channel
 */
function* cardSubscription() {
  const { channel, subscriptionState, userId } = yield call(createChannel, {
    query: usersQueries.onCardNotification,
    identifier: 'onCardNotification',
  })

  yield takeEvery(channel, function* ({ eventType, eventData }) {
    if (eventType === 'connect') {
      return yield call(subscriptionState.connectHandler, eventData)
    } else if (eventType === 'pending') {
      return yield call(subscriptionState.pendingHandler, eventData)
    } else if (eventType === 'disconnect') {
      return yield call(subscriptionState.disconnectHandler, eventData)
    }

    yield put(usersActions.usersGetCardsRequest({}))
    yield put(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
    yield put(usersActions.usersGetProfileSelfRequest({ userId }))
    yield put(usersActions.usersGetPendingFollowersRequest({ userId }))
  })

  /**
   * Close channel subscription on application toggle
   */
  yield take(constants.SUBSCRIPTIONS_MAIN_IDLE)
  channel.close()
}

export default cardSubscription
