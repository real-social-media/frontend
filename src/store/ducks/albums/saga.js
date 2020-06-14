import { put, takeLatest } from 'redux-saga/effects'
import * as actions from 'store/ducks/albums/actions'
import * as queries from 'store/ducks/albums/queries'
import * as constants from 'store/ducks/albums/constants'
import * as entitiesActions from 'store/ducks/entities/actions'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import * as queryService from 'services/Query'
import * as normalizer from 'normalizer/schemas'

/**
 * 
 */
function* albumsGetRequestData(req, api) {
  const dataSelector = path(['data', 'user', 'albums', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'user', 'albums']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeAlbumsGet(data)
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

function* albumsGetRequest(req) {
  try {
    const data = yield queryService.apiRequest(queries.getAlbums, req.payload)
    const next = yield albumsGetRequestData(req, data)
    yield put(actions.albumsGetSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.albumsGetFailure({ message: error.message, payload: req.payload }))
  }
}

/**
 * 
 */
function* albumsCreateRequestData(req, api) {
  const dataSelector = path(['data', 'addAlbum'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeAlbumGet(data)
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

function* albumsCreateRequest(req) {
  try {
    const data = yield queryService.apiRequest(queries.addAlbum, req.payload)
    const next = yield albumsCreateRequestData(req, data)
    yield put(actions.albumsCreateSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.albumsCreateFailure({ message: error.message, payload: req.payload }))
  }
}

/**
 * 
 */
function* albumsEditRequestData(req, api) {
  const dataSelector = path(['data', 'editAlbum'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeAlbumGet(data)
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

function* albumsEditRequest(req) {  
  try {
    const data = yield queryService.apiRequest(queries.editAlbum, req.payload)
    const next = yield albumsEditRequestData(req, data)
    yield put(actions.albumsEditSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.albumsEditFailure({ message: error.message }))
  }
}

/**
 * 
 */
function* albumsDeleteRequestData(req, api) {
  const dataSelector = path(['data', 'deleteAlbum'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeAlbumGet(data)
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

function* albumsDeleteRequest(req) {  
  try {
    const data = yield queryService.apiRequest(queries.deleteAlbum, req.payload)
    const next = yield albumsDeleteRequestData(req, data)
    yield put(actions.albumsDeleteSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.albumsDeleteFailure({ message: error.message }))
  }
}

export default () => [
  takeLatest(constants.ALBUMS_GET_REQUEST, albumsGetRequest),
  takeLatest(constants.ALBUMS_CREATE_REQUEST, albumsCreateRequest),
  takeLatest(constants.ALBUMS_EDIT_REQUEST, albumsEditRequest),
  takeLatest(constants.ALBUMS_DELETE_REQUEST, albumsDeleteRequest),
]