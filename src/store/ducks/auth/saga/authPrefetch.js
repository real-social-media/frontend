import { put, call, select, take, race, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/auth/actions'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsConstants from 'store/ducks/posts/constants'
import * as usersActions from 'store/ducks/users/actions'
import * as usersConstants from 'store/ducks/users/constants'
import * as chatActions from 'store/ducks/chat/actions'
import * as authSelector from 'store/ducks/auth/selectors'

/**
 * Used sequential approach to load data in UI order
 */
function* handleAuthPrefetchAuthenticated() {
  const userId = yield select(authSelector.authUserIdSelector)

  /**
   * 1. Stories
   */
  yield put(usersActions.usersGetFollowedUsersWithStoriesRequest({}))
  yield race({
    storiesSuccess: take(usersConstants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_SUCCESS),
    storiesFailure: take(usersConstants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_FAILURE),
  })

  /**
   * 2. In-app notification cards
   */
  yield put(usersActions.usersGetCardsRequest({}))
  yield race({
    cardsSuccess: take(usersConstants.USERS_GET_CARDS_SUCCESS),
    cardsFailure: take(usersConstants.USERS_GET_CARDS_FAILURE),
  })

  /**
   * 3. Following feed
   */
  yield put(postsActions.postsFeedGetRequest({ limit: 20 }))
  yield race({
    cardsSuccess: take(postsConstants.POSTS_FEED_GET_SUCCESS),
    cardsFailure: take(postsConstants.POSTS_FEED_GET_FAILURE),
  })

  /**
   * Graphql Subscriptions trigger
   * Implement subscription await + offline cache
   * Should we implement success/failure check ?!
   */
  yield put(subscriptionsActions.subscriptionsMainRequest({ }))
  yield put(subscriptionsActions.subscriptionsPollRequest({ }))
  yield put(subscriptionsActions.subscriptionsPrefetchRequest({  }))

  /**
   * Data which is important to load but not belongs to home screen
   * Sequential approach wasn't used cuz some calls are expensive and not top priority
   */
  yield put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
  yield put(usersActions.usersGetPendingFollowersRequest({ userId }))
  yield put(chatActions.chatGetChatsRequest({}))

  return {
    meta: {
    },
    data: {
    },
  }
}

function* handleAuthPrefetchGuest() {
  /**
   * 1. Feed
   */
  yield put(postsActions.postsFeedGetRequest({ limit: 20 }))
  yield race({
    cardsSuccess: take(postsConstants.POSTS_FEED_GET_SUCCESS),
    cardsFailure: take(postsConstants.POSTS_FEED_GET_FAILURE),
  })

  /**
   * 2. In-app notification cards
   */
  yield put(usersActions.usersGetCardsRequest({}))
  yield race({
    cardsSuccess: take(usersConstants.USERS_GET_CARDS_SUCCESS),
    cardsFailure: take(usersConstants.USERS_GET_CARDS_FAILURE),
  })

  /**
   * Data which is important to load but not belongs to home screen
   * Sequential approach wasn't used cuz some calls are expensive and not top priority
   */
  yield put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))

  return {
    meta: {
    },
    data: {
    },
  }
}

/**
 * Used sequential approach to load data in UI order
 */
function* handleAuthPrefetchRequest() {
  const authenticationType = yield select(state => state.auth.authToken.meta.type)

  if (authenticationType === 'COGNITO_AUTHENTICATED') {
    yield call(handleAuthPrefetchAuthenticated)
  }

  if (authenticationType === 'COGNITO_GUEST') {
    yield call(handleAuthPrefetchGuest)
  }
}

/**
 * Fetching initial data such as feed/cards/trending
 */
function* authPrefetchRequest(req) {
  try {
    yield handleAuthPrefetchRequest(req.payload)
    yield put(actions.authPrefetchSuccess({
      message: errors.getMessagePayload(constants.AUTH_PREFETCH_SUCCESS, 'GENERIC'),
    }))
  } catch (error) {
    yield put(actions.authPrefetchFailure({
      message: errors.getMessagePayload(constants.AUTH_PREFETCH_FAILURE, 'GENERIC', error.message),
    }))
  }
}

export default () => [
  takeEvery(constants.AUTH_PREFETCH_REQUEST, authPrefetchRequest),
]