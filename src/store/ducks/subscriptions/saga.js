import { graphqlOperation } from '@aws-amplify/api'
import { call, put, take, takeEvery, getContext, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import tryCatch from 'ramda/src/tryCatch'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as usersQueries from 'store/ducks/users/queries'
import * as chatQueries from 'store/ducks/chat/queries'
import * as chatActions from 'store/ducks/chat/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as constants from 'store/ducks/subscriptions/constants'
import * as Logger from 'services/Logger'
import { checkInternetConnection } from 'react-native-offline'

/**
 * Subscription state handler, used for preventing multiple subscriptions on the same topic
 */
function* subscriptionStateHandler({ identifier }) {
  const isRunning = yield select(state => (
    pathOr([], ['subscriptions', 'subscriptionsMain', 'data', 'pending'], state).find(item => item === identifier) ||
    pathOr([], ['subscriptions', 'subscriptionsMain', 'data', 'connect'], state).find(item => item === identifier)
  ))

  const isOffline = !(yield call(checkInternetConnection))

  /**
   * graphql error handler, possible errors are:
   * - connection closed
   * - connection timeout
   * - handshake error
   */
  function* errorHandler(error) {
    yield put(subscriptionsActions.subscriptionsMainFailure({ data: identifier }))
    Logger.withScope(scope => {
      scope.setExtra('payload', tryCatch(JSON.stringify, () => null)(path(['error'])(error)))
      Logger.captureMessage('SUBSCRIPTIONS_EMITTER_ERROR')
    })
  }

  /**
   * graphql connection started
   */
  function* pendingHandler() {
    yield put(subscriptionsActions.subscriptionsMainPending({ data: identifier }))
  }

  /**
   * graphql connection connected
   */
  function* connectHandler() {
    yield put(subscriptionsActions.subscriptionsMainConnect({ data: identifier }))
  }

  /**
   * event emitter unsubscribe handler
   */
  function* disconnectHandler() {
    yield put(subscriptionsActions.subscriptionsMainDisconnect({ data: identifier }))
  }

  return {
    isOffline,
    isRunning,
    errorHandler,
    pendingHandler,
    connectHandler,
    disconnectHandler,
  }
}

/**
 * Apollo subscription channel messagee emitter, used for graphql subscriptions
 */
function subscriptionEmitter({ subscription }) {
  /**
   * triggered on redux-saga channel close event
   */

  return eventChannel(emitter => {
    setTimeout(() => {
      emitter({ eventType: 'pending', eventData: {} })
    }, 0)

    const api = subscription.subscribe({
      next: (args) => emitter({ eventType: 'next', eventData: args }),
      error: (args) => emitter({ eventType: 'error', eventData: args }),
    })

    setTimeout(() => {
      if (api._state === 'ready') {
        emitter({ eventType: 'connect', eventData: api })
      } else if (api._state === 'closed') {
        emitter({ eventType: 'disconnect', eventData: api })
      }
    }, 0)

    return () => {
      api.unsubscribe()
      emitter({ eventType: 'disconnect', eventData: api })
    }
  })
}

/**
 * Interval channel message emitter, used for grapql polling
 */
function intervalEmitter({ frequency }) {
  return eventChannel(emitter => {
    const interval = setInterval(() => {
      emitter({})
    }, frequency)

    return () => clearInterval(interval)
  })
}

/**
 * main application state pre-loader
 * to be triggered when app just opened or switched background/foreground state
 */
function* appSubscription(req) {
  const userId = yield select(authSelector.authUserIdSelector) || path(['payload'])(req)

  yield put(usersActions.usersGetCardsRequest({}))
  yield put(postsActions.postsFeedGetRequest({ limit: 20 }))
  yield put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
  yield put(usersActions.usersGetPendingFollowersRequest({ userId }))
  yield put(usersActions.usersGetFollowedUsersWithStoriesRequest({}))
  yield put(chatActions.chatGetChatsRequest({}))
}

/**
 * Cards subscription channel
 */
function* cardSubscription(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const userId = yield select(authSelector.authUserIdSelector) || path(['payload'])(req)

  /**
   * check if subscription is already running
   */
  const subscriptionState = yield call(subscriptionStateHandler, { identifier: 'onCardNotification' })

  if (!userId) {
    return yield call(subscriptionState.errorHandler, { error: 'required userId param was not passed' })
  }

  if (subscriptionState.isRunning) {
    return yield call(subscriptionState.errorHandler, { error: 'onCardNotification subscription is already running' })
  }

  if (subscriptionState.isOffline) {
    return yield call(subscriptionState.errorHandler, { error: 'no internet connection' })
  }

  const subscription = AwsAPI.graphql(
    graphqlOperation(usersQueries.onCardNotification, { userId }),
  )

  const channel = yield call(subscriptionEmitter, {
    subscription,
    subscriptionState,
  })

  yield takeEvery(channel, function *({ eventType, eventData }) {
    if (eventType === 'connect') {
      return yield call(subscriptionState.connectHandler, eventData)
    }

    else if (eventType === 'pending') {
      return yield call(subscriptionState.pendingHandler, eventData)
    }

    else if (eventType === 'error') {
      return yield call(subscriptionState.errorHandler, eventData)
    }

    else if (eventType === 'disconnect') {
      return yield call(subscriptionState.disconnectHandler, eventData)
    }

    yield put(usersActions.usersGetCardsRequest({}))
    yield put(postsActions.postsGetUnreadCommentsRequest({ limit: 20 }))
    yield put(usersActions.usersGetProfileSelfRequest({ userId }))
    yield put(usersActions.usersGetPendingFollowersRequest({ userId }))
  })

  /**
   * Close channel subscription on application toggle
   */
  yield take(constants.SUBSCRIPTIONS_MAIN_IDLE)
  channel.close()
}

/**
 *
 */
function* chatMessageSubscription(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const userId = yield select(authSelector.authUserIdSelector) || path(['payload'])(req)

  /**
   * check if subscription is already running
   */
  const subscriptionState = yield call(subscriptionStateHandler, { identifier: 'onChatMessageNotification' })

  if (!userId) {
    return yield call(subscriptionState.errorHandler, { error: 'required userId param was not passed' })
  }

  if (subscriptionState.isRunning) {
    return yield call(subscriptionState.errorHandler, { error: 'onChatMessageNotification subscription is already running' })
  }

  if (subscriptionState.isOffline) {
    return yield call(subscriptionState.errorHandler, { error: 'no internet connection' })
  }

  const subscription = AwsAPI.graphql(
    graphqlOperation(chatQueries.onChatMessageNotification, { userId }),
  )

  const channel = yield call(subscriptionEmitter, {
    subscription,
    subscriptionState,
  })

  yield takeEvery(channel, function *({ eventType, eventData }) {
    if (eventType === 'connect') {
      return yield call(subscriptionState.connectHandler, eventData)
    }

    if (eventType === 'pending') {
      return yield call(subscriptionState.pendingHandler, eventData)
    }

    else if (eventType === 'error') {
      return yield call(subscriptionState.errorHandler, eventData)
    }

    else if (eventType === 'disconnect') {
      return yield call(subscriptionState.disconnectHandler, eventData)
    }

    const data = path(['value', 'data', 'onChatMessageNotification'])(eventData)
    const chatId = path(['message', 'chat', 'chatId'])(data)

    yield put(chatActions.chatGetChatRequest({ chatId }))
    yield put(chatActions.chatGetChatsRequest())
    yield put(usersActions.usersGetProfileSelfRequest({ userId }))
  })

  /**
   * Close channel subscription on application toggle
   */
  yield take(constants.SUBSCRIPTIONS_MAIN_IDLE)
  channel.close()
}

/**
 * New subscription that is used for various real-time updates
 */
function* subscriptionNotificationStart(req) {
  const AwsAPI = yield getContext('AwsAPI')
  const userId = yield select(authSelector.authUserIdSelector) || path(['payload'])(req)

  /**
   * check if subscription is already running
   */
  const subscriptionState = yield call(subscriptionStateHandler, { identifier: 'onNotification' })

  if (!userId) {
    return yield call(subscriptionState.errorHandler, { error: 'required userId param was not passed' })
  }

  if (subscriptionState.isRunning) {
    return yield call(subscriptionState.errorHandler, { error: 'onNotification subscription is already running' })
  }

  if (subscriptionState.isOffline) {
    return yield call(subscriptionState.errorHandler, { error: 'no internet connection' })
  }

  const subscription = AwsAPI.graphql(
    graphqlOperation(usersQueries.onNotification, { userId }),
  )

  const channel = yield call(subscriptionEmitter, {
    subscription,
    subscriptionState,
  })

  yield takeEvery(channel, function *({ eventType, eventData }) {
    if (eventType === 'connect') {
      return yield call(subscriptionState.connectHandler, eventData)
    }

    if (eventType === 'pending') {
      return yield call(subscriptionState.pendingHandler, eventData)
    }

    else if (eventType === 'error') {
      return yield call(subscriptionState.errorHandler, eventData)
    }

    else if (eventType === 'disconnect') {
      return yield call(subscriptionState.disconnectHandler, eventData)
    }

    const payload  = path(['value', 'data', 'onNotification'], eventData)
    const userId = path(['userId'], payload)
    const type = path(['type'], payload)

    /**
     * Fires when one of the user's followeds changes their first story
     */
    if (type === 'USER_CHATS_WITH_UNVIEWED_MESSAGES_COUNT_CHANGED') {
      yield put(usersActions.usersGetProfileSelfRequest({ userId }))
    }

    /**
     * Fires when a post is added to User.feed
     */
    if (type === 'USER_FEED_CHANGED') {
      const postsCreate = yield select(state => state.posts.postsCreate)

      if (postsCreate.status !== 'loading') {
        yield put(postsActions.postsFeedGetRequest({ limit: 20 }))
      }
    }

    /**
     * Fires when User.chatsWithUnviewedMessagesCount changes
     */
    if (type === 'USER_FOLLOWED_USERS_WITH_STORIES_CHANGED') {
      yield put(usersActions.usersGetFollowedUsersWithStoriesRequest({}))
    }

    /**
     * Fires when one of the user's posts reaches COMPLETED state for the first time 
     */
    if (type === 'POST_COMPLETED') {
      yield put(subscriptionsActions.subscriptionsPostCompleted(payload))
    }

    /**
     * Fires when one of the user's posts reaches ERROR state
     */
    if (type === 'POST_ERROR') {
      yield put(subscriptionsActions.subscriptionsPostError(payload))
    }
  })

  /**
   * Close channel subscription on application toggle
   */
  yield take(constants.SUBSCRIPTIONS_MAIN_IDLE)
  channel.close() 
}

/**
 *
 */
function* subscriptionPollStart() {
  const channel = yield call(intervalEmitter, {
    frequency: (30 * 60000),
  })

  yield takeEvery(channel, function *() {
    yield put(postsActions.postsGetTrendingPostsRequest({ limit: 100 }))
  })

  /**
   * Close channel subscription on application toggle
   */
  yield take(constants.SUBSCRIPTIONS_POLL_IDLE)
  channel.close()
}

export default () => [
  takeEvery(constants.SUBSCRIPTIONS_MAIN_REQUEST, subscriptionNotificationStart),
  takeEvery(constants.SUBSCRIPTIONS_MAIN_REQUEST, chatMessageSubscription),
  takeEvery(constants.SUBSCRIPTIONS_MAIN_REQUEST, cardSubscription),
  takeEvery(constants.SUBSCRIPTIONS_PREFETCH_REQUEST, appSubscription),
  takeEvery(constants.SUBSCRIPTIONS_POLL_REQUEST, subscriptionPollStart),
]