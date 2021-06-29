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
function* authUserRequestData(api) {
  const dataSelector = path(['data', 'self'])
  const data = dataSelector(api)
  const normalized = normalizer.normalizeUserGet(data)

  yield call(entitiesMerge, normalized)

  return {
    data: normalized.result,
  }
}

function* authUserRequest() {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.self)
    const next = yield authUserRequestData(data)
    yield put(actions.authUserSuccess({ data: next.data }))
  } catch (error) {
    yield put(actions.authUserFailure(error))
  }
}

export default () => [
  takeEvery(constants.AUTH_USER_REQUEST, authUserRequest),
]
