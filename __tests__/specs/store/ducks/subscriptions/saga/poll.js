import { expectSaga } from 'redux-saga-test-plan'
import * as postsActions from 'store/ducks/posts/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import subscriptionPollStart from 'store/ducks/subscriptions/saga/poll'

jest.useFakeTimers()
jest.mock('react-native-offline', () => ({ checkInternetConnection: jest.fn() }))

describe('subscriptionPollStart', () => {
  it('update trending page every 30 minutes', async () => {
    const promise = expectSaga(subscriptionPollStart)
      .put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
      .silentRun()

    jest.runTimersToTime(30 * 60000)

    return promise
  })

  it('close channel on idle action', async () => {
    const saga = expectSaga(subscriptionPollStart)
      .not.put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
      .dispatch(subscriptionsActions.subscriptionsPollIdle())

    const promise = saga.silentRun()

    setTimeout(() => {
      jest.runTimersToTime(30 * 60000)
    }, 0)

    return promise
  })
})
