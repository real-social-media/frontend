import { handleActions } from 'redux-actions'
import update from 'immutability-helper'
import * as constants from 'store/ducks/ui/constants'

const initialState = {
  notifications: [],
}

/**
 *
 */
const uiNotificationRequest = (state, action) => update(state, {
  notifications: { $push: [action.payload.data] },
})

const uiNotificationIdle = (state) => update(state, {
  notifications: { $set: [] },
})

export default handleActions({
  [constants.UI_NOTIFICATION_REQUEST]: uiNotificationRequest,
  [constants.UI_NOTIFICATION_IDLE]: uiNotificationIdle,
}, initialState)
