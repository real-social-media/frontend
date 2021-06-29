import { put, takeLatest, call } from 'redux-saga/effects'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import * as actions from 'store/ducks/chat/actions'
import * as queries from 'store/ducks/chat/queries'
import * as constants from 'store/ducks/chat/constants'
import * as queryService from 'services/Query'
import * as normalizer from 'normalizer/schemas'
import { entitiesMerge } from 'store/ducks/entities/saga'

/**
 *
 */
function* chatGetChatsRequestData(req, api) {
  const dataSelector = path(['data', 'self', 'chats', 'items'])
  const metaSelector = compose(omit(['items']), path(['data', 'self', 'chats']))

  const data = dataSelector(api)
  const meta = metaSelector(api)
  const payload = req.payload

  const normalized = normalizer.normalizeChatsGet(data)
  yield call(entitiesMerge, normalized)

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* chatGetChatsRequest(req) {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.chats, req.payload)
    const next = yield chatGetChatsRequestData(req, data)
    yield put(actions.chatGetChatsSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.chatGetChatsFailure(error, req.payload))
  }
}

/**
 *
 */
function* chatGetChatRequestData(req, api) {
  const dataSelector = path(['data', 'chat'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeChatGet(data)
  yield call(entitiesMerge, normalized)

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* chatGetChatRequest(req) {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.chat, req.payload)
    const next = yield chatGetChatRequestData(req, data)
    yield put(actions.chatGetChatSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.chatGetChatFailure(error, req.payload ))
  }
}

/**
 *
 */
function* chatCreateDirectRequestData(req, api) {
  const dataSelector = path(['data', 'createDirectChat'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeChatGet(data)
  yield call(entitiesMerge, normalized)

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* chatCreateDirectRequest(req) {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.createDirectChat, req.payload)
    const next = yield chatCreateDirectRequestData(req, data)
    yield put(actions.chatCreateDirectSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.chatCreateDirectFailure(error, req.payload ))
  }
}

/**
 *
 */
function* chatAddMessageRequest(req) {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.addChatMessage, req.payload)
    const dataSelector = path(['data', 'addChatMessage'])

    yield put(actions.chatAddMessageSuccess({ data: dataSelector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.chatAddMessageFailure(error, req.payload ))
  }
}

/**
 *
 */
function* chatReportViewRequest(req) {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.reportChatViews, req.payload)
    const dataSelector = path(['data', 'reportChatViews'])

    yield put(actions.chatReportViewSuccess({ data: dataSelector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.chatReportViewFailure(error, req.payload ))
  }
}

/**
 *
 */
function* chatFlagMessageRequest(req) {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.flagChatMessage, req.payload)
    const dataSelector = path(['data', 'flagChatMessage'])

    yield put(actions.chatFlagMessageSuccess({ data: dataSelector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.chatFlagMessageFailure(error, req.payload ))
  }
}

/**
 *
 */
function* chatDeleteMessageRequest(req) {
  try {
    const data = yield call([queryService, 'apiRequest'], queries.deleteChatMessage, req.payload)
    const dataSelector = path(['data', 'deleteChatMessage'])

    yield put(actions.chatDeleteMessageSuccess({ data: dataSelector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.chatDeleteMessageFailure(error, req.payload ))
  }
}

export default () => [
  takeLatest(constants.CHAT_GET_CHATS_REQUEST, chatGetChatsRequest),
  takeLatest(constants.CHAT_GET_CHAT_REQUEST, chatGetChatRequest),
  takeLatest(constants.CHAT_CREATE_DIRECT_REQUEST, chatCreateDirectRequest),
  takeLatest(constants.CHAT_ADD_MESSAGE_REQUEST, chatAddMessageRequest),
  takeLatest(constants.CHAT_REPORT_VIEW_REQUEST, chatReportViewRequest),
  takeLatest(constants.CHAT_FLAG_MESSAGE_REQUEST, chatFlagMessageRequest),
  takeLatest(constants.CHAT_DELETE_MESSAGE_REQUEST, chatDeleteMessageRequest),
]
