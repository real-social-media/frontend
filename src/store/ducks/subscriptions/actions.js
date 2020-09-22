import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/subscriptions/constants'

export const subscriptionsMainRequest = createAction(constants.SUBSCRIPTIONS_MAIN_REQUEST)
export const subscriptionsMainSuccess = createAction(constants.SUBSCRIPTIONS_MAIN_SUCCESS)
export const subscriptionsMainFailure = createAction(constants.SUBSCRIPTIONS_MAIN_FAILURE)
export const subscriptionsMainIdle = createAction(constants.SUBSCRIPTIONS_MAIN_IDLE)
export const subscriptionsMainPending = createAction(constants.SUBSCRIPTIONS_MAIN_PENDING)
export const subscriptionsMainConnect = createAction(constants.SUBSCRIPTIONS_MAIN_CONNECT)
export const subscriptionsMainDisconnect = createAction(constants.SUBSCRIPTIONS_MAIN_DISCONNECT)

export const subscriptionsPollRequest = createAction(constants.SUBSCRIPTIONS_POLL_REQUEST)
export const subscriptionsPollSuccess = createAction(constants.SUBSCRIPTIONS_POLL_SUCCESS)
export const subscriptionsPollFailure = createAction(constants.SUBSCRIPTIONS_POLL_FAILURE)
export const subscriptionsPollIdle = createAction(constants.SUBSCRIPTIONS_POLL_IDLE)
export const subscriptionsPollPending = createAction(constants.SUBSCRIPTIONS_POLL_PENDING)
export const subscriptionsPollConnect = createAction(constants.SUBSCRIPTIONS_POLL_CONNECT)
export const subscriptionsPollDisconnect = createAction(constants.SUBSCRIPTIONS_POLL_DISCONNECT)

export const subscriptionsPostCompleted = createAction(constants.SUBSCRIPTIONS_POST_COMPLETED)
export const subscriptionsPostError = createAction(constants.SUBSCRIPTIONS_POST_ERROR)

export const subscriptionsPrefetchRequest = createAction(constants.SUBSCRIPTIONS_PREFETCH_REQUEST)
