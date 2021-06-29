import { put, takeLatest, call } from 'redux-saga/effects'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import * as actions from 'store/ducks/dating/actions'
import * as queries from 'store/ducks/dating/queries'
import * as constants from 'store/ducks/dating/constants'
import * as queryService from 'services/Query'
import * as normalizer from 'normalizer/schemas'
import { entitiesMerge } from 'store/ducks/entities/saga'

/**
 *
 */
function* datingConfirmedUsersRequestData(req, api) {
  const dataSelector = path(['data', 'self', 'matchedUsers', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'self', 'matchedUsers']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeUsersGet(data)
  yield call(entitiesMerge, normalized)

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* datingConfirmedUsersRequest(req) {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.matchedUsers, req.payload)
    const next = yield datingConfirmedUsersRequestData(req, data)
    yield put(actions.datingConfirmedUsersSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.datingConfirmedUsersFailure(error, req.payload))
  }
}

export default () => [
  takeLatest(constants.DATING_CONFIRMED_USERS_REQUEST, datingConfirmedUsersRequest),
]
