import { put, takeLatest, getContext } from 'redux-saga/effects'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import * as actions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/users/queries'
import * as constants from 'store/ducks/users/constants'
import * as queryService from 'services/Query'
import * as errors from 'store/ducks/users/errors'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as normalizer from 'normalizer/schemas'

/**
 *
 */
function* usersSearchRequestData(req, api) {
  const dataSelector = path(['data', 'searchUsers', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'searchUsers']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeUsersGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersSearchRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.searchUsers, req.payload)
    const next = yield usersSearchRequestData(req, data)
    yield put(actions.usersSearchSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersSearchFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersDeleteRequestData(req, api) {
  const dataSelector = path(['data', 'deleteUser'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersDeleteRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.deleteUser, req.payload)
    const next = yield usersDeleteRequestData(req, data)
    yield put(actions.usersDeleteSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersDeleteFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetFollowerUsersRequestData(req, api) {
  const dataSelector = path(['data', 'user', 'followerUsers', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'user', 'followerUsers']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeUsersGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersGetFollowerUsersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowerUsers, req.payload)
    const next = yield usersGetFollowerUsersRequestData(req, data)
    yield put(actions.usersGetFollowerUsersSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersGetFollowerUsersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetFollowedUsersRequestData(req, api) {
  const dataSelector = path(['data', 'user', 'followedUsers', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'user', 'followedUsers']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeUsersGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersGetFollowedUsersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowedUsers, req.payload)
    const next = yield usersGetFollowedUsersRequestData(req, data)
    yield put(actions.usersGetFollowedUsersSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersGetFollowedUsersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetPendingFollowersRequestData(req, api) {
  const dataSelector = path(['data', 'user', 'followerUsers', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'user', 'followerUsers']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeUsersGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersGetPendingFollowersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowerUsers, { ...req.payload, followStatus: 'REQUESTED' })
    const next = yield usersGetPendingFollowersRequestData(req, data)
    yield put(actions.usersGetPendingFollowersSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersGetPendingFollowersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetFollowedUsersWithStoriesRequestData(req, api) {
  const dataSelector = path(['data', 'self', 'followedUsersWithStories', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'self', 'followedUsersWithStories']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeUsersGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersGetFollowedUsersWithStoriesRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFollowedUsersWithStories, req.payload)
    const next = yield usersGetFollowedUsersWithStoriesRequestData(req, data)
    yield put(
      actions.usersGetFollowedUsersWithStoriesSuccess({ data: next.data, payload: next.payload, meta: next.meta }),
    )
  } catch (error) {
    yield put(actions.usersGetFollowedUsersWithStoriesFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersAcceptFollowerUserRequestData(req, api) {
  const dataSelector = path(['data', 'acceptFollowerUser'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersAcceptFollowerUserRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.acceptFollowerUser, req.payload)
    const next = yield usersAcceptFollowerUserRequestData(req, data)
    yield put(actions.usersAcceptFollowerUserSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersAcceptFollowerUserFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersDeclineFollowerUserRequestData(req, api) {
  const dataSelector = path(['data', 'denyFollowerUser'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersDeclineFollowerUserRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.denyFollowerUser, req.payload)
    const next = yield usersDeclineFollowerUserRequestData(req, data)
    yield put(actions.usersDeclineFollowerUserSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersDeclineFollowerUserFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetProfileRequestData(req, api) {
  const dataSelector = path(['data', 'user'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersGetProfileRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.user, req.payload)
    const next = yield usersGetProfileRequestData(req, data)
    yield put(actions.usersGetProfileSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersGetProfileFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetProfileSelfRequestData(req, api) {
  const dataSelector = path(['data', 'self'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersGetProfileSelfRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.self)
    const next = yield usersGetProfileSelfRequestData(req, data)
    yield put(actions.usersGetProfileSelfSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersGetProfileSelfFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersEditProfileRequestData(req, api) {
  const dataSelector = path(['data', 'setUserDetails'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersEditProfileRequest(req) {
  try {
    const data = yield queryService.apiRequest(queries.setUserDetails, req.payload)
    const next = yield usersEditProfileRequestData(req, data)
    yield put(actions.usersEditProfileSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    const errorMessage = path(['errors', '0', 'message'])(error)
    if (errorMessage && errorMessage.includes('is not verified')) {
      yield put(
        actions.usersEditProfileFailure({
          message: errors.getMessagePayload(constants.USERS_EDIT_PROFILE_FAILURE, 'VERIFICATION_FAILED'),
          payload: req.payload,
        }),
      )
    } else {
      yield put(
        actions.usersEditProfileFailure({
          message: errors.getMessagePayload(constants.USERS_EDIT_PROFILE_FAILURE, 'GENERIC', error.message),
          payload: req.payload,
        }),
      )
    }
  }
}

/**
 *
 */
function* usersFollowRequestData(req, api) {
  const dataSelector = path(['data', 'followUser'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersFollowRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.followUser, req.payload)
    const next = yield usersFollowRequestData(req, data)
    yield put(actions.usersFollowSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersFollowFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersUnfollowRequestData(req, api) {
  const dataSelector = path(['data', 'unfollowUser'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersUnfollowRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.unfollowUser, req.payload)
    const next = yield usersUnfollowRequestData(req, data)
    yield put(actions.usersUnfollowSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersUnfollowFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersBlockRequestData(req, api) {
  const dataSelector = path(['data', 'blockUser'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersBlockRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.blockUser, req.payload)
    const next = yield usersBlockRequestData(req, data)
    yield put(actions.usersBlockSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersBlockFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersUnblockRequestData(req, api) {
  const dataSelector = path(['data', 'unblockUser'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersUnblockRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.unblockUser, req.payload)
    const next = yield usersUnblockRequestData(req, data)
    yield put(actions.usersUnblockSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersUnblockFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersImagePostsGetRequestData(req, api) {
  const dataSelector = path(['data', 'user', 'posts', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'user', 'posts']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizePostsGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersImagePostsGetRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getImagePosts, req.payload)
    const next = yield usersImagePostsGetRequestData(req, data)
    yield put(actions.usersImagePostsGetSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersImagePostsGetFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersGetTrendingUsersRequestData(req, api) {
  const dataSelector = path(['data', 'trendingUsers', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'trendingUsers']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeUsersGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersGetTrendingUsersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.trendingUsers, req.payload)
    const next = yield usersGetTrendingUsersRequestData(req, data)
    yield put(actions.usersGetTrendingUsersSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
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
    const selector = path(['data', 'self', 'cards', 'items'])
    const metaSelector = compose(omit(['items']), path(['data', 'self', 'cards']))

    yield put(actions.usersGetCardsSuccess({ payload: req.payload, data: selector(data), meta: metaSelector(data) }))
  } catch (error) {
    yield put(actions.usersGetCardsFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersDeleteCardRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.deleteCard, req.payload)
    const selector = path(['data', 'deleteCard'])

    yield put(actions.usersDeleteCardSuccess({ payload: req.payload, data: selector(data), meta: {} }))
  } catch (error) {
    yield put(actions.usersDeleteCardFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* usersSetApnsTokenRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.setUserAPNSToken, req.payload)

    yield put(actions.usersSetApnsTokenSuccess({ payload: req.payload, data, meta: {} }))
  } catch (error) {
    yield put(actions.usersSetApnsTokenFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

export default () => [
  takeLatest(constants.USERS_SEARCH_REQUEST, usersSearchRequest),
  takeLatest(constants.USERS_DELETE_REQUEST, usersDeleteRequest),
  takeLatest(constants.USERS_GET_FOLLOWED_USERS_WITH_STORIES_REQUEST, usersGetFollowedUsersWithStoriesRequest),
  takeLatest(constants.USERS_GET_FOLLOWER_USERS_REQUEST, usersGetFollowerUsersRequest),
  takeLatest(constants.USERS_GET_FOLLOWED_USERS_REQUEST, usersGetFollowedUsersRequest),
  takeLatest(constants.USERS_GET_PENDING_FOLLOWERS_REQUEST, usersGetPendingFollowersRequest),
  takeLatest(constants.USERS_ACCEPT_FOLLOWER_USER_REQUEST, usersAcceptFollowerUserRequest),
  takeLatest(constants.USERS_DECLINE_FOLLOWER_USER_REQUEST, usersDeclineFollowerUserRequest),
  takeLatest(constants.USERS_FOLLOW_REQUEST, usersFollowRequest),
  takeLatest(constants.USERS_UNFOLLOW_REQUEST, usersUnfollowRequest),
  takeLatest(constants.USERS_BLOCK_REQUEST, usersBlockRequest),
  takeLatest(constants.USERS_UNBLOCK_REQUEST, usersUnblockRequest),
  takeLatest(constants.USERS_GET_PROFILE_REQUEST, usersGetProfileRequest),
  takeLatest(constants.USERS_GET_PROFILE_SELF_REQUEST, usersGetProfileSelfRequest),
  takeLatest(constants.USERS_EDIT_PROFILE_REQUEST, usersEditProfileRequest),
  takeLatest(constants.USERS_IMAGE_POSTS_GET_REQUEST, usersImagePostsGetRequest),
  takeLatest(constants.USERS_GET_TRENDING_USERS_REQUEST, usersGetTrendingUsersRequest),
  takeLatest(constants.USERS_GET_CARDS_REQUEST, usersGetCardsRequest),
  takeLatest(constants.USERS_DELETE_CARD_REQUEST, usersDeleteCardRequest),
  takeLatest(constants.USERS_SET_APNS_TOKEN_REQUEST, usersSetApnsTokenRequest),
]
