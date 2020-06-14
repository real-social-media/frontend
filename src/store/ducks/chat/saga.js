import { graphqlOperation } from '@aws-amplify/api'
import { call, put, takeEvery, takeLatest, getContext } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import path from 'ramda/src/path'
import compose from 'ramda/src/compose'
import omit from 'ramda/src/omit'
import * as actions from 'store/ducks/chat/actions'
import * as queries from 'store/ducks/chat/queries'
import * as constants from 'store/ducks/chat/constants'
import * as uiActions from 'store/ducks/ui/actions'
import * as chatActions from 'store/ducks/chat/actions'
import * as queryService from 'services/Query'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as normalizer from 'normalizer/schemas'

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
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))
  yield put(entitiesActions.entitiesChatsMerge({ data: normalized.entities.chats || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* chatGetChatsRequest(req) {
  try {
    const data = yield queryService.apiRequest(queries.chats, req.payload)
    const next = yield chatGetChatsRequestData(req, data)
    yield put(actions.chatGetChatsSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.chatGetChatsFailure({ message: error.message, payload: req.payload }))
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
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))
  yield put(entitiesActions.entitiesChatsMerge({ data: normalized.entities.chats || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* chatGetChatRequest(req) {
  try {
    const data = yield queryService.apiRequest(queries.chat, req.payload)
    const next = yield chatGetChatRequestData(req, data)
    yield put(actions.chatGetChatSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.chatGetChatFailure({ message: error.message, payload: req.payload }))
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
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))
  yield put(entitiesActions.entitiesChatsMerge({ data: normalized.entities.chats || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* chatCreateDirectRequest(req) {
  try {
    const data = yield queryService.apiRequest(queries.createDirectChat, req.payload)
    const next = yield chatCreateDirectRequestData(req, data)
    yield put(actions.chatCreateDirectSuccess({ data: next.data, payload: next.payload, meta: next.meta }))
  } catch (error) {
    yield put(actions.chatCreateDirectFailure({ message: error.message, payload: req.payload }))
  }
}

/**
 * 
 */
function* chatAddMessageRequest(req) {
  try {
    const data = yield queryService.apiRequest(queries.addChatMessage, req.payload)
    const dataSelector = path(['data', 'addChatMessage'])

    yield put(actions.chatAddMessageSuccess({ data: dataSelector(data), payload: req.payload, meta: data }))
  } catch (error) {
    yield put(actions.chatAddMessageFailure({ message: error.message, payload: req.payload }))
  }
}

function chatMessageSubscriptionChannel({ subscription }) {
  return eventChannel(emitter => {
    subscription.subscribe({
      next: emitter,
      error: () => {},
    })

    return () => subscription.unsubscribe()
  })
}

function* chatMessageSubscription(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const userId = path(['payload', 'data', 'userId'])(req)

  const subscription = AwsAPI.graphql(
    graphqlOperation(queries.onChatMessageNotification, { userId })
  )

  const channel = yield call(chatMessageSubscriptionChannel, {
    subscription,
  })

  yield takeEvery(channel, function *(eventData) {
    const data = path(['value', 'data', 'onChatMessageNotification'])(eventData)
    const chatId = path(['message', 'chat', 'chatId'])(data)

    yield put(chatActions.chatGetChatRequest({ chatId }))
    yield put(chatActions.chatGetChatsRequest())
    yield put(uiActions.uiNotificationRequest({ data }))
  })
}

export default () => [
  takeLatest('AUTH_CHECK_SUCCESS', chatMessageSubscription),
  takeLatest(constants.CHAT_GET_CHATS_REQUEST, chatGetChatsRequest),
  takeLatest(constants.CHAT_GET_CHAT_REQUEST, chatGetChatRequest),
  takeLatest(constants.CHAT_CREATE_DIRECT_REQUEST, chatCreateDirectRequest),
  takeLatest(constants.CHAT_ADD_MESSAGE_REQUEST, chatAddMessageRequest),
]