import { call, put, take, takeEvery } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as usersActions from 'store/ducks/users/actions'
import * as chatQueries from 'store/ducks/chat/queries'
import * as chatActions from 'store/ducks/chat/actions'
import * as constants from 'store/ducks/subscriptions/constants'
import { createChannel } from 'store/ducks/subscriptions/saga/helpers'

/**
 *
 */
function* chatMessageSubscription() {
  const { channel, subscriptionState, userId } = yield call(createChannel, {
    query: chatQueries.onChatMessageNotification,
    identifier: 'onChatMessageNotification',
  })

  yield takeEvery(channel, function* ({ eventType, eventData }) {
    if (eventType === 'connect') {
      return yield call(subscriptionState.connectHandler, eventData)
    } else if (eventType === 'pending') {
      return yield call(subscriptionState.pendingHandler, eventData)
    } else if (eventType === 'disconnect') {
      return yield call(subscriptionState.disconnectHandler, eventData)
    }

    const data = path(['value', 'data', 'onChatMessageNotification'])(eventData)
    const chatId = path(['message', 'chat', 'chatId'])(data)

    yield put(chatActions.chatGetChatRequest({ chatId }))
    yield put(chatActions.chatGetChatsRequest())
    yield put(usersActions.usersGetProfileSelfRequest({ userId }))
  })

  /**
   * Close channel subscription on application toggle
   */
  yield take(constants.SUBSCRIPTIONS_MAIN_IDLE)
  channel.close()
}

function* _chatMessageSubscription() {
  try {
    yield chatMessageSubscription()
  } catch (error) {
    // ignore
  }
}

export default _chatMessageSubscription
