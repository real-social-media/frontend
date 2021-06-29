import { all } from 'redux-saga/effects'
import sagas from 'store/sagas.common'

export default function* rootSaga() {
  yield all(sagas())
}
