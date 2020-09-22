import { put, select } from 'redux-saga/effects'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as chatActions from 'store/ducks/chat/actions'
import * as authSelector from 'store/ducks/auth/selectors'

/**
 * main application state pre-loader
 * to be triggered when app just opened or switched background/foreground state
 */
function* appSubscription() {
  const userId = yield select(authSelector.authUserIdSelector)

  yield put(usersActions.usersGetCardsRequest({}))
  yield put(postsActions.postsFeedGetRequest({ limit: 20 }))
  yield put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
  yield put(usersActions.usersGetPendingFollowersRequest({ userId }))
  yield put(usersActions.usersGetFollowedUsersWithStoriesRequest({}))
  yield put(chatActions.chatGetChatsRequest({}))
}

export default appSubscription
