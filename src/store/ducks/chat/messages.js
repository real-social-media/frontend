import * as constants from 'store/ducks/chat/constants'

export default {
  /**
   *
   */
  [constants.CHAT_ADD_MESSAGE_FAILURE]: {
    USER_NOT_FOUND: {
      code: 'USER_NOT_FOUND',
      text: 'User does not exist',
    },
  },
}
