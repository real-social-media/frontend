import * as AWS from 'aws-sdk/global'
import { put, takeLatest, getContext, takeEvery } from 'redux-saga/effects'
import path from 'ramda/src/path'
import {
  federatedFacebookSignin,
  federatedGoogleSignin,
  federatedGoogleSignout,
} from 'services/AWS'
import * as actions from 'store/ducks/auth/actions'
import * as queries from 'store/ducks/auth/queries'
import * as constants from 'store/ducks/auth/constants'
import * as errors from 'store/ducks/auth/errors'
import * as CognitoIdentity from 'amazon-cognito-identity-js'
import Config from 'react-native-config'
import AsyncStorage from '@react-native-community/async-storage'
import { promisify } from 'es6-promisify'
import * as queryService from 'services/Query'

function* getSignupStage({ username }) {
  return yield AsyncStorage.getItem(`@real:signup:${username}`)
}

function* saveSignupStage({ username, identity }) {
  return yield AsyncStorage.setItem(`@real:signup:${username}`, identity)
}

function* clearSignupStage({ username }) {
  return yield AsyncStorage.removeItem(`@real:signup:${username}`)
}

/**
 * Links identity pool with user pool. Linking will be done at:
 * - handleAuthSignupConfirmRequest for code based signup confirmation
 * - handleAuthSigninRequest for deeplink based signup confirmation
 */
function* linkUserIdentities(payload) {
  const authenticationDetails = new CognitoIdentity.AuthenticationDetails({
    Username: payload.username,
    Password: payload.password,
  })

  const userPool = new CognitoIdentity.CognitoUserPool({
    UserPoolId: Config.AWS_COGNITO_USER_POOL_ID,
    ClientId: Config.AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
  })

  const cognitoUser = new CognitoIdentity.CognitoUser({
    Username: payload.username,
    Pool: userPool,
  })

  const authenticateUser = yield new Promise((onSuccess, onFailure) =>
    cognitoUser.authenticateUser(authenticationDetails, { onSuccess, onFailure })
  )

  AWS.config.region = Config.AWS_COGNITO_REGION
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityId: payload.username,
    IdentityPoolId: Config.AWS_COGNITO_IDENTITY_POOL_ID,
    Logins: {
      [`cognito-idp.${Config.AWS_COGNITO_REGION}.amazonaws.com/${Config.AWS_COGNITO_USER_POOL_ID}`]: authenticateUser.getIdToken().getJwtToken(),
    },
  })
  
  yield promisify(AWS.config.credentials.refresh.bind(AWS.config.credentials))()
  yield cognitoUser.signOut()
}

/**
 * Finish auth profile create per provider, this step will be triggered (via authCheckRequest if
 * self graphql query returns an error or empty user) after:
 * - authSignupConfirm: for cognito user
 * - authFacebookSuccess: for facebook user
 * - authGoogleSuccess: for google user
 * 
 * Calling this function will create a new entry in dynamo on the backend with provided data.
 * Facebook and Google tokens must be passed when authorized via FederatedAuth. 
 * 
 */
function* handleAuthOnboardRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')

  const data = yield AwsAuth.currentAuthenticatedUser({
    bypassCache: false,
  })

  if (data.authProvider === 'FACEBOOK') {
    yield queryService.apiRequest(queries.createFacebookUser, {
      username: payload.username,
      fullName: payload.fullName,
      facebookAccessToken: data.token,
    })
  } else if (data.authProvider === 'GOOGLE') {
    yield queryService.apiRequest(queries.createGoogleUser, {
      username: payload.username,
      fullName: payload.fullName,
      googleIdToken: data.token,
    })
  } else {
    yield queryService.apiRequest(queries.createCognitoOnlyUser, {
      username: payload.username,
      fullName: payload.fullName,
    })
  }

  yield queryService.apiRequest(queries.setUserAcceptedEULAVersion, { version: '15-11-2019' })
}

