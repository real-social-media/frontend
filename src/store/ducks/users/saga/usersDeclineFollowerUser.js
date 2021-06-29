import { put, takeLatest, call } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as actions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/users/queries'
import * as constants from 'store/ducks/users/constants'
import * as queryService from 'services/Query'
import * as normalizer from 'normalizer/schemas'
import { entitiesMerge } from 'store/ducks/entities/saga'

/**
 *
 */
function* usersDeclineFollowerUserRequestData(req, api) {
  const dataSelector = path(['data', 'denyFollowerUser'])

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

function* usersDeclineFollowerUserRequest(req) {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.denyFollowerUser, req.payload)
    const next = yield usersDeclineFollowerUserRequestData(req, data)
    yield put(actions.usersDeclineFollowerUserSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersDeclineFollowerUserFailure(error, req.payload))
  }
}

export default () => [
  takeLatest(constants.USERS_DECLINE_FOLLOWER_USER_REQUEST, usersDeclineFollowerUserRequest),
]
