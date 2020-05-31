import { graphqlOperation } from '@aws-amplify/api'
import { call, put, takeLatest, getContext, takeEvery } from 'redux-saga/effects'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import * as actions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/users/queries'
import * as constants from 'store/ducks/users/constants'
import * as queryService from 'services/Query'
import * as errors from 'store/ducks/users/errors'

/**
 *
 */
function* usersSearchRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.searchUsers, req.payload)
    const selector = path(['data', 'searchUsers', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'searchUsers']))

    yield put(actions.usersSearchSuccess({ payload: req.payload, data: selector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.usersSearchFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetFollowerUsersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowerUsers, req.payload)
    const selector = path(['data', 'user', 'followerUsers', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'user', 'followerUsers']))

    yield put(actions.usersGetFollowerUsersSuccess({ payload: req.payload, data: selector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.usersGetFollowerUsersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetFollowedUsersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowedUsers, req.payload)
    const selector = path(['data', 'user', 'followedUsers', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'user', 'followedUsers']))

    yield put(actions.usersGetFollowedUsersSuccess({ payload: req.payload, data: selector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.usersGetFollowedUsersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetPendingFollowersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowerUsers, { ...req.payload, followStatus: 'REQUESTED' })
    const selector = path(['data', 'user', 'followerUsers', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'user', 'followerUsers']))

    yield put(actions.usersGetPendingFollowersSuccess({ payload: req.payload, data: selector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.usersGetPendingFollowersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetFollowedUsersWithStoriesRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowedUsersWithStories, req.payload)
    const selector = path(['data', 'self', 'followedUsersWithStories', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'self', 'followedUsersWithStories']))

    yield put(actions.usersGetFollowedUsersWithStoriesSuccess({ payload: req.payload, data: selector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.usersGetFollowedUsersWithStoriesFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersAcceptFollowerUserRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.acceptFollowerUser, req.payload))
    const selector = path(['data', 'acceptFollowerUser'])
    const meta = {}

    yield put(actions.usersAcceptFollowerUserSuccess({ payload: req.payload, data: selector(data), meta }))
  } catch (error) {
    yield put(actions.usersAcceptFollowerUserFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersDeclineFollowerUserRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.denyFollowerUser, req.payload))
    const selector = path(['data', 'denyFollowerUser'])
    const meta = {}

    yield put(actions.usersDeclineFollowerUserSuccess({ payload: req.payload, data: selector(data), meta }))
  } catch (error) {
    yield put(actions.usersDeclineFollowerUserFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetProfileRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.user, req.payload)
    const selector = path(['data', 'user'])
    const meta = {}

    yield put(actions.usersGetProfileSuccess({ payload: req.payload, data: selector(data), meta }))
  } catch (error) {
    yield put(actions.usersGetProfileFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetProfileSelfRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.self)
    const selector = path(['data', 'self'])
    const meta = {}

    yield put(actions.usersGetProfileSelfSuccess({ payload: req.payload, data: selector(data), meta }))
    yield put(actions.globalAuthUserTrigger({ data: selector(data) }))
  } catch (error) {
    yield put(actions.usersGetProfileSelfFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersEditProfileRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.setUserDetails, req.payload)
    const selector = path(['data', 'setUserDetails'])
    const meta = {}

    yield put(actions.usersEditProfileSuccess({ payload: req.payload, data: selector(data), meta }))
    yield put(actions.globalAuthUserTrigger({ payload: req.payload, data: selector(data), meta }))
  } catch (error) {
    const errorMessage = path(['errors', '0', 'message'])(error)
    if (errorMessage && errorMessage.includes('is not verified')) {
      yield put(actions.usersEditProfileFailure({
        message: errors.getMessagePayload(constants.USERS_EDIT_PROFILE_FAILURE, 'VERIFICATION_FAILED'),
        payload: req.payload,
      }))
    } else {
      yield put(actions.usersEditProfileFailure({
        message: errors.getMessagePayload(constants.USERS_EDIT_PROFILE_FAILURE, 'GENERIC', error.message),
        payload: req.payload,
      }))
    }
  }
}

/**
 *
 */
function* usersFollowRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.followUser, req.payload))
    const selector = path(['data', 'followUser'])
    const meta = {}

    yield put(actions.usersFollowSuccess({ payload: req.payload, data: selector(data), meta }))
  } catch (error) {
    yield put(actions.usersFollowFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersUnfollowRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.unfollowUser, req.payload))
    const selector = path(['data', 'unfollowUser'])
    const meta = {}

    yield put(actions.usersUnfollowSuccess({ payload: req.payload, data: selector(data), meta }))
  } catch (error) {
    yield put(actions.usersUnfollowFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersBlockRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.blockUser, req.payload))
    const selector = path(['data', 'blockUser'])
    const meta = {}

    yield put(actions.usersBlockSuccess({ payload: req.payload, data: selector(data), meta }))
  } catch (error) {
    yield put(actions.usersBlockFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersUnblockRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(() => queryService.apiRequest(queries.unblockUser, req.payload))
    const selector = path(['data', 'unblockUser'])
    const meta = {}

    yield put(actions.usersUnblockSuccess({ payload: req.payload, data: selector(data), meta }))
  } catch (error) {
    yield put(actions.usersUnblockFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersImagePostsGetRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getImagePosts, req.payload)
    const selector = path(['data', 'user', 'posts', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'user', 'posts']))

    yield put(actions.usersImagePostsGetSuccess({ payload: req.payload, data: selector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.usersImagePostsGetFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetTrendingUsersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.trendingUsers, req.payload)
    const selector = path(['data', 'trendingUsers', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'user', 'posts']))

    yield put(actions.usersGetTrendingUsersSuccess({ payload: req.payload, data: selector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.usersGetTrendingUsersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetCardsRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getCards, req.payload)
    console.log(data)
    const selector = path(['data', 'self', 'cards', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'self', 'cards']))

    yield put(actions.usersGetCardsSuccess({ payload: req.payload, data: selector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.usersGetCardsFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

export default () => [
  takeEvery(constants.USERS_SEARCH_REQUEST, usersSearchRequest),
  takeLatest(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_REQUEST, usersGetFollowedUsersWithStoriesRequest),
  takeEvery(constants.USERS_GET_FOLLOWER_USERS_REQUEST, usersGetFollowerUsersRequest),
  takeEvery(constants.USERS_GET_FOLLOWED_USERS_REQUEST, usersGetFollowedUsersRequest),
  takeLatest(constants.USERS_GET_PENDING_FOLLOWERS_REQUEST, usersGetPendingFollowersRequest),
  takeEvery(constants.USERS_ACCEPT_FOLLOWER_USER_REQUEST, usersAcceptFollowerUserRequest),
  takeEvery(constants.USERS_DECLINE_FOLLOWER_USER_REQUEST, usersDeclineFollowerUserRequest),
  takeEvery(constants.USERS_FOLLOW_REQUEST, usersFollowRequest),
  takeEvery(constants.USERS_UNFOLLOW_REQUEST, usersUnfollowRequest),
  takeEvery(constants.USERS_BLOCK_REQUEST, usersBlockRequest),
  takeEvery(constants.USERS_UNBLOCK_REQUEST, usersUnblockRequest),
  takeEvery(constants.USERS_GET_PROFILE_REQUEST, usersGetProfileRequest),
  takeEvery(constants.USERS_GET_PROFILE_SELF_REQUEST, usersGetProfileSelfRequest),
  takeLatest(constants.USERS_EDIT_PROFILE_REQUEST, usersEditProfileRequest),
  takeLatest(constants.USERS_IMAGE_POSTS_GET_REQUEST, usersImagePostsGetRequest),
  takeEvery(constants.USERS_GET_TRENDING_USERS_REQUEST, usersGetTrendingUsersRequest),
  takeLatest(constants.USERS_GET_CARDS_REQUEST, usersGetCardsRequest),
]