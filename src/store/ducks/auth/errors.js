import * as constants from 'store/ducks/auth/constants'

const messageCodes = {
  /**
   * 
   */
  [constants.AUTH_CHECK_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully authorized',
    },
  },
  [constants.AUTH_CHECK_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to authorize',
    },
    USER_JUST_CREATED: {
      code: 'USER_JUST_CREATED',
      text: 'Username must be assigned',
    },
    PROFILE_PHOTO_MISSING: {
      code: 'PROFILE_PHOTO_MISSING',
      text: 'Profile photo must be set up',
    },
    NETWORK: {
      code: 'NETWORK',
      text: 'Cannot proceed due to network error',
    },
  },

  /**
   * 
   */
  [constants.AUTH_SIGNIN_COGNITO_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully signed in',
    },
  },
  [constants.AUTH_SIGNIN_COGNITO_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to signin',
    },
    USER_NOT_FOUND: {
      code: 'USER_NOT_FOUND',
      text: 'User does not exist',
    },
    USER_NOT_AUTHORIZED: {
      code: 'USER_NOT_AUTHORIZED',
      text: 'Incorrect username or password',
    },
    USER_NOT_CONFIRMED: {
      code: 'USER_NOT_CONFIRMED',
      text: 'User is not confirmed',
    },
    INVALID_PARAMETER: {
      code: 'INVALID_PARAMETER',
      text: 'Username or Password field has invalid characters',
    },
  },

  [constants.AUTH_SIGNIN_GOOGLE_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully signed with Google',
    },
  },
  [constants.AUTH_SIGNIN_GOOGLE_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to sign with Google',
    },
    CANCELED: {
      code: 'CANCELED',
      text: 'Google signin was canceled',
    },
  },

  [constants.AUTH_SIGNIN_APPLE_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully signed with Apple',
    },
  },
  [constants.AUTH_SIGNIN_APPLE_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to sign with Apple',
    },
  },

  [constants.AUTH_SIGNOUT_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully signed out',
    },
  },
  [constants.AUTH_SIGNOUT_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to sign out',
    },
  },

  /**
   * 
   */
  [constants.AUTH_FORGOT_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully reset the password',
    },
  },
  [constants.AUTH_FORGOT_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to reset the password',
    },
    USER_NOT_FOUND: {
      code: 'USER_NOT_FOUND',
      text: 'User does not exist',
    },
  },

  /**
   * 
   */
  [constants.AUTH_FORGOT_CONFIRM_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully confirmed new password',
    },
  },
  [constants.AUTH_FORGOT_CONFIRM_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to confirm new password',
    },
    INVALID_PASSWORD: {
      code: 'INVALID_PASSWORD',
      text: 'Password did not conform with policy: Password must have uppercase-alpha-numeric-special characters',
    },
    CODE_MISMATCH: {
      code: 'CODE_MISMATCH',
      text: 'Invalid verification code provided',
    },
  },

  /**
   * 
   */
  [constants.AUTH_SIGNIN_ANONYMOUS_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully created anonymous user',
    },
  },
  [constants.AUTH_SIGNIN_ANONYMOUS_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to create anonymous user',
    },
  },

  /**
   * 
   */
  [constants.AUTH_FLOW_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Auth flow completed',
    },
  },
  [constants.AUTH_FLOW_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to complete auth flow',
    },
  },

  /**
   * 
   */
  [constants.AUTH_DATA_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Auth data is fetched',
    },
  },
  [constants.AUTH_DATA_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to fetch auth data',
    },
    USER_DOES_NOT_EXIST: {
      code: 'USER_DOES_NOT_EXIST',
      text: 'User does not exist',
    },
  },

  /**
   * 
   */
  [constants.AUTH_TOKEN_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Auth token is fetched',
    },
  },
  [constants.AUTH_TOKEN_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to fetch auth token',
    },
  },

  /**
   * 
   */
  [constants.AUTH_PREFETCH_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Auth prefetch is completed',
    },
  },
  [constants.AUTH_PREFETCH_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to complete auth prefetch',
    },
  },

  /**
   * 
   */
  [constants.AUTH_RESET_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Cognito credentials have been reset',
    },
  },
  [constants.AUTH_RESET_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Cannot reset cognito credentials',
    },
  },
}

export const getMessagePayload = (key, status = 'GENERIC', nativeError = '') => {
  return ({
    ...messageCodes[key][status],
    nativeError,
  })
}