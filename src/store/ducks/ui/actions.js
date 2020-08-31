import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/ui/constants'

/**
 *
 */
export const uiNotificationRequest = createAction(constants.UI_NOTIFICATION_REQUEST)
export const uiNotificationIdle = createAction(constants.UI_NOTIFICATION_IDLE)
