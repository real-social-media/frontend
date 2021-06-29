import { put, takeEvery, call } from 'redux-saga/effects'
import * as actions from 'store/ducks/dating/actions'
import * as queries from 'store/ducks/dating/queries'
import * as constants from 'store/ducks/dating/constants'
import * as queryService from 'services/Query'

function* datingMatchRejectRequest(req) {
  try {
    yield call([queryService, 'apiRequest'], queries.rejectMatch, req.payload)
    yield put(actions.datingMatchRejectSuccess({ data: {}, payload: {}, meta: {} }))
  } catch (error) {
    yield put(actions.datingMatchRejectFailure(error, req.payload))
  }
}

export default () => [
  takeEvery(constants.DATING_MATCH_REJECT_REQUEST, datingMatchRejectRequest),
]
