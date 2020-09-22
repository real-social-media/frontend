import { takeEvery } from 'redux-saga/effects'
import * as constants from 'store/ducks/subscriptions/constants'
import subscriptionNotificationStart from 'store/ducks/subscriptions/saga/notifications'
import chatMessageSubscription from 'store/ducks/subscriptions/saga/chat'
import cardSubscription from 'store/ducks/subscriptions/saga/card'
import appSubscription from 'store/ducks/subscriptions/saga/app'
import subscriptionPollStart from 'store/ducks/subscriptions/saga/poll'

export default () => [
  takeEvery(constants.SUBSCRIPTIONS_MAIN_REQUEST, subscriptionNotificationStart),
  takeEvery(constants.SUBSCRIPTIONS_MAIN_REQUEST, chatMessageSubscription),
  takeEvery(constants.SUBSCRIPTIONS_MAIN_REQUEST, cardSubscription),
  takeEvery(constants.SUBSCRIPTIONS_PREFETCH_REQUEST, appSubscription),
  takeEvery(constants.SUBSCRIPTIONS_POLL_REQUEST, subscriptionPollStart),
]
