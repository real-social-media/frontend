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
function* usersFollowRequestData(req, api) {
  const dataSelector = path(['data', 'followUser'])

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

function* usersFollowRequest(req) {
  try {
    yield call(usersCheckPermissions)
    const data = yield call([queryService, 'apiRequest'], queries.followUser, req.payload)
    const next = yield usersFollowRequestData(req, data)
    yield put(actions.usersFollowSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersFollowFailure(error, req.payload))
  }
}

export default () => [
  takeLatest(constants.USERS_FOLLOW_REQUEST, usersFollowRequest),
]
