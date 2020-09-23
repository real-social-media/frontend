import { call, put, take, takeEvery, select } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as usersQueries from 'store/ducks/users/queries'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as constants from 'store/ducks/subscriptions/constants'
import { createChannel } from 'store/ducks/subscriptions/saga/helpers'

/**
 * New subscription that is used for various real-time updates
 */
function* subscriptionNotificationStart() {
  const { channel, subscriptionState } = yield call(createChannel, {
    query: usersQueries.onNotification,
    identifier: 'onNotification',
  })

  yield takeEvery(channel, function* ({ eventType, eventData }) {
    if (eventType === 'connect') {
      return yield call(subscriptionState.connectHandler, eventData)
    } else if (eventType === 'pending') {
      return yield call(subscriptionState.pendingHandler, eventData)
    } else if (eventType === 'disconnect') {
      return yield call(subscriptionState.disconnectHandler, eventData)
    }

    const payload = path(['value', 'data', 'onNotification'], eventData)
    const userId = path(['userId'], payload)
    const type = path(['type'], payload)

    /**
     * Fires when one of the user's followeds changes their first story
     */
    if (type === 'USER_CHATS_WITH_UNVIEWED_MESSAGES_COUNT_CHANGED') {
      return yield put(usersActions.usersGetProfileSelfRequest({ userId }))
    }

    /**
     * Fires when a post is added to User.feed
     */
    if (type === 'USER_FEED_CHANGED') {
      const postsCreate = yield select((state) => state.posts.postsCreate)

      if (postsCreate.status !== 'loading') {
        yield put(postsActions.postsFeedGetRequest({ limit: 20 }))
      }

      return
    }

    /**
     * Fires when User.chatsWithUnviewedMessagesCount changes
     */
    if (type === 'USER_FOLLOWED_USERS_WITH_STORIES_CHANGED') {
      return yield put(usersActions.usersGetFollowedUsersWithStoriesRequest({}))
    }

    /**
     * Fires when one of the user's posts reaches COMPLETED state for the first time
     */
    if (type === 'POST_COMPLETED') {
      return yield put(subscriptionsActions.subscriptionsPostCompleted(payload))
    }

    /**
     * Fires when one of the user's posts reaches ERROR state
     */
    if (type === 'POST_ERROR') {
      return yield put(subscriptionsActions.subscriptionsPostError(payload))
    }
  })

  /**
   * Close channel subscription on application toggle
   */
  yield take(constants.SUBSCRIPTIONS_MAIN_IDLE)
  channel.close()
}

function* _subscriptionNotificationStart() {
  try {
    yield subscriptionNotificationStart()
  } catch (error) {
    // ignore
  }
}

export default _subscriptionNotificationStart
