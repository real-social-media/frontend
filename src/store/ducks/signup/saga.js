import * as AWS from 'aws-sdk/global'
import { put, takeLatest, getContext } from 'redux-saga/effects'
import * as CognitoIdentity from 'amazon-cognito-identity-js'
import Config from 'react-native-config'
import path from 'ramda/src/path'
import { promisify } from 'es6-promisify'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as errors from 'store/ducks/signup/errors'
import * as queries from 'store/ducks/signup/queries'
import * as queryService from 'services/Query'
import * as entitiesActions from 'store/ducks/entities/actions'
import * as normalizer from 'normalizer/schemas'
import * as Logger from 'services/Logger'

/**
 *
 */
function* gatewayUsernameStatus(payload) {
  const data = yield fetch(`${Config.AWS_API_GATEWAY_ENDPOINT}/username/status?username=${payload.username}`, {
    method: 'GET',
    headers: {
      'X-Api-Key': Config.AWS_API_GATEWAY_KEY,
    },
  })

  const response = yield data.json()

  if (response.status !== 'AVAILABLE') {
    throw new Error('USER_EXISTS')
  }

  return response
}

function* signupUsernameRequest(req) {
  try {
    yield gatewayUsernameStatus(req.payload)
    yield put(actions.signupUsernameSuccess({ payload: req.payload }))
  } catch (error) {
    yield put(
      actions.signupUsernameFailure({
        message: errors.getMessagePayload(constants.SIGNUP_USERNAME_FAILURE, 'USER_EXISTS', error.message),
        payload: req.payload,
      }),
    )
  }
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
 * Links identity pool with user pool. Linking will be done at:
 * - handleSignupConfirmRequest for code based signup confirmation
 * - handleAuthSigninRequest for deeplink based signup confirmation
 */
function* linkUserIdentities(payload) {
  const authenticationDetails = new CognitoIdentity.AuthenticationDetails({
    Username: payload.cognitoUserId,
    Password: payload.password,
  })

  const userPool = new CognitoIdentity.CognitoUserPool({
    UserPoolId: Config.AWS_COGNITO_USER_POOL_ID,
    ClientId: Config.AWS_COGNITO_USER_POOL_WEB_CLIENT_ID,
  })

  const cognitoUser = new CognitoIdentity.CognitoUser({
    Username: payload.cognitoUserId,
    Pool: userPool,
  })

  const authenticateUser = yield new Promise((onSuccess, onFailure) =>
    cognitoUser.authenticateUser(authenticationDetails, { onSuccess, onFailure }),
  )

  AWS.config.region = Config.AWS_COGNITO_REGION
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityId: payload.cognitoUserId,
    IdentityPoolId: Config.AWS_COGNITO_IDENTITY_POOL_ID,
    Logins: {
      [`cognito-idp.${Config.AWS_COGNITO_REGION}.amazonaws.com/${Config.AWS_COGNITO_USER_POOL_ID}`]: authenticateUser
        .getIdToken()
        .getJwtToken(),
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
    username: payload.username,
    password: payload.password,
    cognitoUserId: path(['user', 'username'])(signup),
    cognitoUsername: payload.email || payload.phone,
    cognitoDelivery: path(['codeDeliveryDetails', 'DeliveryMedium'])(signup),
  }
}

function* signupCreateRequest(req) {
  try {
    const data = yield handleSignupCreateRequest(req.payload)
    yield put(
      actions.signupCreateSuccess({
        message: errors.getMessagePayload(constants.SIGNUP_CREATE_SUCCESS, 'GENERIC'),
        payload: req.payload,
        data,
      }),
    )
  } catch (error) {
    if (error.message === 'USER_CONFIRMATION_DELIVERY') {
      yield put(
        actions.signupCreateFailure({
          message: errors.getMessagePayload(
            constants.SIGNUP_CREATE_FAILURE,
            'USER_CONFIRMATION_DELIVERY',
            error.message,
          ),
          payload: req.payload,
        }),
      )
    } else if (error.code === 'UsernameExistsException') {
      yield put(
        actions.signupCreateFailure({
          message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'USER_EXISTS', error.message),
          payload: req.payload,
        }),
      )
    } else if (error.code === 'InvalidPasswordException') {
      yield put(
        actions.signupCreateFailure({
          message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'INVALID_PASSWORD', error.message),
          payload: req.payload,
        }),
      )
    } else if (error.code === 'InvalidParameterException') {
      yield put(
        actions.signupCreateFailure({
          message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'INVALID_PARAMETER', error.message),
          payload: req.payload,
        }),
      )
    } else {
      yield put(
        actions.signupCreateFailure({
          message: errors.getMessagePayload(constants.SIGNUP_CREATE_FAILURE, 'GENERIC', error.message),
          payload: req.payload,
        }),
      )
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
function* handleSignupConfirmRequestData(req, api) {
  const dataSelector = path(['data', 'createCognitoOnlyUser'])

  const data = dataSelector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* handleSignupConfirmRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')

  yield AwsAuth.confirmSignUp(payload.cognitoUserId, payload.confirmationCode, {
    forceAliasCreation: false,
  })

  /**
   * user will get user pool and identity pool linked only if he used code verification
   * in which we persist username and password in reducers. If user confirmed his account
   * via deeplink his identites will not be linked. Linking will be moved to authSignin
   * handler, which will know linking status by asyncStorage entry called @real:signup:${id}
   * therefore we should clear that entry if confirm and linking were successful.
   */
  yield linkUserIdentities({
    cognitoUserId: payload.cognitoUserId,
    cognitoUsername: payload.cognitoUsername,
    password: payload.password,
  })

  yield AwsAuth.signIn(payload.cognitoUsername, payload.password)

  const data = yield queryService.apiRequest(queries.createCognitoOnlyUser, {
    username: payload.username,
    fullName: payload.username,
  })
  const next = yield handleSignupConfirmRequestData({ payload }, data)

  /**
   * Define user for sentry logger, authorized users will be re-defined at services/providers/App
   * But user won't reach that part until profile photo is puloaded
   */
  Logger.setUser({
    id: path(['data', 'createCognitoOnlyUser', 'userId'])(data),
    username: path(['data', 'createCognitoOnlyUser', 'username'])(data),
    email: path(['data', 'createCognitoOnlyUser', 'email'])(data),
  })

  /**
   * Api subscriptions initialization, most important one we need at this stage
   * is postsCreate subscription listener. Which won't let user proceed to main screen
   * if photo is uploaded and verified but postsCreateSuccess was not triggered
   */
  yield put(subscriptionsActions.subscriptionsMainRequest(next.data))
  yield put(subscriptionsActions.subscriptionsPollRequest(next.data))

  yield queryService.apiRequest(queries.setUserAcceptedEULAVersion, { version: '15-11-2019' })
}

/**
 *
 */
function* signupConfirmRequest(req) {
  try {
    const data = yield handleSignupConfirmRequest(req.payload)
    yield put(
      actions.signupConfirmSuccess({
        message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_SUCCESS, 'GENERIC'),
        payload: req.payload,
        data,
      }),
    )
  } catch (error) {
    if (error.code === 'AliasExistsException') {
      yield put(
        actions.signupConfirmFailure({
          message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'ALIAS_EXISTS', error.message),
          payload: req.payload,
        }),
      )
    } else if (error.code === 'ExpiredCodeException') {
      yield put(
        actions.signupConfirmFailure({
          message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'CODE_EXPIRED', error.message),
          payload: req.payload,
        }),
      )
    } else if (error.code === 'CodeMismatchException') {
      yield put(
        actions.signupConfirmFailure({
          message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'CODE_MISMATCH', error.message),
          payload: req.payload,
        }),
      )
    } else {
      yield put(
        actions.signupConfirmFailure({
          message: errors.getMessagePayload(constants.SIGNUP_CONFIRM_FAILURE, 'GENERIC', error.message),
          payload: req.payload,
        }),
      )
    }
  }
}

