/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "createSaga"] }] */
import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import * as matchers from 'redux-saga-test-plan/matchers'
import chatMessageSubscription from 'store/ducks/subscriptions/saga/chat'
import * as usersActions from 'store/ducks/users/actions'
import * as chatActions from 'store/ducks/chat/actions'
import { checkInternetConnection } from 'react-native-offline'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'

jest.mock('react-native-offline', () => ({ checkInternetConnection: jest.fn() }))

const AwsAPI = { graphql: jest.fn() }
const subscription = { subscribe: jest.fn(), unsubscribe: jest.fn() }
const unsubscribe = jest.fn()
const userId = 'user-id'
const store = { auth: { user: userId } }
const chatId = 'chatId'

checkInternetConnection.mockReturnValue(true)
subscription.subscribe.mockReturnValue({ _state: 'ready', unsubscribe })
AwsAPI.graphql.mockReturnValue(subscription)

const createSaga = (state) => {
  return expectSaga(chatMessageSubscription)
    .provide([
      [getContext('AwsAPI'), AwsAPI],
      [matchers.call.fn(AwsAPI.graphql), subscription],
    ])
    .withState(state)
}

describe('chatMessageSubscription', () => {
  afterEach(() => {
    AwsAPI.graphql.mockClear()
    subscription.subscribe.mockClear()
    checkInternetConnection.mockClear()
    unsubscribe.mockClear()
  })

  describe('Connection state', () => {
    const checkSuccess = (saga) => {
      saga.not.put(chatActions.chatGetChatRequest({ chatId }))
      saga.not.put(chatActions.chatGetChatsRequest())
      saga.not.put(usersActions.usersGetProfileSelfRequest({ userId }))

      return saga
    }

    it('connect', async () => {
      const saga = createSaga(store).put(
        subscriptionsActions.subscriptionsMainConnect({ data: 'onChatMessageNotification' }),
      )

      await checkSuccess(saga).silentRun()
    })

    it('pending', async () => {
      const saga = createSaga(store).put(
        subscriptionsActions.subscriptionsMainPending({ data: 'onChatMessageNotification' }),
      )

      await checkSuccess(saga).silentRun()
    })

    it('disconnect', async () => {
      subscription.subscribe.mockReturnValueOnce({ _state: 'closed' })

      const saga = createSaga(store).put(
        subscriptionsActions.subscriptionsMainDisconnect({ data: 'onChatMessageNotification' }),
      )

      await checkSuccess(saga).silentRun()
    })
  })

  describe('Close channel', () => {
    it('on idle action', async () => {
      await createSaga(store)
        .put(subscriptionsActions.subscriptionsMainDisconnect({ data: 'onChatMessageNotification' }))
        .dispatch(subscriptionsActions.subscriptionsMainIdle())
        .silentRun()

      expect(unsubscribe).toHaveBeenCalled()
    })

    it('on error event', () => {
      const promise = createSaga(store)
        .put(subscriptionsActions.subscriptionsMainDisconnect({ data: 'onChatMessageNotification' }))
        .silentRun()

      const { error } = subscription.subscribe.mock.calls[0][0]
      error()

      expect(unsubscribe).toHaveBeenCalled()

      return promise
    })
  })

  describe('Backend events', () => {
    it('update chats on event', () => {
      const saga = createSaga(store)
        .put(chatActions.chatGetChatRequest({ chatId }))
        .put(chatActions.chatGetChatsRequest())
        .put(usersActions.usersGetProfileSelfRequest({ userId }))

      const promise = saga.silentRun()

      const { next } = subscription.subscribe.mock.calls[0][0]
      next({ value: { data: { onChatMessageNotification: { message: { chat: { chatId } } } } } })

      return promise
    })
  })
})