function* authOnboardRequest(req) {
  try {
    yield handleAuthOnboardRequest(req.payload)

    const data = yield queryService.apiRequest(queries.self, req.payload)
    const selector = path(['data', 'self'])

    yield put(actions.authCheckReady({
      data: { userId: selector(data).userId },
    }))

    yield put(actions.globalAuthUserTrigger({
      data: selector(data),
    }))

    yield put(actions.authOnboardSuccess({
      message: errors.getMessagePayload(constants.AUTH_ONBOARD_SUCCESS, 'GENERIC'),
      data: selector(data),
      nextRoute: 'OnboardPhoto',
    }))
  } catch (error) {
    const errorMessage = path(['errors', '0', 'message'])(error)
    if (errorMessage && errorMessage.includes('already exists')) {
      yield put(actions.authOnboardFailure({
        message: errors.getMessagePayload(constants.AUTH_ONBOARD_FAILURE, 'USER_EXISTS', error.message),
      }))
    } else if (errorMessage && errorMessage.includes('already taken')) {
      yield put(actions.authOnboardFailure({
        message: errors.getMessagePayload(constants.AUTH_ONBOARD_FAILURE, 'USER_TAKEN', error.message),
        nextRoute: 'AuthHome',
      }))
    } else if (errorMessage && errorMessage.includes('does not validate')) {
      yield put(actions.authOnboardFailure({
        message: errors.getMessagePayload(constants.AUTH_ONBOARD_FAILURE, 'INVALID_USERNAME', error.message),
        nextRoute: 'AuthHome',
      }))
    } else {
      yield put(actions.authOnboardFailure({
        message: errors.getMessagePayload(constants.AUTH_ONBOARD_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

/**
 * AwsAuth.currentAuthenticatedUser method is used to check if a user is logged in.
 * It will throw an error if there is no user logged in.
 */
function* handleAuthCheckRequest() {
  const AwsAuth = yield getContext('AwsAuth')
  yield AwsAuth.currentCredentials()
  yield AwsAuth.currentAuthenticatedUser({
    bypassCache: false,
  })
}

function handleAuthCheckValidation(self) {
  const photoUrl = path(['photo', 'url'])(self)
  if (!photoUrl || photoUrl.includes('placeholder-photos')) {
    throw new Error('PROFILE_PHOTO_MISSING')
  }
}

/**
 * Check if user is logged in, not authenticated users will be redirected to Auth page.
 * Authenticated users with empty `self graphql query` return will be redirected to Onboard page,
 * meaning that user authenticated in Cognito pool but didn't create an entry in database on backend.
 */
function* authCheckRequest(req) {
  try {
    yield handleAuthCheckRequest(req.payload)

    const data = yield queryService.apiRequest(queries.self, req.payload)
    const selector = path(['data', 'self'])

    yield put(actions.authCheckReady({
      data: { userId: selector(data).userId },
    }))

    handleAuthCheckValidation(selector(data))

    yield put(actions.authCheckSuccess({
      message: errors.getMessagePayload(constants.AUTH_CHECK_SUCCESS, 'GENERIC'),
      data: selector(data),
      nextRoute: 'Root',
    }))
  } catch (error) {
    if (path(['message'])(error) === 'PROFILE_PHOTO_MISSING') {
      yield put(actions.authCheckFailure({
        message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'PROFILE_PHOTO_MISSING', error.message),
        nextRoute: 'OnboardPhoto',
      }))
    } else if (path(['errors', '0', 'path', '0'])(error) === 'self') {
      yield put(actions.authCheckFailure({
        message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'USER_JUST_CREATED', error.message),
        nextRoute: 'OnboardName',
      }))
    } else {
      yield put(actions.authCheckFailure({
        message: errors.getMessagePayload(constants.AUTH_CHECK_FAILURE, 'GENERIC', error.message),
        nextRoute: 'AuthHome',
      }))
    }
  }
}

/**
 * Signin user. Currently supports email and password or phone number and password methods
 */
function* handleAuthSigninRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  
  /**
   * getSignupStage will return identityId if user is not linked during confirmSignup action
   * if user was linked during confirmSignup identity will return null.
   * User migh not get linked because he used confirmSignup with deep link which
   * doesnt has password field. Once identites are linked we should clear identity from async
   * storage meaning that user successfully confirmed.
   */
  const identity = yield getSignupStage({ username: payload.username })
  if (identity && payload.password) {
    yield linkUserIdentities({
      username: identity,
      password: payload.password,
    })
    yield clearSignupStage({ username: payload.username })
  }

  yield AwsAuth.signIn(payload.username, payload.password)
}

function* authSigninRequest(req) {
  try {
    const data = yield handleAuthSigninRequest(req.payload)
    yield put(actions.authSigninSuccess({ data, nextRoute: 'Root' }))
  } catch (error) {
    if (error.code === 'UserNotConfirmedException') {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_CONFIRMED'),
        nextRoute: 'AuthSignup',
      }))
    } else if (error.code === 'UserNotFoundException') {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_FOUND'),
        nextRoute: 'AuthSignup',
      }))
    } else if (error.code === 'NotAuthorizedException') {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'USER_NOT_AUTHORIZED'),
      }))
    } else if (error.code === 'InvalidParameterException') {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'INVALID_PARAMETER'),
      }))
    } else {
      yield put(actions.authSigninFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNIN_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

/**
 * Signup works in a following way:
 * - creates new entry [credentials] using AWS.CognitoIdentity (in Identity Pool)
 * - creates new entry [user] using AwsAuth.signUp (in User Pool) with username === identityId
 * 
 * this enables having same username in both identiyId and userId. identityId generated at authSignupRequest
 * will later be passed to authSignupConfirmRequest to confirm this user. Loosing identiyId between transition
 * will fail signup process!
 */
function* handleAuthSignupRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')

  const cognitoIndentityPoolClient = new AWS.CognitoIdentity({
    params: {
      IdentityPoolId: Config.AWS_COGNITO_IDENTITY_POOL_ID,
    },
    region: Config.AWS_COGNITO_REGION,
  })
  const credentials = yield cognitoIndentityPoolClient.getId().promise()
  const username = credentials.IdentityId

  const attributes = (() => {
    if (payload.usernameType === 'email') return { email: payload.email }
    if (payload.usernameType === 'phone') return { phone_number: payload.phone }
    return {}
  })()

  /**
   * Saving username:identity combination into AsyncStorage to enabled userConfirm
   * using deeplink. AsyncStorage entry should be cleared after successful linking.
   */
  yield saveSignupStage({
    username: payload.email || payload.phone,
    identity: username,
  })

  const signup = yield AwsAuth.signUp({
    username: username,
    password: payload.password,
    attributes: attributes,
    validationData: [],
  })

  if (!path(['codeDeliveryDetails', 'DeliveryMedium'])(signup)) {
    throw new Error('USER_CONFIRMATION_DELIVERY')
  }

  return {
    username: path(['user', 'username'])(signup),
    delivery: path(['codeDeliveryDetails', 'DeliveryMedium'])(signup),
  }
}

function* authSignupRequest(req) {
  try {
    const data = yield handleAuthSignupRequest(req.payload)
    yield put(actions.authSignupSuccess({
      message: errors.getMessagePayload(constants.AUTH_SIGNUP_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.message === 'USER_CONFIRMATION_DELIVERY') {
      yield put(actions.authSignupFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNUP_FAILURE, 'USER_CONFIRMATION_DELIVERY', error.message),
      }))
    } else if (error.code === 'UsernameExistsException') {
      yield put(actions.authSignupFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNUP_FAILURE, 'USER_EXISTS', error.message),
      }))
    } else if (error.code === 'InvalidPasswordException') {
      yield put(actions.authSignupFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNUP_FAILURE, 'INVALID_PASSWORD', error.message),
      }))
    } else if (error.code === 'InvalidParameterException') {
      yield put(actions.authSignupFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNUP_FAILURE, 'INVALID_PARAMETER', error.message),
      }))
    } else {
      yield put(actions.authSignupFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNUP_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

/**
 * 
 */

function* handleAuthSignupResendRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  
  return yield AwsAuth.resendSignUp(payload.username)
}

function* authSignupResendRequest(req) {
  try {
    const data = yield handleAuthSignupResendRequest(req.payload)
    yield put(actions.authSignupResendSuccess({
      message: errors.getMessagePayload(constants.AUTH_SIGNUP_RESEND_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    yield put(actions.authSignupResendFailure({
      message: errors.getMessagePayload(constants.AUTH_SIGNUP_RESEND_FAILURE, 'GENERIC', error.message),
    }))
  }
}

/**
 * Signup Confirm will confirm entry from user pool using `AwsAuth.confirmSignUp`,
 * where username is an identityId generated at authSignupRequest.
 * After user is confirmed it will sign with password using `authenticateUser`
 * and set `AWS.config.credentials` with Logins array, which binds an identity pool
 * entry to user pool entry. Loosing identiyId between transition
 * will fail signup process!
 */
function* handleAuthSignupConfirmRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')

  yield AwsAuth.confirmSignUp(payload.username, payload.confirmationCode, {
    forceAliasCreation: false,
  })

  /**
   * user will get user pool and identity pool linked only if he used code verification
   * in which we persist username and password in reducers. If user confirmed his account
   * via deeplink his identites will not be linked. Linking will be moved to authSignin
   * handler, which will know linking status by asyncStorage entry called @real:signup:${id}
   * therefore we should clear that entry if confirm and linking were successful.
   */
  if (payload.username && payload.password) {
    yield linkUserIdentities({
      username: payload.username,
      password: payload.password,
    })
    yield clearSignupStage({ username: payload.username })
  }
}

/**
 *
 */
function* authSignupConfirmRequest(req) {
  try {
    const data = yield handleAuthSignupConfirmRequest(req.payload)
    yield put(actions.authSignupConfirmSuccess({
      message: errors.getMessagePayload(constants.AUTH_SIGNUP_CONFIRM_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.code === 'CodeMismatchException') {
      yield put(actions.authSignupConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNUP_CONFIRM_FAILURE, 'CODE_MISMATCH', error.message),
      }))
    } else {
      yield put(actions.authSignupConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_SIGNUP_CONFIRM_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

/**
 *
 */
function* handleAuthForgotRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  return yield AwsAuth.forgotPassword(payload.username)
}

/**
 *
 */
function* authForgotRequest(req) {
  try {
    const data = yield handleAuthForgotRequest(req.payload)
    yield put(actions.authForgotSuccess({
      message: errors.getMessagePayload(constants.AUTH_FORGOT_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      yield put(actions.authForgotFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_FAILURE, 'USER_NOT_FOUND', error.message),
      }))
    } else {
      yield put(actions.authForgotFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

/**
 *
 */
function* handleAuthForgotConfirmRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  return yield AwsAuth.forgotPasswordSubmit(payload.username, payload.code, payload.password)
}

/**
 *
 */
function* authForgotConfirmRequest(req) {
  try {
    const data = yield handleAuthForgotConfirmRequest(req.payload)
    yield put(actions.authForgotConfirmSuccess({
      message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.code === 'InvalidPasswordException') {
      yield put(actions.authForgotConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'INVALID_PASSWORD', error.message),
      }))
    } else if (error.code === 'CodeMismatchException') {
      yield put(actions.authForgotConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'CODE_MISMATCH', error.message),
      }))
    } else {
      yield put(actions.authForgotConfirmFailure({
        message: errors.getMessagePayload(constants.AUTH_FORGOT_CONFIRM_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

/**
 *
 */
function* handleAuthFacebookRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')

  const facebook = yield federatedFacebookSignin()

  const userPayload = {
    id: facebook.user.id,
    name: facebook.user.name,
    email: facebook.user.email,
    authProvider: 'FACEBOOK',
    token: facebook.token,
  }

  const FacebookCognitoIdentityCredentials = yield AwsAuth.federatedSignIn('facebook', {
    token: facebook.token,
    expires_at: facebook.expires_at,
  }, userPayload)

  AWS.config.region = Config.AWS_COGNITO_REGION
  AWS.config.credentials = FacebookCognitoIdentityCredentials

  return facebook
}

/**
 *
 */
function* authFacebookRequest(req) {
  try {
    const data = yield handleAuthFacebookRequest(req.payload)
    yield put(actions.authFacebookSuccess({
      message: errors.getMessagePayload(constants.AUTH_FACEBOOK_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    yield put(actions.authFacebookFailure({
      message: errors.getMessagePayload(constants.AUTH_FACEBOOK_FAILURE, 'GENERIC', error.message),
    }))
  }
}

/**
 *
 */
function* handleAuthGoogleRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')

  const google = yield federatedGoogleSignin()

  const userPayload = {
    id: google.user.id,
    name: google.user.name,
    email: google.user.email,
    authProvider: 'GOOGLE',
    token: google.token,
  }

  const GoogleCognitoIdentityCredentials = yield AwsAuth.federatedSignIn('google', {
    token: google.token,
    expires_at: google.expires_at,
  }, userPayload)

  AWS.config.region = Config.AWS_COGNITO_REGION
  AWS.config.credentials = GoogleCognitoIdentityCredentials

  return google
}

/**
 *
 */
function* authGoogleRequest(req) {
  try {
    const data = yield handleAuthGoogleRequest(req.payload)
    yield put(actions.authGoogleSuccess({
      message: errors.getMessagePayload(constants.AUTH_GOOGLE_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    yield put(actions.authGoogleFailure({
      message: errors.getMessagePayload(constants.AUTH_GOOGLE_FAILURE, 'GENERIC', error.message),
    }))
  }
}

/**
 *
 */
function* handleAuthSignoutRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')
  const AwsCache = yield getContext('AwsCache')
  const AwsCredentials = yield getContext('AwsCredentials')

  try {
    yield federatedGoogleSignout()
  } catch (error) {}

  yield AwsAuth.signOut({ global: true })
  yield AwsCredentials.clear()
  yield AwsCache.clear()
}

function* authSignoutRequest(persistor, req) {
  try {
    const data = yield handleAuthSignoutRequest(req.payload)
    yield persistor.purge()

    yield put(actions.authSignoutSuccess({
      message: errors.getMessagePayload(constants.AUTH_SIGNOUT_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    yield put(actions.authSignoutFailure({
      message: errors.getMessagePayload(constants.AUTH_SIGNOUT_FAILURE, 'GENERIC', error.message),
    }))
  }
}

export default (persistor) => [
  takeLatest(constants.AUTH_ONBOARD_REQUEST, authOnboardRequest),
  takeEvery(constants.AUTH_CHECK_REQUEST, authCheckRequest),
  takeEvery(constants.AUTH_SIGNIN_REQUEST, authSigninRequest),
  takeLatest(constants.AUTH_SIGNUP_REQUEST, authSignupRequest),
  takeLatest(constants.AUTH_SIGNUP_RESEND_REQUEST, authSignupResendRequest),
  takeLatest(constants.AUTH_SIGNUP_CONFIRM_REQUEST, authSignupConfirmRequest),
  takeLatest(constants.AUTH_FORGOT_REQUEST, authForgotRequest),
  takeLatest(constants.AUTH_FORGOT_CONFIRM_REQUEST, authForgotConfirmRequest),
  takeEvery(constants.AUTH_FACEBOOK_REQUEST, authFacebookRequest),
  takeEvery(constants.AUTH_GOOGLE_REQUEST, authGoogleRequest),
  takeEvery(constants.AUTH_SIGNOUT_REQUEST, authSignoutRequest, persistor),
]