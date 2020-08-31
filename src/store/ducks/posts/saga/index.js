import { put, takeLatest, getContext } from 'redux-saga/effects'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import assocPath from 'ramda/src/assocPath'
import * as actions from 'store/ducks/posts/actions'
import * as queries from 'store/ducks/posts/queries'
import * as constants from 'store/ducks/posts/constants'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as queryService from 'services/Query'
import * as normalizer from 'normalizer/schemas'

/**
 *
 */
function* postsGetRequestData(req, api) {
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

function* postsGetRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getPosts, { ...req.payload, postStatus: 'COMPLETED' })
    const next = yield postsGetRequestData(req, data)
    yield put(actions.postsGetSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsGetFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

function* postsGetMoreRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getPosts, { ...req.payload, postStatus: 'COMPLETED' })
    const next = yield postsGetRequestData(req, data)
    yield put(actions.postsGetMoreSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsGetMoreFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* postsGetUnreadCommentsRequestData(req, api) {
  const dataSelector = path(['data', 'self', 'postsWithUnviewedComments', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'self', 'postsWithUnviewedComments']))

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

function* postsGetUnreadCommentsRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getPostsUnreadComments, req.payload)
    const next = yield postsGetUnreadCommentsRequestData(req, data)
    yield put(actions.postsGetUnreadCommentsSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsGetUnreadCommentsFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* postsViewsGetRequestData(req, api) {
  const dataSelector = path(['data', 'post', 'viewedBy', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'post', 'viewedBy']))

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

function* postsViewsGetRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.viewedBy, req.payload)
    const next = yield postsViewsGetRequestData(req, data)
    yield put(actions.postsViewsGetSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsViewsGetFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

function* postsViewsGetMoreRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.viewedBy, req.payload)
    const next = yield postsViewsGetRequestData(req, data)
    yield put(actions.postsViewsGetMoreSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsViewsGetMoreFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* postsLikesGetRequestData(req, api) {
  const dataSelector = path(['data', 'post', 'onymouslyLikedBy', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'post', 'onymouslyLikedBy']))

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

function* postsLikesGetRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.onymouslyLikedBy, req.payload)
    const next = yield postsLikesGetRequestData(req, data)
    yield put(actions.postsLikesGetSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsLikesGetFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

/**
 *
 */
function* postsFeedGetRequestData(req, api) {
  const dataSelector = path(['data', 'self', 'feed', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'self', 'feed']))

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

function* postsFeedGetRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFeed, req.payload)
    const next = yield postsFeedGetRequestData(req, data)
    yield put(actions.postsFeedGetSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsFeedGetFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

function* postsFeedGetMoreRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getFeed, req.payload)
    const next = yield postsFeedGetRequestData(req, data)
    yield put(actions.postsFeedGetMoreSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsFeedGetMoreFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsGetArchivedRequestData(req, api) {
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

function* postsGetArchivedRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getPosts, { ...req.payload, postStatus: 'ARCHIVED' })
    const next = yield postsGetArchivedRequestData(req, data)
    yield put(actions.postsGetArchivedSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsGetArchivedFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* handlePostsEditRequest(payload) {
  yield queryService.apiRequest(queries.editPostExpiresAt, payload)
  yield queryService.apiRequest(queries.editPostAlbum, payload)
  return yield queryService.apiRequest(queries.editPost, payload)
}

function* postsEditRequestData(req, api) {
  const dataSelector = path(['data', 'editPost'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizePostGet(data)
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

function* postsEditRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield handlePostsEditRequest(req.payload)
    const next = yield postsEditRequestData(req, data)
    yield put(actions.postsEditSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsEditFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsDeleteRequestData(req, api) {
  const dataSelector = path(['data', 'deletePost'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizePostGet(data)
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

function* postsDeleteRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.deletePost, req.payload)
    const next = yield postsDeleteRequestData(req, data)
    yield put(actions.postsDeleteSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsDeleteFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsArchiveRequestData(req, api) {
  const dataSelector = path(['data', 'archivePost'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizePostGet(data)
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

function* postsArchiveRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.archivePost, req.payload)
    const next = yield postsArchiveRequestData(req, data)
    yield put(actions.postsArchiveSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsArchiveFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsRestoreArchivedRequestData(req, api) {
  const dataSelector = path(['data', 'restoreArchivedPost'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizePostGet(data)
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

function* postsRestoreArchivedRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.restoreArchivedPost, req.payload)
    const next = yield postsRestoreArchivedRequestData(req, data)
    yield put(actions.postsRestoreArchivedSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsRestoreArchivedFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsFlagRequestData(req, api) {
  const dataSelector = path(['data', 'flagPost'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizePostGet(data)
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

function* postsFlagRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.flagPost, req.payload)
    const next = yield postsFlagRequestData(req, data)
    yield put(actions.postsFlagSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsFlagFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsSingleGetRequestData(req, api) {
  const dataSelector = path(['data', 'post'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizePostGet(data)
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

function* postsSingleGetRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.getPost, req.payload)
    const next = yield postsSingleGetRequestData(req, data)
    yield put(actions.postsSingleGetSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsSingleGetFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsOnymouslyLikeRequestData(req, api) {
  const dataSelector = path(['data', 'onymouslyLikePost'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizePostGet(data)
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

function* postsOnymouslyLikeRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.onymouslyLikePost, req.payload)
    const next = yield postsOnymouslyLikeRequestData(req, data)
    yield put(actions.postsOnymouslyLikeSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsOnymouslyLikeFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsDislikeRequestData(req, api) {
  const dataSelector = path(['data', 'dislikePost'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizePostGet(data)
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

function* postsDislikeRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.dislikePost, req.payload)
    const next = yield postsDislikeRequestData(req, data)
    yield put(actions.postsDislikeSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsDislikeFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* handlePostsGetTrendingPostsRequest(payload, extraData = []) {
  const api = yield queryService.apiRequest(queries.trendingPosts, { ...payload, viewedStatus: 'NOT_VIEWED' })
  const dataSelector = path(['data', 'trendingPosts', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'trendingPosts']))

  const data = [...extraData, ...dataSelector(api)]
  const meta = metaSelector(api)

  if (data.length < 60 && meta.nextToken) {
    return yield handlePostsGetTrendingPostsRequest({ ...payload, ...meta }, data)
  }

  return assocPath(['data', 'trendingPosts', 'items'], data)(api)
}

function* postsGetTrendingPostsRequestData(req, api) {
  const dataSelector = path(['data', 'trendingPosts', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'trendingPosts']))

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

function* postsGetTrendingPostsRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield handlePostsGetTrendingPostsRequest(req.payload)
    const next = yield postsGetTrendingPostsRequestData(req, data)
    yield put(actions.postsGetTrendingPostsSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsGetTrendingPostsFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

function* postsGetTrendingPostsMoreRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield handlePostsGetTrendingPostsRequest(req.payload)
    const next = yield postsGetTrendingPostsRequestData(req, data)
    yield put(actions.postsGetTrendingPostsMoreSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsGetTrendingPostsMoreFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* postsCommentsGetRequestData(req, api) {
  const dataSelector = path(['data', 'post', 'comments', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'post', 'comments']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeCommentsGet(data)
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

function* postsCommentsGetRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.comments, req.payload)
    const next = yield postsCommentsGetRequestData(req, data)
    yield put(actions.postsCommentsGetSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsCommentsGetFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* commentsAddRequestData(req, api) {
  const dataSelector = path(['data', 'addComment'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeCommentGet(data)
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

function* commentsAddRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.addComment, req.payload)
    const next = yield commentsAddRequestData(req, data)
    yield put(actions.commentsAddSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.commentsAddFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

/**
 *
 */
function* commentsDeleteRequestData(req, api) {
  const dataSelector = path(['data', 'deleteComment'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeCommentGet(data)
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

function* commentsDeleteRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.deleteComment, req.payload)
    const next = yield commentsDeleteRequestData(req, data)
    yield put(actions.commentsDeleteSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.commentsDeleteFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

function* commentsFlagRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.flagComment, req.payload)
    const selector = path(['data', 'flagComment'])
    const meta = {}

    yield put(actions.commentsFlagSuccess({ data: selector(data), payload: req.payload, meta }))
  } catch (error) {
    yield put(actions.commentsFlagFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

export default () => [
  takeLatest(constants.POSTS_GET_REQUEST, postsGetRequest),
  takeLatest(constants.POSTS_GET_MORE_REQUEST, postsGetMoreRequest),
  takeLatest(constants.POSTS_GET_UNREAD_COMMENTS_REQUEST, postsGetUnreadCommentsRequest),

  takeLatest(constants.POSTS_VIEWS_GET_REQUEST, postsViewsGetRequest),
  takeLatest(constants.POSTS_VIEWS_GET_MORE_REQUEST, postsViewsGetMoreRequest),

  takeLatest(constants.POSTS_FEED_GET_REQUEST, postsFeedGetRequest),
  takeLatest(constants.POSTS_FEED_GET_MORE_REQUEST, postsFeedGetMoreRequest),

  takeLatest(constants.POSTS_LIKES_GET_REQUEST, postsLikesGetRequest),
  takeLatest(constants.POSTS_GET_ARCHIVED_REQUEST, postsGetArchivedRequest),
  takeLatest(constants.POSTS_EDIT_REQUEST, postsEditRequest),
  takeLatest(constants.POSTS_DELETE_REQUEST, postsDeleteRequest),

  takeLatest(constants.POSTS_ARCHIVE_REQUEST, postsArchiveRequest),
  takeLatest(constants.POSTS_RESTORE_ARCHIVED_REQUEST, postsRestoreArchivedRequest),

  takeLatest(constants.POSTS_FLAG_REQUEST, postsFlagRequest),
  takeLatest(constants.POSTS_SINGLE_GET_REQUEST, postsSingleGetRequest),

  takeLatest(constants.POSTS_ONYMOUSLY_LIKE_REQUEST, postsOnymouslyLikeRequest),
  takeLatest(constants.POSTS_DISLIKE_REQUEST, postsDislikeRequest),

  takeLatest(constants.POSTS_GET_TRENDING_POSTS_REQUEST, postsGetTrendingPostsRequest),
  takeLatest(constants.POSTS_GET_TRENDING_POSTS_MORE_REQUEST, postsGetTrendingPostsMoreRequest),

  takeLatest(constants.POSTS_COMMENTS_GET_REQUEST, postsCommentsGetRequest),
  takeLatest(constants.COMMENTS_ADD_REQUEST, commentsAddRequest),
  takeLatest(constants.COMMENTS_DELETE_REQUEST, commentsDeleteRequest),
  takeLatest(constants.COMMENTS_FLAG_REQUEST, commentsFlagRequest),
]