/**
 * Google only execution
 */
function* handleSignupCognitoRequestData(req, api, selectorType) {
  const selector = (() => {
    if (selectorType === 'GOOGLE') return path(['data', 'createGoogleUser'])
    if (selectorType === 'APPLE') return path(['data', 'createAppleUser'])
    if (selectorType === 'COGNITO') return path(['data', 'createCognitoOnlyUser'])
  })()

  const data = selector(api)
  const meta = {}
  const payload = req.payload

  const normalized = normalizer.normalizeUserGet(data)
  yield put(entitiesActions.entitiesAlbumsMerge({ data: normalized.entities.albums || {} }))
  yield put(entitiesActions.entitiesPostsMerge({ data: normalized.entities.posts || {} }))
  yield put(entitiesActions.entitiesUsersMerge({ data: normalized.entities.users || {} }))
  yield put(entitiesActions.entitiesCommentsMerge({ data: normalized.entities.comments || {} }))
  yield put(entitiesActions.entitiesImagesMerge({ data: normalized.entities.images || {} }))

  return {
    data: normalized.result,
    meta,
    payload,
  }
}

function* handleSignupCognitoRequest(payload) {
  const AwsAuth = yield getContext('AwsAuth')

  const session = yield AwsAuth.currentAuthenticatedUser({
    bypassCache: false,
  })

  /**
   *
   */
  const { next, user } = yield (function* createUser() {
    /**
     * Create new user APPLE user
     * email and fullname will be null if apple auth flow was interrupted (if not first request)
     * we backup that data in async-storage to ensure data is always available
     */
    if (session.authProvider === 'APPLE') {
      const data = yield queryService.apiRequest(queries.createAppleUser, {
        username: payload.username,
        fullName: session.name,
        appleIdToken: session.token,
      })
      const user = {
        id: path(['data', 'createAppleUser', 'userId'])(data),
        username: path(['data', 'createAppleUser', 'username'])(data),
        email: path(['data', 'createAppleUser', 'email'])(data),
      }
      const next = yield handleSignupCognitoRequestData({ payload }, data, session.authProvider)
      return { next, user }
    } else if (session.authProvider === 'GOOGLE') {

    /**
     * Create new user GOOGLE user
     */
      const data = yield queryService.apiRequest(queries.createGoogleUser, {
        username: payload.username,
        fullName: session.name,
        googleIdToken: session.token,
      })
      const user = {
        id: path(['data', 'createGoogleUser', 'userId'])(data),
        username: path(['data', 'createGoogleUser', 'username'])(data),
        email: path(['data', 'createGoogleUser', 'email'])(data),
      }
      const next = yield handleSignupCognitoRequestData({ payload }, data, session.authProvider)
      return { next, user }
    } else {

    /**
     * Create new user EMAIL user
     * this is a duplicate block of handleSignupConfirmRequest function above
     * user will reach this step if signup flow was interrupted after cognito account was confirmed
     */
      const data = yield queryService.apiRequest(queries.createCognitoOnlyUser, {
        username: payload.username,
        fullName: payload.username,
      })
      const user = {
        id: path(['data', 'createCognitoOnlyUser', 'userId'])(data),
        username: path(['data', 'createCognitoOnlyUser', 'username'])(data),
        email: path(['data', 'createCognitoOnlyUser', 'email'])(data),
      }
      const next = yield handleSignupCognitoRequestData({ payload }, data, 'COGNITO')
      return { next, user }
    }
  })()

  /**
   * Define user for sentry logger, authorized users will be re-defined at services/providers/App
   * But user won't reach that part until profile photo is puloaded
   */
  Logger.setUser(user)

  /**
   * Api subscriptions initialization, most important one we need at this stage
   * is postsCreate subscription listener. Which won't let user proceed to main screen
   * if photo is uploaded and verified but postsCreateSuccess was not triggered
   */
  yield put(subscriptionsActions.subscriptionsMainRequest(next.data))
  yield put(subscriptionsActions.subscriptionsPollRequest(next.data))
  yield queryService.apiRequest(queries.setUserAcceptedEULAVersion, { version: '15-11-2019' })
}

