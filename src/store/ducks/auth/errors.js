import * as constants from 'store/ducks/auth/constants'
import * as Logger from 'services/Logger'

const messageCodes = {
  /**
   * 
   */
  [constants.AUTH_ONBOARD_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully created profile',
    },
  },
  [constants.AUTH_ONBOARD_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to create profile',
    },
    INVALID_USERNAME: {
      code: 'INVALID_USERNAME',
      text: 'Username must contain only letters & numbers',
    },
    USER_TAKEN: {
      code: 'USER_TAKEN',
      text: 'Username you entered already reserved',
    },
    USER_EXISTS: {
      code: 'USER_EXISTS',
      text: 'You have already created an account',
    },
  },

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
  },

  /**
   * 
   */
  [constants.AUTH_SIGNIN_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully signed in',
    },
  },
  [constants.AUTH_SIGNIN_FAILURE]: {
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

  /**
   * 
   */
  [constants.AUTH_SIGNUP_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully create account',
    },
  },
  [constants.AUTH_SIGNUP_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to create account',
    },
    USER_CONFIRMATION_DELIVERY: {
      code: 'USER_CONFIRMATION_DELIVERY',
      text: 'Failed to deliver confirmation code',
    },
    USER_EXISTS: {
      code: 'USER_EXISTS',
      text: 'User already signed up but did not confirm email address or phone number',
    },
    INVALID_PASSWORD: {
      code: 'INVALID_PASSWORD',
      text: 'Password did not conform with policy: Password must have uppercase-alpha-numeric-special characters',
    },
  },

  /**
   * 
   */
  [constants.AUTH_SIGNUP_RESEND_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully re-sent confirmation code',
    },
  },
  [constants.AUTH_SIGNUP_RESEND_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to re-send confirmation code',
    },
  },

  /**
   * 
   */
  [constants.AUTH_SIGNUP_CONFIRM_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully confirmed account, you can signin now',
    },
  },
  [constants.AUTH_SIGNUP_CONFIRM_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to confirm account',
    },
    CODE_MISMATCH: {
      code: 'CODE_MISMATCH',
      text: 'Invalid verification code provided',
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
  [constants.AUTH_FACEBOOK_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully signed in via Facebook',
    },
  },
  [constants.AUTH_FACEBOOK_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to sign in via Facebook',
    },
  },

  [constants.AUTH_GOOGLE_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully signed in via Google',
    },
  },
  [constants.AUTH_GOOGLE_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to sign in via Google',
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
}

export const getMessagePayload = (key, status = 'GENERIC', nativeError = '') => {
  if (typeof key === 'string' && key.includes('FAILURE')) {
    Logger.captureException(nativeError)
    Logger.captureMessage(`${key}:${status}`)
  }

  return ({
    ...messageCodes[key][status],
    nativeError,
  })
}