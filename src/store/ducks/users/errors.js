import * as constants from 'store/ducks/users/constants'

const messageCodes = {
  /**
   *
   */
  [constants.USERS_EDIT_PROFILE_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully updated profile',
    },
  },
  [constants.USERS_EDIT_PROFILE_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to update profile',
    },
    VERIFICATION_FAILED: {
      code: 'VERIFICATION_FAILED',
      text: 'Verification failed. Please add an unmodified profile picture. Our AI detects photoshop and filters',
    },
  },
}

export const getMessagePayload = (key, status = 'GENERIC', nativeError = '') => {
  return {
    ...messageCodes[key][status],
    nativeError,
  }
}
