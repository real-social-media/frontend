import { expectSaga } from 'redux-saga-test-plan'
import * as authActions from 'store/ducks/auth/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as chatActions from 'store/ducks/chat/actions'
import authPrefetch from 'store/ducks/auth/saga/authPrefetch'
import { testAsRootSaga, makeAuthorizedState } from 'tests/utils/helpers'

describe('Auth prefetch', () => {
  it('guest', async () => {
    const user = { userId: '1', userStatus: 'ANONYMOUS' }

    await expectSaga(testAsRootSaga(authPrefetch))
      .withState(makeAuthorizedState(user))

      .put(postsActions.postsFeedGetRequest())
      .put(postsActions.postsGetTrendingPostsRequest())
      .put(usersActions.usersGetCardsRequest())

      .not.put(usersActions.usersGetFollowedUsersWithStoriesRequest())
      .not.put(subscriptionsActions.subscriptionsMainRequest())
      .not.put(subscriptionsActions.subscriptionsPollRequest())
      .not.put(usersActions.usersGetPendingFollowersRequest({ userId: user.userId }))
      .not.put(chatActions.chatGetChatsRequest())
      .not.put(postsActions.postsGetUnreadCommentsRequest())
      .not.put(authActions.authGetUserRequest())

      .dispatch(authActions.authPrefetchRequest())
      .silentRun()
  })

  it('authorized', async () => {
    const user = { userId: '1', userStatus: 'ACTIVE' }

    await expectSaga(testAsRootSaga(authPrefetch))
      .withState(makeAuthorizedState(user))

      .put(postsActions.postsFeedGetRequest())
      .put(postsActions.postsGetTrendingPostsRequest())
      .put(usersActions.usersGetCardsRequest())

      .put(usersActions.usersGetFollowedUsersWithStoriesRequest())
      .put(subscriptionsActions.subscriptionsMainRequest())
      .put(subscriptionsActions.subscriptionsPollRequest())
      .put(usersActions.usersGetPendingFollowersRequest({ userId: user.userId }))
      .put(chatActions.chatGetChatsRequest())
      .put(postsActions.postsGetUnreadCommentsRequest())
      .put(authActions.authGetUserRequest())

      .dispatch(authActions.authPrefetchRequest())
      .silentRun()
  })
})
