import { put, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/dating/actions'
import * as constants from 'store/ducks/dating/constants'
import * as formatters from 'store/ducks/dating/formatters'
import * as entitiesActions from 'store/ducks/entities/actions'
import path from 'ramda/src/path'
import * as normalizer from 'normalizer/schemas'

function* handleDatingFetchRequest() {
  const data = yield fetch('https://randomuser.me/api/?page=1&results=10&seed=abc')
  return yield data.json()
}

function* datingGetRequest(req) {
  const dataSelector = path(['results']);

  try {
    const apiRes = yield handleDatingFetchRequest();
    const result = dataSelector(apiRes);
    const data = formatters.formatDating(result);
    const normalized = normalizer.normalizeDatingGet(data);

    yield put(entitiesActions.entitiesDatingMerge({ data: normalized.entities.dating || {} }))

    yield put(actions.datingGetSuccess({ data: normalized.result, payload: req.payload }));
  } catch (error) {
    yield put(actions.datingGetFailure({ message: error.message, payload: req.payload }))
  }
}

export default () => [
  takeLatest(constants.DATING_GET_REQUEST, datingGetRequest),
]
