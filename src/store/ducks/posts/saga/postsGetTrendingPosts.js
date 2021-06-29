import { call, put, takeLatest, select } from 'redux-saga/effects'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import assocPath from 'ramda/src/assocPath'
import * as actions from 'store/ducks/posts/actions'
import * as queries from 'store/ducks/posts/queries'
import * as constants from 'store/ducks/posts/constants'
import * as queryService from 'services/Query'
import * as normalizer from 'normalizer/schemas'
import * as selectors from 'store/ducks/posts/selectors'
import { entitiesMerge } from 'store/ducks/entities/saga'
import { TRENDING_GALLERY } from 'constants/Gallery'

const { fetchLimit } = TRENDING_GALLERY

/**
 *
 */
export function* handlePostsGetTrendingPostsRequest(payload = {}, extraData = []) {
  const filters = yield select(selectors.postsGetTrendingPostsFilters)
  const api = yield call(queryService.apiRequest, queries.trendingPosts, { limit: fetchLimit, ...payload, ...filters })
  const dataSelector = path(['data', 'trendingPosts', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'trendingPosts']))

  const data = [...extraData, ...dataSelector(api)]
  const meta = metaSelector(api)

  if (data.length < fetchLimit && meta.nextToken) {
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
  yield call(entitiesMerge, normalized)

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

export function* postsGetTrendingPostsRequest(req) {
  try {
    const data = yield call(handlePostsGetTrendingPostsRequest, req.payload)
    const next = yield call(postsGetTrendingPostsRequestData, req, data)
    yield put(actions.postsGetTrendingPostsSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsGetTrendingPostsFailure(error))
  }
}

export function* postsGetTrendingPostsMoreRequest(req) {
  try {
    const data = yield handlePostsGetTrendingPostsRequest(req.payload)
    const next = yield postsGetTrendingPostsRequestData(req, data)
    yield put(actions.postsGetTrendingPostsMoreSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.postsGetTrendingPostsMoreFailure(error, req.payload))
  }
}

export default () => [
  takeLatest(constants.POSTS_GET_TRENDING_POSTS_REQUEST, postsGetTrendingPostsRequest),
  takeLatest(constants.POSTS_GET_TRENDING_POSTS_MORE_REQUEST, postsGetTrendingPostsMoreRequest),
]
