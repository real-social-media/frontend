/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "createSaga"] }] */
import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import * as matchers from 'redux-saga-test-plan/matchers'
import subscriptionNotificationStart from 'store/ducks/subscriptions/saga/notifications'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import { checkInternetConnection } from 'react-native-offline'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'

const AwsAPI = { graphql: jest.fn() }
const subscription = { subscribe: jest.fn(), unsubscribe: jest.fn() }
const unsubscribe = jest.fn()
const store = { auth: { user: 'user-id' } }

checkInternetConnection.mockReturnValue(true)
subscription.subscribe.mockReturnValue({ _state: 'ready', unsubscribe })
AwsAPI.graphql.mockReturnValue(subscription)

const createSaga = (state) => {
  return expectSaga(subscriptionNotificationStart)
    .provide([
      [getContext('AwsAPI'), AwsAPI],
      [matchers.call.fn(AwsAPI.graphql), subscription],
    ])
    .withState(state)
}

describe('subscriptionNotificationStart', () => {
  afterEach(() => {
    AwsAPI.graphql.mockClear()
    subscription.subscribe.mockClear()
    checkInternetConnection.mockClear()
    unsubscribe.mockClear()
  })

  describe('Connection state', () => {
    it('connect', () => {
      return createSaga(store)
        .put(subscriptionsActions.subscriptionsMainConnect({ data: 'onNotification' }))
        .silentRun()
    })

    it('pending', () => {
      return createSaga(store)
        .put(subscriptionsActions.subscriptionsMainPending({ data: 'onNotification' }))
        .silentRun()
    })

    it('disconnect', () => {
      subscription.subscribe.mockReturnValueOnce({ _state: 'closed' })

      return createSaga(store)
        .put(subscriptionsActions.subscriptionsMainDisconnect({ data: 'onNotification' }))
        .silentRun()
    })
  })

  describe('Close channel', () => {
    it('on idle action', async () => {
      await createSaga(store)
        .put(subscriptionsActions.subscriptionsMainDisconnect({ data: 'onNotification' }))
        .dispatch(subscriptionsActions.subscriptionsMainIdle())
        .silentRun()

      expect(unsubscribe).toHaveBeenCalled()
    })

    it('on error event', () => {
      const promise = createSaga(store)
        .put(subscriptionsActions.subscriptionsMainDisconnect({ data: 'onNotification' }))
        .silentRun()

      const { error } = subscription.subscribe.mock.calls[0][0]
      error()

      expect(unsubscribe).toHaveBeenCalled()

      return promise
    })
  })

  describe('Backend events', () => {
    it('USER_CHATS_WITH_UNVIEWED_MESSAGES_COUNT_CHANGED', () => {
      const saga = createSaga(store)
      const userId = 1
      const event = { type: 'USER_CHATS_WITH_UNVIEWED_MESSAGES_COUNT_CHANGED', userId }

      saga.put(usersActions.usersGetProfileSelfRequest({ userId }))

      const promise = saga.silentRun()

      const { next } = subscription.subscribe.mock.calls[0][0]
      next({ value: { data: { onNotification: event } } })

      return promise
    })

    it('USER_FEED_CHANGED (refresh feed when uploading is not in progress)', () => {
      const state = { ...store, posts: { postsCreate: { status: 'idle' } } }
      const saga = createSaga(state)
      const userId = 1
      const event = { type: 'USER_FEED_CHANGED', userId }

      saga.put(postsActions.postsFeedGetRequest({ limit: 20 }))

      const promise = saga.silentRun()

      const { next } = subscription.subscribe.mock.calls[0][0]
      next({ value: { data: { onNotification: event } } })

      return promise
    })

    it('USER_FEED_CHANGED (don`t refresh feed when uploading is in progress)', () => {
      const state = { ...store, posts: { postsCreate: { status: 'loading' } } }
      const saga = createSaga(state)
      const userId = 1
      const event = { type: 'USER_FEED_CHANGED', userId }

      saga.not.put(postsActions.postsFeedGetRequest({ limit: 20 }))

      const promise = saga.silentRun()

      const { next } = subscription.subscribe.mock.calls[0][0]
      next({ value: { data: { onNotification: event } } })

      return promise
    })

    it('USER_FOLLOWED_USERS_WITH_STORIES_CHANGED', () => {
      const saga = createSaga(store)
      const event = { type: 'USER_FOLLOWED_USERS_WITH_STORIES_CHANGED', postId: 1 }

      saga.put(usersActions.usersGetFollowedUsersWithStoriesRequest({}))

      const promise = saga.silentRun()

      const { next } = subscription.subscribe.mock.calls[0][0]
      next({ value: { data: { onNotification: event } } })

      return promise
    })

    it('POST_COMPLETED', () => {
      const saga = createSaga(store)
      const event = { type: 'POST_COMPLETED', postId: 1 }

      saga.put(subscriptionsActions.subscriptionsPostCompleted(event))

      const promise = saga.silentRun()

      const { next } = subscription.subscribe.mock.calls[0][0]
      next({ value: { data: { onNotification: event } } })

      return promise
    })

    it('POST_ERROR', () => {
      const saga = createSaga(store)
      const event = { type: 'POST_ERROR', postId: 1 }

      saga.put(subscriptionsActions.subscriptionsPostError(event))

      const promise = saga.silentRun()

      const { next } = subscription.subscribe.mock.calls[0][0]
      next({ value: { data: { onNotification: event } } })

      return promise
    })
  })
})
