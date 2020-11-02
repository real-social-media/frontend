import { put, takeLatest, getContext } from 'redux-saga/effects'
import path from 'ramda/src/path'
import * as actions from 'store/ducks/users/actions'
import * as queries from 'store/ducks/users/queries'
import * as constants from 'store/ducks/users/constants'
import * as queryService from 'services/Query'
import * as errors from 'store/ducks/users/errors'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as normalizer from 'normalizer/schemas'
import * as navigationActions from 'navigation/actions'

/**
 *
 */
function* usersSetUserDatingStatusRequestData(req, api) {
  const dataSelector = path(['data', 'setUserDatingStatus'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* usersSetUserDatingStatusRequest(req) {
  try {
    const data = yield queryService.apiRequest(queries.setUserDatingStatus, req.payload)
    const next = yield usersSetUserDatingStatusRequestData(req, data)
    yield put(actions.usersSetUserDatingStatusSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.usersSetUserDatingStatusFailure({
      message: errors.getMessagePayload(constants.USERS_SET_USER_DATING_STATUS_FAILURE, 'GENERIC', error.message),
      payload: req.payload,
    }))
  }
}

function* usersSetUserDatingStatusSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateDating(ReactNavigationRef.current)()
}

function* usersSetUserDatingStatusFailure() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateDating(ReactNavigationRef.current)()
}

export default () => [
  takeLatest(constants.USERS_SET_USER_DATING_STATUS_REQUEST, usersSetUserDatingStatusRequest),
  takeLatest(constants.USERS_SET_USER_DATING_STATUS_SUCCESS, usersSetUserDatingStatusSuccess),
  takeLatest(constants.USERS_SET_USER_DATING_STATUS_FAILURE, usersSetUserDatingStatusFailure),
]