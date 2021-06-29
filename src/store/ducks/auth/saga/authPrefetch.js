import { put, call, select, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as chatActions from 'store/ducks/chat/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as UserService from 'services/User'

function* handleAuthPrefetchCommon() {
  /**
   * 1. Feed
   */
  yield put(postsActions.postsFeedGetRequest())

  /**
   * 2. Trending
   */
  yield put(postsActions.postsGetTrendingPostsRequest())

  /**
   * 3. In-app notification cards
   */
  yield put(usersActions.usersGetCardsRequest())
}

/**
 * Used sequential approach to load data in UI order
 */
function* handleAuthPrefetchAuthenticated(user) {
  /**
   * 1. Common
   */
  yield call(handleAuthPrefetchCommon)

  /**
   * 2. Stories
   */
  yield put(usersActions.usersGetFollowedUsersWithStoriesRequest())

  /**
   * Graphql Subscriptions trigger
   * Implement subscription await + offline cache
   * Should we implement success/failure check ?!
   */
  yield put(subscriptionsActions.subscriptionsMainRequest())
  yield put(subscriptionsActions.subscriptionsPollRequest())

  /**
   * Data which is important to load but not belongs to home screen
   * Sequential approach wasn't used cuz some calls are expensive and not top priority
   */
  yield put(usersActions.usersGetPendingFollowersRequest({ userId: user.userId }))
  yield put(chatActions.chatGetChatsRequest())
  yield put(postsActions.postsGetUnreadCommentsRequest())
  yield put(authActions.authGetUserRequest())
}

/**
 * Used sequential approach to load data in UI order
 */
function* handleAuthPrefetchRequest() {
  const user = yield select(authSelector.authUser)

  if (UserService.isUserActive(user)) {
    yield call(handleAuthPrefetchAuthenticated, user)
  } else {
    yield call(handleAuthPrefetchCommon)
  }
}

/**
 * Fetching initial data such as feed/cards/trending
 */
function* authPrefetchRequest(req) {
  try {
    yield handleAuthPrefetchRequest(req.payload)
    yield put(actions.authPrefetchSuccess())
  } catch (error) {
    yield put(actions.authPrefetchFailure(error))
  }
}

export default () => [
  takeEvery(constants.AUTH_PREFETCH_REQUEST, authPrefetchRequest),
]
