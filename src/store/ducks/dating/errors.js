import * as constants from 'store/ducks/dating/constants'

const messageCodes = {
  [constants.DATING_MATCHED_USERS_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully fetched matched users',
    },
  },
  [constants.DATING_MATCHED_USERS_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to fetch matched users',
    },
  },

  [constants.DATING_CONFIRMED_USERS_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully fetched matched users',
    },
  },
  [constants.DATING_CONFIRMED_USERS_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to fetch matched users',
    },
  },
}

export const getMessagePayload = (key, status = 'GENERIC', nativeError = '') => {
  return ({
    ...messageCodes[key][status],
    nativeError,
  })
}