import { put, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/translation/actions'
import * as constants from 'store/ducks/translation/constants'

/**
 *
 */
function* handleTranslationFetchRequest() {
  const data = yield fetch('https://dtoqrayxo467g.cloudfront.net/translations/resources.json')
  return yield data.json()
}

/**
 *
 */
function* translationFetchRequest() {
  try {
    const data = yield handleTranslationFetchRequest()
    yield put(actions.translationFetchSuccess({ data }))
  } catch (error) {
    yield put(actions.translationFetchFailure({ message: error.message }))
  }
}

export default () => [takeLatest(constants.TRANSLATION_FETCH_REQUEST, translationFetchRequest)]
