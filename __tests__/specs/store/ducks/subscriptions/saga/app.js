import { expectSaga } from 'redux-saga-test-plan'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as chatActions from 'store/ducks/chat/actions'
import appSubscription from 'store/ducks/subscriptions/saga/app'

const userId = 'userId'

const checkSuccess = (saga) => {
  return saga
    .put(usersActions.usersGetCardsRequest({}))
    .put(postsActions.postsFeedGetRequest({ limit: 20 }))
    .put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
    .put(usersActions.usersGetPendingFollowersRequest({ userId }))
    .put(usersActions.usersGetFollowedUsersWithStoriesRequest({}))
    .put(chatActions.chatGetChatsRequest({}))
}

describe('appSubscription', () => {
  it('prefetch data', async () => {
    const saga = expectSaga(appSubscription).withState({ auth: { user: userId } })

    await checkSuccess(saga).run()
  })
})
