import { takeEvery } from 'redux-saga/effects'
import * as constants from 'store/ducks/subscriptions/constants'
import subscriptionNotificationStart from 'store/ducks/subscriptions/saga/notifications'
import chatMessageSubscription from 'store/ducks/subscriptions/saga/chat'
import cardSubscription from 'store/ducks/subscriptions/saga/card'
import subscriptionPollStart from 'store/ducks/subscriptions/saga/poll'
import subscriptions from 'store/ducks/subscriptions/saga'

test('Subscriptions root saga', () => {
  expect(subscriptions()).toEqual([
    takeEvery(constants.SUBSCRIPTIONS_MAIN_REQUEST, subscriptionNotificationStart),
    takeEvery(constants.SUBSCRIPTIONS_MAIN_REQUEST, chatMessageSubscription),
    takeEvery(constants.SUBSCRIPTIONS_MAIN_REQUEST, cardSubscription),
    takeEvery(constants.SUBSCRIPTIONS_POLL_REQUEST, subscriptionPollStart),
  ])
})
