import appleAuth, {
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication'

class AppleCredentialsError extends Error {
  constructor(...args) {
    super(...args)
    this.code = 'APPLE_CREDENTIALS_ERROR'
  }
}

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

  return {
    token: appleAuthRequestResponse.identityToken,
    expires_at: Date.now(),
    user: {
      id: appleAuthRequestResponse.user,
      email: appleAuthRequestResponse.email,
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

  return {
    token: appleAuthRequestResponse.identityToken,
    expires_at: Date.now(),
    user: {
      id: appleAuthRequestResponse.user,
      email: appleAuthRequestResponse.email,
    },
  }
}

export const signout = async () => {
  await appleAuth.performRequest({
    requestedOperation: AppleAuthRequestOperation.LOGOUT,
    requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
  })
}
