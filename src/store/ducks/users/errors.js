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
  [constants.USERS_DELETE_AVATAR_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Profile photo delete failed. Please try again',
    },
  },
  [constants.USERS_SET_USER_DATING_STATUS_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Unable to set user dating status',
    },
  },
}

export const getMessagePayload = (key, status = 'GENERIC', nativeError = '') => {
  return ({
    ...messageCodes[key][status],
    nativeError,
  })
}