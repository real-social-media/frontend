import { put, takeEvery, getContext } from 'redux-saga/effects'
import * as actions from 'store/ducks/dating/actions'
import * as queries from 'store/ducks/dating/queries'
import * as constants from 'store/ducks/dating/constants'
import * as queryService from 'services/Query'


function* datingMatchRejectRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    yield queryService.apiRequest(queries.rejectMatch, req.payload)
    yield put(actions.datingMatchRejectSuccess({ data: {}, payload: {}, meta: {} }))
  } catch (error) {
    yield put(actions.datingMatchRejectFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

export default () => [
  takeEvery(constants.DATING_MATCH_REJECT_REQUEST, datingMatchRejectRequest),
]