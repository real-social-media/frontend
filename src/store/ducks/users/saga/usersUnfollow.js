import { put, takeLatest, call } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as actions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/users/queries'
import * as constants from 'store/ducks/users/constants'
import * as queryService from 'services/Query'
import * as normalizer from 'normalizer/schemas'
import { entitiesMerge } from 'store/ducks/entities/saga'
import usersCheckPermissions from 'store/ducks/users/saga/usersCheckPermissions'

/**
 *
 */
function* usersUnfollowRequestData(req, api) {
  const dataSelector = path(['data', 'unfollowUser'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield call(entitiesMerge, normalized)

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersUnfollowRequest(req) {
  try {
    yield call(usersCheckPermissions)
    const data = yield call([queryService, 'apiRequest'], queries.unfollowUser, req.payload)
    const next = yield usersUnfollowRequestData(req, data)
    yield put(actions.usersUnfollowSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersUnfollowFailure(error, req.payload))
  }
}

export default () => [
  takeLatest(constants.USERS_UNFOLLOW_REQUEST, usersUnfollowRequest),
]
