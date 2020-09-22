/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "createSaga"] }] */
import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import * as matchers from 'redux-saga-test-plan/matchers'
import cardSubscription from 'store/ducks/subscriptions/saga/card'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import { checkInternetConnection } from 'react-native-offline'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'

jest.mock('react-native-offline', () => ({ checkInternetConnection: jest.fn() }))

const AwsAPI = { graphql: jest.fn() }
const subscription = { subscribe: jest.fn(), unsubscribe: jest.fn() }
const unsubscribe = jest.fn()
const userId = 'user-id'
const store = { auth: { user: userId } }

checkInternetConnection.mockReturnValue(true)
subscription.subscribe.mockReturnValue({ _state: 'ready', unsubscribe })
AwsAPI.graphql.mockReturnValue(subscription)

const createSaga = (state) => {
  return expectSaga(cardSubscription)
    .provide([
      [getContext('AwsAPI'), AwsAPI],
      [matchers.call.fn(AwsAPI.graphql), subscription],
    ])
    .withState(state)
}

describe('cardSubscription', () => {
  afterEach(() => {
    AwsAPI.graphql.mockClear()
    subscription.subscribe.mockClear()
    checkInternetConnection.mockClear()
    unsubscribe.mockClear()
  })

  describe('Connection state', () => {
    const checkSuccess = (saga) => {
      saga.not.put(usersActions.usersGetCardsRequest({}))
      saga.not.put(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
      saga.not.put(usersActions.usersGetProfileSelfRequest({ userId }))
      saga.not.put(usersActions.usersGetPendingFollowersRequest({ userId }))

      return saga
    }

    it('connect', async () => {
      const saga = createSaga(store).put(subscriptionsActions.subscriptionsMainConnect({ data: 'onCardNotification' }))

      await checkSuccess(saga).silentRun()
    })

    it('pending', async () => {
      const saga = createSaga(store).put(subscriptionsActions.subscriptionsMainPending({ data: 'onCardNotification' }))

      await checkSuccess(saga).silentRun()
    })

    it('disconnect', async () => {
      subscription.subscribe.mockReturnValueOnce({ _state: 'closed' })

      const saga = createSaga(store).put(
        subscriptionsActions.subscriptionsMainDisconnect({ data: 'onCardNotification' }),
      )

      await checkSuccess(saga).silentRun()
    })
  })

  describe('Close channel', () => {
    it('on idle action', async () => {
      await createSaga(store)
        .put(subscriptionsActions.subscriptionsMainDisconnect({ data: 'onCardNotification' }))
        .dispatch(subscriptionsActions.subscriptionsMainIdle())
        .silentRun()

      expect(unsubscribe).toHaveBeenCalled()
    })

    it('on error event', () => {
      const promise = createSaga(store)
        .put(subscriptionsActions.subscriptionsMainDisconnect({ data: 'onCardNotification' }))
        .silentRun()

      const { error } = subscription.subscribe.mock.calls[0][0]
      error()

      expect(unsubscribe).toHaveBeenCalled()

      return promise
    })
  })

  describe('Backend events', () => {
    it('update posts on event', () => {
      const saga = createSaga(store)
        .put(usersActions.usersGetCardsRequest({}))
        .put(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
        .put(usersActions.usersGetProfileSelfRequest({ userId }))
        .put(usersActions.usersGetPendingFollowersRequest({ userId }))

      const promise = saga.silentRun()

      const { next } = subscription.subscribe.mock.calls[0][0]
      next()

      return promise
    })
  })
})
