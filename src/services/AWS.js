import Auth from '@aws-amplify/auth'
import Api from '@aws-amplify/api'
import Config from 'react-native-config'
import * as Google from 'services/Google'
import * as Apple from 'services/Apple'
import DeviceInfo from 'react-native-device-info'

/**
 * AWS Configuration
 */
export const amplifyConfig = async () => {
  Auth.configure({
    region: Config.AWS_COGNITO_REGION,
    userPoolId: Config.AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: Config.AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
    identityPoolId: Config.AWS_COGNITO_IDENTITY_POOL_ID,
    refreshHandlers: {
      'google': Google.refresh,
      'apple': Apple.refresh,
    },
  })

  Api.configure({
    aws_appsync_graphqlEndpoint: Config.AWS_APPSYNC_GRAPHQL_ENDPOINT,
    aws_appsync_region: Config.AWS_COGNITO_REGION,
    aws_appsync_authenticationType: Config.AWS_APPSYNC_AUTHENTICATION_TYPE,
    aws_appsync_apiKey: 'null',
    graphql_headers: async () => ({
      'x-real-version': await DeviceInfo.getReadableVersion(),
      'x-real-device': DeviceInfo.getDeviceId(),
      'x-real-system': DeviceInfo.getSystemName(),
    }),
  })
}

export const federatedGoogleSignin = Google.signin
export const federatedGoogleSignout = Google.signout

export const federatedAppleSignin = Apple.signin
export const federatedAppleSignout = Apple.signout