function* signupCognitoRequest(req) {
  try {
    const data = yield handleSignupCognitoRequest(req.payload)
    yield put(
      actions.signupCognitoSuccess({
        message: errors.getMessagePayload(constants.SIGNUP_COGNITO_SUCCESS, 'GENERIC'),
        payload: req.payload,
        data,
      }),
    )
  } catch (error) {
    yield put(
      actions.signupCognitoFailure({
        message: errors.getMessagePayload(constants.SIGNUP_COGNITO_FAILURE, 'GENERIC', error.message),
        payload: req.payload,
      }),
    )
  }
}

export default () => [
  takeLatest(constants.SIGNUP_USERNAME_REQUEST, signupUsernameRequest),
  takeLatest(constants.SIGNUP_PHONE_REQUEST, signupPhoneRequest),
  takeLatest(constants.SIGNUP_EMAIL_REQUEST, signupEmailRequest),
  takeLatest(constants.SIGNUP_PASSWORD_REQUEST, signupPasswordRequest),

  takeLatest(constants.SIGNUP_CREATE_REQUEST, signupCreateRequest),
  takeLatest(constants.SIGNUP_CONFIRM_REQUEST, signupConfirmRequest),

  takeLatest(constants.SIGNUP_COGNITO_REQUEST, signupCognitoRequest),
]
