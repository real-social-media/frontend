import * as constants from 'store/ducks/signup/constants'

const messageCodes = {
  /**
   * 
   */
  [constants.SIGNUP_CREATE_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully create account',
    },
  },
  [constants.SIGNUP_CREATE_FAILURE]: {
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
    INVALID_PARAMETER: {
      code: 'INVALID_PARAMETER',
      text: 'Invalid Email or Phone number provided',
    },
  },

  /**
   * 
   */
  [constants.SIGNUP_CONFIRM_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully confirmed account, you can signin now',
    },
  },
  [constants.SIGNUP_CONFIRM_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to confirm account',
    },
    CODE_MISMATCH: {
      code: 'CODE_MISMATCH',
      text: 'Invalid verification code provided',
    },
    CODE_EXPIRED: {
      code: 'CODE_EXPIRED',
      text: 'Provided verification code has expired',
    },
    ALIAS_EXISTS: {
      code: 'ALIAS_EXISTS',
      text: 'An account with this email / phone number already exists',
    },
  },

  /**
   * 
   */
  [constants.SIGNUP_USERNAME_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Username is available',
    },
  },
  [constants.SIGNUP_USERNAME_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to reserve username',
    },
    USER_EXISTS: {
      code: 'USER_EXISTS',
      text: 'Username is not available',
    },
  },

  /**
   * 
   */
  [constants.SIGNUP_COGNITO_SUCCESS]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Successfully signed up',
    },
  },
  [constants.SIGNUP_COGNITO_FAILURE]: {
    GENERIC: {
      code: 'GENERIC',
      text: 'Failed to sign up',
    },
  },
}

export const getMessagePayload = (key, status = 'GENERIC', nativeError = '') => {
  return ({
    ...messageCodes[key][status],
    nativeError,
  })
}