import { call, put, getContext, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import { graphqlOperation } from '@aws-amplify/api'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import tryCatch from 'ramda/src/tryCatch'
import * as authSelector from 'store/ducks/auth/selectors'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as Logger from 'services/Logger'
import { checkInternetConnection } from 'react-native-offline'

/**
 * Subscription state handler, used for preventing multiple subscriptions on the same topic
 */
function* subscriptionStateHandler({ identifier }) {
  const isRunning = yield select(
    (state) =>
      pathOr([], ['subscriptions', 'subscriptionsMain', 'data', 'pending'], state).find(
        (item) => item === identifier,
      ) ||
      pathOr([], ['subscriptions', 'subscriptionsMain', 'data', 'connect'], state).find((item) => item === identifier),
  )

  const isOffline = !(yield call(checkInternetConnection))

  /**
   * graphql error handler, possible errors are:
   * - connection closed
   * - connection timeout
   * - handshake error
   */
  function* errorHandler(error) {
    const payload = tryCatch(JSON.stringify, () => null)(path(['error'])(error))
    yield put(subscriptionsActions.subscriptionsMainFailure({ data: identifier, payload }))
    Logger.withScope((scope) => {
      scope.setExtra('payload', payload)
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

  return eventChannel((emitter) => {
    setTimeout(() => {
      emitter({ eventType: 'pending', eventData: {} })
    }, 0)

    const api = subscription.subscribe({
      next: (args) => emitter({ eventType: 'next', eventData: args }),
      error: () => emitter(END),
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
export function intervalEmitter({ frequency }) {
  return eventChannel((emitter) => {
    const interval = setInterval(() => {
      emitter({})
    }, frequency)

    return () => {
      clearInterval(interval)
    }
  })
}

export function* createChannel({ query, identifier }) {
  const AwsAPI = yield getContext('AwsAPI')
  const userId = yield select(authSelector.authUserIdSelector)
  const subscriptionState = yield call(subscriptionStateHandler, { identifier })

  if (subscriptionState.isRunning) return

  if (!userId) {
    return yield call(subscriptionState.errorHandler, { error: 'required userId param was not passed' })
  }

  if (subscriptionState.isOffline) {
    return yield call(subscriptionState.errorHandler, { error: 'no internet connection' })
  }

  const subscription = AwsAPI.graphql(graphqlOperation(query, { userId }))
  const channel = yield call(subscriptionEmitter, { subscription })

  return { channel, subscriptionState, userId }
}
