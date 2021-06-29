import * as Logger from 'services/Logger'
import { call, put, take, fork } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as authActions from 'store/ducks/auth/actions'
import * as chatQueries from 'store/ducks/chat/queries'
import * as chatActions from 'store/ducks/chat/actions'
import * as constants from 'store/ducks/subscriptions/constants'
import { createChannel } from 'store/ducks/subscriptions/saga/helpers'

/**
 *
 */
function* chatMessageSubscription() {
  while (true) {
    yield take(constants.SUBSCRIPTIONS_MAIN_REQUEST)

    try {
      const { channel } = yield call(createChannel, {
        query: chatQueries.onChatMessageNotification,
      })

      yield fork(function* eventListener() {
        while (true) {
          const event = yield take(channel)

          yield fork(function* ({ eventData }) {
            const data = path(['value', 'data', 'onChatMessageNotification'])(eventData)
            const chatId = path(['message', 'chat', 'chatId'])(data)

            yield put(chatActions.chatGetChatRequest({ chatId }))
            yield put(chatActions.chatGetChatsRequest())
            yield put(authActions.authGetUserRequest())
          }, event)
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

export default chatMessageSubscription
