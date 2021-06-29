import * as constants from 'store/ducks/auth/constants'

export default {
  /**
   *
   */
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

  [constants.AUTH_SIGNIN_APPLE_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to sign with Apple',
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
  [constants.AUTH_SIGNIN_ANONYMOUS_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to create anonymous user',
    },
  },

  /**
   *
   */
  [constants.AUTH_FLOW_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to complete auth flow',
    },
  },

  /**
   *
   */
  [constants.AUTH_PREFETCH_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to complete auth prefetch',
    },
  },
}
