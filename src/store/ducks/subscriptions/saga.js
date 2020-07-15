import { graphqlOperation } from '@aws-amplify/api'
import { call, put, takeEvery, takeLatest, getContext } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import path from 'ramda/src/path'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as postsQueries from 'store/ducks/posts/queries'
import * as usersQueries from 'store/ducks/users/queries'
import * as chatQueries from 'store/ducks/chat/queries'
import * as chatActions from 'store/ducks/chat/actions'
import * as queryService from 'services/Query'
import * as Logger from 'services/Logger'

/**
 *
 */
function postSubscriptionChannel({ subscription }) {
  return eventChannel(emitter => {
    subscription.subscribe({
      next: emitter,
      error: () => {},
    })

    return () => subscription.unsubscribe()
  })
}

function* postSubscription(req) {
  try {
    const AwsAPI = yield getContext('AwsAPI')
    const userId = path(['payload', 'data'])(req)

    const subscription = AwsAPI.graphql(
      graphqlOperation(postsQueries.onPostNotification, { userId })
    )

    const channel = yield call(postSubscriptionChannel, {
      subscription,
    })

    yield takeEvery(channel, function *(eventData) {
      const postId = path(['value', 'data', 'onPostNotification', 'post', 'postId'])(eventData)
      const userId = path(['value', 'data', 'onPostNotification', 'userId'])(eventData)
      const type = path(['value', 'data', 'onPostNotification', 'type'])(eventData)
      
      const data = yield queryService.apiRequest(postsQueries.getPost, { postId })
      const selector = path(['data', 'post'])

      if (type === 'COMPLETED') {
        yield put(postsActions.postsCreateSuccess({ data: {}, payload: selector(data), meta: {} }))
        yield put(postsActions.postsFeedGetRequest({ limit: 20 }))
        yield put(postsActions.postsGetRequest({ userId }))
        yield put(usersActions.usersImagePostsGetRequest({ userId }))
      }
    })
  } catch (error) {
    Logger.withScope(scope => {
      scope.setExtra('code', 'POST_SUBSCRIPTION_ERROR')
      scope.setExtra('message', error.message)
      Logger.captureMessage('POST_SUBSCRIPTION')
    })
  }
}

/**
 *
 */
function cardSubscriptionChannel({ subscription }) {
  return eventChannel(emitter => {
    subscription.subscribe({
      next: emitter,
      error: () => {},
    })

    return () => subscription.unsubscribe()
  })
}

function* cardSubscription(req) {
  try {
    const AwsAPI = yield getContext('AwsAPI')
    const userId = path(['payload', 'data'])(req)

    const subscription = AwsAPI.graphql(
      graphqlOperation(usersQueries.onCardNotification, { userId })
    )

    const channel = yield call(cardSubscriptionChannel, {
      subscription,
    })

    yield takeEvery(channel, function *(eventData) {
      yield put(usersActions.usersGetCardsRequest({}))
      yield put(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
      yield put(usersActions.usersGetProfileSelfRequest({ userId }))
    })
  } catch (error) {
    Logger.withScope(scope => {
      scope.setExtra('code', 'CARD_SUBSCRIPTION_ERROR')
      scope.setExtra('message', error.message)
      Logger.captureMessage('CARD_SUBSCRIPTION')
    })
  }
}

/**
 *
 */
function* appSubscription(req) {
  try {
    const userId = path(['payload', 'data'])(req)
    const type = path(['payload', 'payload', 'type'])(req)

    if (type !== 'STATE_CHANGE') {
      yield put(usersActions.usersGetCardsRequest({}))
      yield put(postsActions.postsFeedGetRequest({ limit: 20 }))
      yield put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
      yield put(usersActions.usersGetPendingFollowersRequest({ userId }))
      yield put(usersActions.usersGetFollowedUsersWithStoriesRequest({}))
    }
  } catch (error) {
    Logger.withScope(scope => {
      scope.setExtra('code', 'APP_SUBSCRIPTION_ERROR')
      scope.setExtra('message', error.message)
      Logger.captureMessage('APP_SUBSCRIPTION')
    })
  }
}

/**
 *
 */
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
  try {
    const AwsAPI = yield getContext('AwsAPI')
    const userId = path(['payload', 'data'])(req)

    const subscription = AwsAPI.graphql(
      graphqlOperation(chatQueries.onChatMessageNotification, { userId })
    )

    const channel = yield call(chatMessageSubscriptionChannel, {
      subscription,
    })

    yield takeEvery(channel, function *(eventData) {
      const data = path(['value', 'data', 'onChatMessageNotification'])(eventData)
      const chatId = path(['message', 'chat', 'chatId'])(data)

      yield put(chatActions.chatGetChatRequest({ chatId }))
      yield put(chatActions.chatGetChatsRequest())
      yield put(usersActions.usersGetProfileSelfRequest({ userId }))
    })
  } catch (error) {
    Logger.withScope(scope => {
      scope.setExtra('code', 'CHAT_MESSAGE_SUBSCRIPTION_ERROR')
      scope.setExtra('message', error.message)
      Logger.captureMessage('CHAT_MESSAGE_SUBSCRIPTION')
    })
  }
}

export default () => [
  takeLatest('AUTH_CHECK_READY', chatMessageSubscription),
  takeLatest('AUTH_CHECK_READY', postSubscription),
  takeLatest('AUTH_CHECK_READY', cardSubscription),
  takeLatest('AUTH_CHECK_READY', appSubscription),
]