/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "createSaga"] }] */
import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import * as matchers from 'redux-saga-test-plan/matchers'
import chatMessageSubscription from 'store/ducks/subscriptions/saga/chat'
import * as authActions from 'store/ducks/auth/actions'
import * as chatActions from 'store/ducks/chat/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import { sleep } from 'tests/utils'
import { makeAuthorizedState } from 'tests/utils/helpers'

const AwsAPI = { graphql: jest.fn() }
const subscription = { subscribe: jest.fn(), unsubscribe: jest.fn() }
const unsubscribe = jest.fn()
const userId = 'user-id'
const store = makeAuthorizedState({ userId })
const chatId = 'chatId'

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
    unsubscribe.mockClear()
  })

  describe('Close channel', () => {
    it('on idle action', async () => {
      await createSaga(store)
        .dispatch(subscriptionsActions.subscriptionsMainRequest())
        .dispatch(subscriptionsActions.subscriptionsMainIdle())
        .silentRun()

      expect(unsubscribe).toHaveBeenCalled()
    })

    it('on error event', async () => {
      const promise = createSaga(store).dispatch(subscriptionsActions.subscriptionsMainRequest()).silentRun()
      await sleep()

      const { error } = subscription.subscribe.mock.calls[0][0]
      error()

      expect(unsubscribe).toHaveBeenCalled()

      await promise
    })
  })

  describe('Backend events', () => {
    it('update chats on event', async () => {
      const promise = createSaga(store)
        .put(chatActions.chatGetChatRequest({ chatId }))
        .put(chatActions.chatGetChatsRequest())
        .put(authActions.authGetUserRequest())

        .dispatch(subscriptionsActions.subscriptionsMainRequest())
        .silentRun()

      await sleep()

      const { next } = subscription.subscribe.mock.calls[0][0]
      next({ value: { data: { onChatMessageNotification: { message: { chat: { chatId } } } } } })

      return promise
    })
  })
})
