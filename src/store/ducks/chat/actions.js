import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/chat/constants'

/**
 *
 */
export const chatGetChatsIdle = createAction(constants.CHAT_GET_CHATS_IDLE)
export const chatGetChatsRequest = createAction(constants.CHAT_GET_CHATS_REQUEST)
export const chatGetChatsSuccess = createAction(constants.CHAT_GET_CHATS_SUCCESS)
export const chatGetChatsFailure = createAction(constants.CHAT_GET_CHATS_FAILURE)

/**
 *
 */
export const chatGetChatIdle = createAction(constants.CHAT_GET_CHAT_IDLE)
export const chatGetChatRequest = createAction(constants.CHAT_GET_CHAT_REQUEST)
export const chatGetChatSuccess = createAction(constants.CHAT_GET_CHAT_SUCCESS)
export const chatGetChatFailure = createAction(constants.CHAT_GET_CHAT_FAILURE)

/**
 *
 */
export const chatCreateDirectIdle = createAction(constants.CHAT_CREATE_DIRECT_IDLE)
export const chatCreateDirectRequest = createAction(constants.CHAT_CREATE_DIRECT_REQUEST)
export const chatCreateDirectSuccess = createAction(constants.CHAT_CREATE_DIRECT_SUCCESS)
export const chatCreateDirectFailure = createAction(constants.CHAT_CREATE_DIRECT_FAILURE)

/**
 *
 */
export const chatAddMessageIdle = createAction(constants.CHAT_ADD_MESSAGE_IDLE)
export const chatAddMessageRequest = createAction(constants.CHAT_ADD_MESSAGE_REQUEST)
export const chatAddMessageSuccess = createAction(constants.CHAT_ADD_MESSAGE_SUCCESS)
export const chatAddMessageFailure = createAction(constants.CHAT_ADD_MESSAGE_FAILURE)

/**
 *
 */
export const chatReportViewIdle = createAction(constants.CHAT_REPORT_VIEW_IDLE)
export const chatReportViewRequest = createAction(constants.CHAT_REPORT_VIEW_REQUEST)
export const chatReportViewSuccess = createAction(constants.CHAT_REPORT_VIEW_SUCCESS)
export const chatReportViewFailure = createAction(constants.CHAT_REPORT_VIEW_FAILURE)

/**
 *
 */
export const chatDeleteMessageIdle = createAction(constants.CHAT_DELETE_MESSAGE_IDLE)
export const chatDeleteMessageRequest = createAction(constants.CHAT_DELETE_MESSAGE_REQUEST)
export const chatDeleteMessageSuccess = createAction(constants.CHAT_DELETE_MESSAGE_SUCCESS)
export const chatDeleteMessageFailure = createAction(constants.CHAT_DELETE_MESSAGE_FAILURE)

/**
 *
 */
export const chatFlagMessageIdle = createAction(constants.CHAT_FLAG_MESSAGE_IDLE)
export const chatFlagMessageRequest = createAction(constants.CHAT_FLAG_MESSAGE_REQUEST)
export const chatFlagMessageSuccess = createAction(constants.CHAT_FLAG_MESSAGE_SUCCESS)
export const chatFlagMessageFailure = createAction(constants.CHAT_FLAG_MESSAGE_FAILURE)
