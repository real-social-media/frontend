import path from 'ramda/src/path'
import { put, takeEvery, select, call } from 'redux-saga/effects'
import * as constants from 'store/ducks/themes/constants'
import * as actions from 'store/ducks/themes/actions'
import * as queries from 'store/ducks/themes/queries'
import * as authActions from 'store/ducks/auth/actions'
import * as queryService from 'services/Query'
import * as navigationActions from 'navigation/actions'
import * as NavigationService from 'services/Navigation'
import * as authSelector from 'store/ducks/auth/selectors'

function* themesCheckDefaultRequest() {
  try {
    const navigation = yield NavigationService.getNavigation()
    const authUser = yield select(authSelector.authUser)
    const themeCode = path(['themeCode'], authUser)

    if (!themeCode) {
      navigationActions.navigateThemeDefault(navigation)
    }

    yield put(actions.themesCheckDefaultSuccess())
  } catch (error) {
    yield put(actions.themesCheckDefaultFailure(error))
  }
}

function* themesEditRequest(req) {
  try {
    yield call(queryService.apiRequest, queries.setThemeCode, { themeCode: req.payload.themeCode })
    yield put(authActions.authGetUserRequest())
    yield put(actions.themesEditSuccess())
  } catch (error) {
    yield put(actions.themesEditFailure(error))
  }
}

export default () => [
  takeEvery(constants.THEMES_CHECK_DEFAULT_REQUEST, themesCheckDefaultRequest),
  takeEvery(constants.THEMES_EDIT_REQUEST, themesEditRequest),
]
