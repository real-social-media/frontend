import * as AWS from 'aws-sdk/global'
import { put, takeLatest, getContext } from 'redux-saga/effects'
import * as CognitoIdentity from 'amazon-cognito-identity-js'
import Config from 'react-native-config'
import AsyncStorage from '@react-native-community/async-storage'
import path from 'ramda/src/path'
import { promisify } from 'es6-promisify'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as errors from 'store/ducks/signup/errors'

function* signupUsernameRequest(req) {
  yield put(actions.signupUsernameSuccess({ payload: req.payload }))
}

function* signupPhoneRequest(req) {
  yield put(actions.signupPhoneSuccess({ payload: req.payload }))
}

function* signupEmailRequest(req) {
  yield put(actions.signupEmailSuccess({ payload: req.payload }))
}

function* signupPasswordRequest(req) {
  yield put(actions.signupPasswordSuccess({ payload: req.payload }))
}

/**
 *
 */
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
 * - handleSignupConfirmRequest for code based signup confirmation
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
 * Signup works in a following way:
 * - creates new entry [credentials] using AWS.CognitoIdentity (in Identity Pool)
 * - creates new entry [user] using AwsAuth.signUp (in User Pool) with username === identityId
 * 
 * Allows same username in both identiyId and userId. identityId generated at authSignupRequest
 * will later be passed to signupConfirmRequest to confirm this user. Loosing identiyId between transition
 * will fail signup process!
 */
function* handleSignupCreateRequest(payload) {
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

function* signupCreateRequest(req) {
  try {
    const data = yield handleSignupCreateRequest(req.payload)
    yield put(actions.signupCreateSuccess({
      message: errors.getMessagePayload(constants.SIGNUP_CREATE_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.message === 'USER_CONFIRMATION_DELIVERY') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'USER_CONFIRMATION_DELIVERY', error.message),
      }))
    } else if (error.code === 'UsernameExistsException') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'USER_EXISTS', error.message),
      }))
    } else if (error.code === 'InvalidPasswordException') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'INVALID_PASSWORD', error.message),
      }))
    } else if (error.code === 'InvalidParameterException') {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'INVALID_PARAMETER', error.message),
      }))
    } else {
      yield put(actions.signupCreateFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'GENERIC', error.message),
      }))
    }
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
function* handleSignupConfirmRequest(payload) {
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
function* signupConfirmRequest(req) {
  try {
    const data = yield handleSignupConfirmRequest(req.payload)
    yield put(actions.signupConfirmSuccess({
      message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_SUCCESS, 'GENERIC'),
      data,
    }))
  } catch (error) {
    if (error.code === 'ExpiredCodeException') {
      yield put(actions.signupConfirmFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'CODE_EXPIRED', error.message),
      }))
    } else if (error.code === 'CodeMismatchException') {
      yield put(actions.signupConfirmFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'CODE_MISMATCH', error.message),
      }))
    } else {
      yield put(actions.signupConfirmFailure({
        message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'GENERIC', error.message),
      }))
    }
  }
}

export default () => [
  takeLatest(constants.SIGNUP_USERNAME_REQUEST, signupUsernameRequest),
  takeLatest(constants.SIGNUP_PHONE_REQUEST, signupPhoneRequest),
  takeLatest(constants.SIGNUP_EMAIL_REQUEST, signupEmailRequest),
  takeLatest(constants.SIGNUP_PASSWORD_REQUEST, signupPasswordRequest),

  takeLatest(constants.SIGNUP_CREATE_REQUEST, signupCreateRequest),
  takeLatest(constants.SIGNUP_CONFIRM_REQUEST, signupConfirmRequest),
]