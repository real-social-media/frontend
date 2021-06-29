import * as Logger from 'services/Logger'
import { call, put, take, select, fork } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as postsActions from 'store/ducks/posts/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as usersQueries from 'store/ducks/users/queries'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as constants from 'store/ducks/subscriptions/constants'
import { createChannel } from 'store/ducks/subscriptions/saga/helpers'
import * as postsSelector from 'store/ducks/posts/selectors'

function* handleEvent({ eventData }) {
  const payload = path(['value', 'data', 'onNotification'], eventData)
  const type = path(['type'], payload)

  /**
   * Fires when one of the user's followeds changes their first story
   */
  if (type === 'USER_CHATS_WITH_UNVIEWED_MESSAGES_COUNT_CHANGED') {
    return yield put(authActions.authGetUserRequest())
  }

  /**
   * Fires when a post is added to User.feed
   */
  if (type === 'USER_FEED_CHANGED') {
    const postsCreate = yield select(postsSelector.postsCreate)

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
}

/**
 * New subscription that is used for various real-time updates
 */
function* notificationSubscription() {
  while (true) {
    yield take(constants.SUBSCRIPTIONS_MAIN_REQUEST)

    try {
      const { channel } = yield call(createChannel, {
        query: usersQueries.onNotification,
      })

      yield fork(function* eventListener() {
        while (true) {
          const event = yield take(channel)
          yield fork(handleEvent, event)
        }
      })

      /**
       * Close channel subscription on application toggle
       */
      yield take(constants.SUBSCRIPTIONS_MAIN_IDLE)
      channel.close()
    } catch (error) {
      Logger.captureException(error)
    }
  }
}

export default notificationSubscription
