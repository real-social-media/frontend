import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'
import Config from 'react-native-config'
import * as Logger from 'services/Logger'

class TokenExpiredError extends Error {
  constructor(...args) {
    super(...args)
    this.code = 'TOKEN_EXPIRED'
  }
}

GoogleSignin.configure({
  offlineAccess: false,
  iosClientId: Config.GOOGLE_SIGNIN_IOS_CLIENT_ID,
  webClientId: Config.GOOGLE_SIGNIN_ANDROID_CLIENT_ID,
})

const checkTokenExpiry = async (idToken) => {
  const data = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
  const response = await data.json()
  
  if (!response || response.error) {
    throw new TokenExpiredError('Token expired')
  }

  return response
}

export const signin = async () => {
  try {
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn()
    const tokeninfo = await checkTokenExpiry(userInfo.idToken)

    return {
      token: userInfo.idToken,
      expires_at: tokeninfo.exp,
      user: userInfo.user,
    }
  } catch (error) {
    if (error.code === 'TOKEN_EXPIRED') {
      Logger.withScope(scope => {
        scope.setExtra('code', 'TOKEN_EXPIRED')
        Logger.captureMessage('GOOGLE_SIGNIN')
      })
    } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Logger.withScope(scope => {
        scope.setExtra('code', 'SIGN_IN_CANCELLED')
        Logger.captureMessage('GOOGLE_SIGNIN')
      })
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Logger.withScope(scope => {
        scope.setExtra('code', 'IN_PROGRESS')
        Logger.captureMessage('GOOGLE_SIGNIN')
      })
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Logger.withScope(scope => {
        scope.setExtra('code', 'PLAY_SERVICES_NOT_AVAILABLE')
        Logger.captureMessage('GOOGLE_SIGNIN')
      })
    } else {
      Logger.captureException(error)
    }

    throw error
  }
}

export const refresh = async () => {
  try {
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signInSilently()
    const tokeninfo = await checkTokenExpiry(userInfo.idToken)

    return {
      token: userInfo.idToken,
      expires_at: tokeninfo.exp,
      user: userInfo.user,
    }
  } catch (error) {
    if (error.code === 'TOKEN_EXPIRED') {
      Logger.withScope(scope => {
        scope.setExtra('code', 'TOKEN_EXPIRED')
        Logger.captureMessage('GOOGLE_REFRESH')
      })
    } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      Logger.withScope(scope => {
        scope.setExtra('code', 'SIGN_IN_REQUIRED')
        Logger.captureMessage('GOOGLE_REFRESH')
      })
    } else {
      Logger.captureException(error)
    }

    throw error
  }
}

export const signout = async () => {
  await GoogleSignin.revokeAccess()
  await GoogleSignin.signOut()
}