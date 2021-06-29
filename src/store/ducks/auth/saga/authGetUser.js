import { put, call, takeEvery } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as constants from 'store/ducks/auth/constants'
import * as actions from 'store/ducks/auth/actions'
import * as queries from 'store/ducks/auth/queries'
import * as queryService from 'services/Query'
import * as normalizer from 'normalizer/schemas'
import { entitiesMerge } from 'store/ducks/entities/saga'

/**
 *
 */
function* authGetUserRequestData(api) {
  const dataSelector = path(['data', 'self'])
  const data = dataSelector(api)
  const normalized = normalizer.normalizeUserGet(data)

  yield call(entitiesMerge, normalized)

  return {
    data: normalized.result,
  }
}

function* authGetUserRequest() {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.self)
    const next = yield authGetUserRequestData(data)
    yield put(actions.authGetUserSuccess({ data: next.data }))
  } catch (error) {
    yield put(actions.authGetUserFailure(error))
  }
}

export default () => [
  takeEvery(constants.AUTH_GET_USER_REQUEST, authGetUserRequest),
]
