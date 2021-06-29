import { put, call, takeLatest } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as constants from 'store/ducks/users/constants'
import * as actions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/users/queries'
import * as queryService from 'services/Query'
import * as normalizer from 'normalizer/schemas'
import { entitiesMerge } from 'store/ducks/entities/saga'

/**
 *
 */
function* usersImagePostsGetRequestData(response) {
  const dataSelector = path(['data', 'user', 'posts', 'items'])
  const data = dataSelector(response)
  const normalized = normalizer.normalizePostsGet(data)

  yield call(entitiesMerge, normalized)

  return normalized.result
}

function* usersImagePostsGetRequest(req) {
  try {
    const response = yield call([queryService, 'apiRequest'], queries.getImagePosts, req.payload)
    const data = yield usersImagePostsGetRequestData(response)
    yield put(actions.usersImagePostsGetSuccess({ data }))
  } catch (error) {
    yield put(actions.usersImagePostsGetFailure(error))
  }
}

export default () => [
  takeLatest(constants.USERS_IMAGE_POSTS_GET_REQUEST, usersImagePostsGetRequest),
]

