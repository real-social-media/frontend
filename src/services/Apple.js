import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication'
import jwt from 'jwt-decode'

class AppleCredentialsError extends Error {
  constructor(...args) {
    super(...args)
    this.code = 'APPLE_CREDENTIALS_ERROR'
  }
}

/**
 * Generate expiry time which is 50mins
 */
const generateTokenExpiry = () => Math.floor(Date.now() / 1000 + 60 * 1000 * 50)

export const signin = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: AppleAuthRequestOperation.LOGIN,
    requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
  })

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

  // use credentialState response to ensure the user is authenticated
  if (credentialState !== AppleAuthCredentialState.AUTHORIZED) {
    throw new AppleCredentialsError('Invalid apple signin credentials state')
  }

  const payload = jwt(appleAuthRequestResponse.identityToken)

  return {
    token: appleAuthRequestResponse.identityToken,
    expires_at: generateTokenExpiry(),
    user: {
      id: appleAuthRequestResponse.user,
      email: payload.email,
    },
  }
}

export const refresh = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: AppleAuthRequestOperation.REFRESH,
    requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
  })

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

  // use credentialState response to ensure the user is authenticated
  if (credentialState !== AppleAuthCredentialState.AUTHORIZED) {
    throw new AppleCredentialsError('Invalid apple signin credentials state')
  }

  const payload = jwt(appleAuthRequestResponse.identityToken)

  return {
    token: appleAuthRequestResponse.identityToken,
    expires_at: generateTokenExpiry(),
    user: {
      id: appleAuthRequestResponse.user,
      email: payload.email,
    },
  }
}

export const signout = async () => {
  await appleAuth.performRequest({
    requestedOperation: AppleAuthRequestOperation.LOGOUT,
    requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
  })
}