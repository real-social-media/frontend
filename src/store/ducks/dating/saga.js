import { put, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/dating/actions'
import * as constants from 'store/ducks/dating/constants'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as fetchService from 'services/Fetch'


function* datingGetRequest() {
  try {
    const { data } = yield fetchService.getRequest(
      'https://randomuser.me/api/', 
      { page: 1, results: 10, seed: 'abc' }
    )
    yield put(entitiesActions.entitiesDatingMerge({ data: data.results || {} }))
    yield put(actions.datingGetSuccess({ data: data.results }))
  } catch (error) {
    yield put(actions.datingGetFailure({ message: error.message }))
  }
}

export default () => [
  takeLatest(constants.DATING_GET_REQUEST , datingGetRequest)
]
