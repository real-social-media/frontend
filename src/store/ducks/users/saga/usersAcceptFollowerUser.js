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
function* usersAcceptFollowerUserRequestData(req, api) {
  const dataSelector = path(['data', 'acceptFollowerUser'])

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

function* usersAcceptFollowerUserRequest(req) {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.acceptFollowerUser, req.payload)
    const next = yield usersAcceptFollowerUserRequestData(req, data)
    yield put(actions.usersAcceptFollowerUserSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersAcceptFollowerUserFailure(error, req.payload))
  }
}

export default () => [
  takeLatest(constants.USERS_ACCEPT_FOLLOWER_USER_REQUEST, usersAcceptFollowerUserRequest),
]
