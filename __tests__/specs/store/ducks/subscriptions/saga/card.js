/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "createSaga"] }] */
import { expectSaga } from 'redux-saga-test-plan'
import { getContext } from 'redux-saga/effects'
import * as matchers from 'redux-saga-test-plan/matchers'
import cardSubscription from 'store/ducks/subscriptions/saga/card'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import { sleep } from 'tests/utils'
import { makeAuthorizedState } from 'tests/utils/helpers'

const AwsAPI = { graphql: jest.fn() }
const subscription = { subscribe: jest.fn(), unsubscribe: jest.fn() }
const unsubscribe = jest.fn()
const userId = 'user-id'
const store = makeAuthorizedState({ userId })

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

      return promise
    })
  })

  describe('Backend events', () => {
    it('update posts on event', async () => {
      const promise = createSaga(store)
        .put(usersActions.usersGetCardsRequest())
        .put(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
        .put(authActions.authGetUserRequest())
        .put(usersActions.usersGetPendingFollowersRequest({ userId }))

        .dispatch(subscriptionsActions.subscriptionsMainRequest())
        .silentRun()

      await sleep()

      const { next } = subscription.subscribe.mock.calls[0][0]
      next({ value: { data: { onCardNotification: { type: 'SOME_ACTION' } } } })

      return promise
    })
  })

  it('should not handle update data on DELETE profile event', async () => {
    const promise = createSaga(store)
      .not.put(usersActions.usersGetCardsRequest())
      .not.put(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
      .not.put(authActions.authGetUserRequest())
      .not.put(usersActions.usersGetPendingFollowersRequest({ userId }))

      .dispatch(subscriptionsActions.subscriptionsMainRequest())
      .silentRun()

    await sleep()

    const { next } = subscription.subscribe.mock.calls[0][0]
    next({ value: { data: { onCardNotification: { type: 'DELETED' } } } })

    return promise
  })
})
