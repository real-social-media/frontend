import { call, getContext, select } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import { graphqlOperation } from '@aws-amplify/api'
import * as authSelector from 'store/ducks/auth/selectors'

/**
 * Apollo subscription channel messagee emitter, used for graphql subscriptions
 */
function subscriptionEmitter({ subscription }) {
  /**
   * triggered on redux-saga channel close event
   */

  return eventChannel((emitter) => {
    const api = subscription.subscribe({
      next: (eventData) => emitter({ eventData }),
      error: () => emitter(END),
    })

    return () => {
      api.unsubscribe()
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

export function* createChannel({ query }) {
  const AwsAPI = yield getContext('AwsAPI')
  const userId = yield select(authSelector.authUserId)

  if (!userId) {
    throw new Error('required userId param was not passed')
  }

  const subscription = AwsAPI.graphql(graphqlOperation(query, { userId }))
  const channel = yield call(subscriptionEmitter, { subscription })

  return { channel, userId }
}
