import { put, getContext, call, takeEvery } from 'redux-saga/effects'
import * as actions from 'store/ducks/signup/actions'
import * as constants from 'store/ducks/signup/constants'
import * as queries from 'store/ducks/signup/queries'
import * as queryService from 'services/Query'
import * as navigationActions from 'navigation/actions'
import { Keyboard } from 'react-native'
import propOr from 'ramda/src/propOr'

/**
 *
 */
function* handleSignupConfirmRequest(payload) {
  if (payload.usernameType === 'email') {
    yield call([queryService, 'apiRequest'], queries.finishChangeUserEmail, {
      verificationCode: payload.confirmationCode,
    })
  } else if (payload.usernameType === 'phone') {
    yield call([queryService, 'apiRequest'], queries.finishChangeUserPhoneNumber, {
      verificationCode: payload.confirmationCode,
    })
  } else {
    throw new Error('Unsupported usernameType')
  }
}

/**
 *
 */
function* signupConfirmRequest(req) {
  try {
    yield handleSignupConfirmRequest(req.payload)
    yield put(actions.signupConfirmSuccess())
  } catch (error) {
    const messageCode = propOr('GENERIC', error.code, {
      AliasExistsException: 'ALIAS_EXISTS',
      ExpiredCodeException: 'CODE_EXPIRED',
      CodeMismatchException: 'CODE_MISMATCH',
    })

    yield put(actions.signupConfirmFailure(error, { messageCode }))
  }
}

function* signupConfirmSuccess() {
  const ReactNavigationRef = yield getContext('ReactNavigationRef')
  navigationActions.navigateAuthUsername(ReactNavigationRef.current)

  yield put(actions.signupCreateIdle())
  yield put(actions.signupConfirmIdle())
  yield put(actions.signupPasswordIdle())

  Keyboard.dismiss()
}

export default () => [
  takeEvery(constants.SIGNUP_CONFIRM_REQUEST, signupConfirmRequest),
  takeEvery(constants.SIGNUP_CONFIRM_SUCCESS, signupConfirmSuccess),
]
