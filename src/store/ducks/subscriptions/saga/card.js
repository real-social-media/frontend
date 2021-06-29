import * as Logger from 'services/Logger'
import { call, put, take, fork } from 'redux-saga/effects'
import * as authActions from 'store/ducks/auth/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as usersQueries from 'store/ducks/users/queries'
import * as constants from 'store/ducks/subscriptions/constants'
import { createChannel } from 'store/ducks/subscriptions/saga/helpers'
import path from 'ramda/src/path'

export function* handleEvent({ eventData, userId }) {
  const payload = path(['value', 'data', 'onCardNotification'], eventData)
  const eventType = path(['type'], payload)

  if (eventType === 'DELETED') return

  yield put(usersActions.usersGetCardsRequest())
  yield put(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
  yield put(authActions.authGetUserRequest())
  yield put(usersActions.usersGetPendingFollowersRequest({ userId }))
}

/**
 * Cards subscription channel
 */
function* cardSubscription() {
  while (true) {
    yield take(constants.SUBSCRIPTIONS_MAIN_REQUEST)

    try {
      const { channel, userId } = yield call(createChannel, {
        query: usersQueries.onCardNotification,
      })

      yield fork(function* eventListener() {
        while (true) {
          const { eventData } = yield take(channel)

          yield fork(handleEvent, { eventData, userId })
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

export default cardSubscription
