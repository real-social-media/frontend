import { put, takeLatest, getContext } from 'redux-saga/effects'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import * as actions from 'store/ducks/dating/actions'
import * as queries from 'store/ducks/dating/queries'
import * as constants from 'store/ducks/dating/constants'
import * as queryService from 'services/Query'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as normalizer from 'normalizer/schemas'

/**
 *
 */
function* datingMatchedUsersRequestData(req, api) {
  const dataSelector = path(['data', 'self', 'matchedUsers', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'self', 'matchedUsers']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeUsersGet(data)
  
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

function* datingMatchedUsersRequest(req) {
  const errorWrapper = yield getContext('errorWrapper')

  try {
    const data = yield queryService.apiRequest(queries.matchedUsers, req.payload)
    const next = yield datingMatchedUsersRequestData(req, data)
    yield put(actions.datingMatchedUsersSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.datingMatchedUsersFailure({ payload: req.payload, message: errorWrapper(error) }))
  }
}

export default () => [
  takeLatest(constants.DATING_MATCHED_USERS_REQUEST, datingMatchedUsersRequest),
]