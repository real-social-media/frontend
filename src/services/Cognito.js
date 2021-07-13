import Storage, { STORAGE_KEYS } from 'services/Storage'
import Config from 'react-native-config'
import base64 from 'react-native-base64'

const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

export const getCognitoCredentials = async () => {
  const credentials = await Storage.getItem(STORAGE_KEYS.AUTH_COGNITO)
  const parsed = JSON.parse(credentials)
  return parsed
}

export const getUsernameFromAccessToken = (accessToken) => {
  const input = accessToken.split('.')[1]
  const decoded = base64.decode(input)
  return JSON.parse(decoded)
}

export const authRefresh = async (identityId, refreshToken) => {
  const token = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: refreshToken })

  const poolData = {
    UserPoolId: Config.AWS_COGNITO_USER_POOL_ID,
    ClientId: Config.AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
  }
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  const userData = {
    Username: identityId,
    Pool: userPool,
  }

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

  const session = await (new Promise((resolve, reject) => {
    cognitoUser.refreshSession(token, function (error, session) {
      if (error) reject(error)
      else resolve(session)
    })
  }))

  return {
    AccessToken: session.getAccessToken().getJwtToken(),
    ExpiresIn: session.getIdToken().getExpiration() * 1000,
    TokenType: 'Bearer',
    RefreshToken: session.getRefreshToken().token,
    IdToken: session.getIdToken().getJwtToken(),
  }
}


export const refresh = async () => {
  const credentials = await getCognitoCredentials()
  const identityId = getUsernameFromAccessToken(credentials.AccessToken).username
  const tokens = await authRefresh(identityId, credentials.RefreshToken)

  return {
    token: tokens.IdToken,
    expires_at: tokens.ExpiresIn,
    identity_id: identityId,
  }
}
