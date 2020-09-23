import { call, put, takeLatest, getContext } from 'redux-saga/effects'
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
export function* handlePostsGetTrendingPostsRequest(payload = {}, extraData = []) {
  const api = yield call(queryService.apiRequest, queries.trendingPosts, payload)
  const dataSelector = path(['data', 'trendingPosts', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'trendingPosts']))
  
  const data = [...extraData, ...dataSelector(api)]
  const meta = metaSelector(api)

  if (data.length < 60 && meta.nextToken) {
    return yield call(handlePostsGetTrendingPostsRequest, { ...payload, ...meta }, data)
  }

  return assocPath(['data', 'trendingPosts', 'items'], data)(api)
}

export function* postsGetTrendingPostsRequestData(req, api) {
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

export function* postsGetTrendingPostsRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield call(handlePostsGetTrendingPostsRequest, req.payload)
    const next = yield call(postsGetTrendingPostsRequestData, req, data)
    yield put(actions.postsGetTrendingPostsSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsGetTrendingPostsFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

export function* postsGetTrendingPostsMoreRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield handlePostsGetTrendingPostsRequest(req.payload)
    const next = yield postsGetTrendingPostsRequestData(req, data)
    yield put(actions.postsGetTrendingPostsMoreSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsGetTrendingPostsMoreFailure({ message: errorWrapper(error), payload: req.payload }))
  }
}

export default () => [
  takeLatest(constants.POSTS_GET_TRENDING_POSTS_REQUEST, postsGetTrendingPostsRequest),
  takeLatest(constants.POSTS_GET_TRENDING_POSTS_MORE_REQUEST, postsGetTrendingPostsMoreRequest),
]