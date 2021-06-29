/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "createSaga"] }] */
import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import * as matchers from 'redux-saga-test-plan/matchers'
import notificationSubscription from 'store/ducks/subscriptions/saga/notifications'
import * as postsActions from 'store/ducks/posts/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import { sleep } from 'tests/utils'
import { makeAuthorizedState } from 'tests/utils/helpers'

const AwsAPI = { graphql: jest.fn() }
const subscription = { subscribe: jest.fn(), unsubscribe: jest.fn() }
const unsubscribe = jest.fn()
const store = makeAuthorizedState({ userId: '1' })

subscription.subscribe.mockReturnValue({ _state: 'ready', unsubscribe })
AwsAPI.graphql.mockReturnValue(subscription)

const createSaga = (state) => {
  return expectSaga(notificationSubscription)
    .provide([
      [getContext('AwsAPI'), AwsAPI],
      [matchers.call.fn(AwsAPI.graphql), subscription],
    ])
    .withState(state)
}

describe('notificationSubscription', () => {
  afterEach(() => {
    AwsAPI.graphql.mockClear()
    subscription.subscribe.mockClear()
    unsubscribe.mockClear()
  })

  describe('Backend events', () => {
    const userId = 1
    const applyAction = (event) => {
      const { next } = subscription.subscribe.mock.calls[0][0]
      next({ value: { data: { onNotification: event } } })
    }

    it('USER_CHATS_WITH_UNVIEWED_MESSAGES_COUNT_CHANGED', async () => {
      const promise = createSaga(store)
        .put(authActions.authGetUserRequest())
        .dispatch(subscriptionsActions.subscriptionsMainRequest())
        .silentRun()

      await sleep()
      applyAction({ type: 'USER_CHATS_WITH_UNVIEWED_MESSAGES_COUNT_CHANGED', userId })

      await promise
    })

    it('USER_FEED_CHANGED (refresh feed when uploading is not in progress)', async () => {
      const state = { ...store, posts: { postsCreate: { status: 'idle' } } }
      const promise = createSaga(state)
        .put(postsActions.postsFeedGetRequest({ limit: 20 }))
        .dispatch(subscriptionsActions.subscriptionsMainRequest())
        .silentRun()

      await sleep()
      applyAction({ type: 'USER_FEED_CHANGED', userId })

      await promise
    })

    it('USER_FEED_CHANGED (don`t refresh feed when uploading is in progress)', async () => {
      const state = { ...store, posts: { postsCreate: { status: 'loading' } } }
      const promise = createSaga(state)
        .not.put(postsActions.postsFeedGetRequest({ limit: 20 }))
        .dispatch(subscriptionsActions.subscriptionsMainRequest())
        .silentRun()

      await sleep()
      applyAction({ type: 'USER_FEED_CHANGED', userId })

      await promise
    })

    it('USER_FOLLOWED_USERS_WITH_STORIES_CHANGED', async () => {
      const promise = createSaga(store)
        .put(usersActions.usersGetFollowedUsersWithStoriesRequest({}))
        .dispatch(subscriptionsActions.subscriptionsMainRequest())
        .silentRun()

      await sleep()
      applyAction({ type: 'USER_FOLLOWED_USERS_WITH_STORIES_CHANGED', postId: 1 })

      await promise
    })

    it('POST_COMPLETED', async () => {
      const event = { type: 'POST_COMPLETED', postId: 1 }
      const promise = createSaga(store)
        .put(subscriptionsActions.subscriptionsPostCompleted(event))
        .dispatch(subscriptionsActions.subscriptionsMainRequest())
        .silentRun()

      await sleep()
      applyAction(event)

      await promise
    })

    it('POST_ERROR', async () => {
      const event = { type: 'POST_ERROR', postId: 1 }
      const promise = createSaga(store)
        .put(subscriptionsActions.subscriptionsPostError(event))
        .dispatch(subscriptionsActions.subscriptionsMainRequest())
        .silentRun()

      await sleep()
      applyAction(event)

      await promise
    })
  })
})
