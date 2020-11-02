import { put, takeEvery, getContext } from 'redux-saga/effects'
import * as actions from 'store/ducks/dating/actions'
import * as queries from 'store/ducks/dating/queries'
import * as constants from 'store/ducks/dating/constants'
import * as queryService from 'services/Query'


function* datingMatchApproveRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    yield queryService.apiRequest(queries.approveMatch, req.payload)
    yield put(actions.datingMatchApproveSuccess({ data: {}, payload: {}, meta: {} }))
  } catch (error) {
    yield put(actions.datingMatchApproveFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

export default () => [
  takeEvery(constants.DATING_MATCH_APPROVE_REQUEST, datingMatchApproveRequest),
]