import { all, takeEvery } from 'redux-saga/effects'
import camera from 'store/ducks/camera/saga'
import albums from 'store/ducks/albums/saga'
import chat from 'store/ducks/chat/saga'
import cache from 'store/ducks/cache/saga'
import subscriptions from 'store/ducks/subscriptions/saga'
import purchases from 'store/ducks/purchases/saga'
import contacts from 'store/ducks/contacts/saga'

import users from 'store/ducks/users/saga'
import usersSetUserDatingStatus from 'store/ducks/users/saga/usersSetUserDatingStatus'

import appReady from 'store/ducks/app/saga/appReady'

import auth from 'store/ducks/auth/saga'
import authSigninCognito from 'store/ducks/auth/saga/authSigninCognito'
import authSigninGoogle from 'store/ducks/auth/saga/authSigninGoogle'
import authSigninApple from 'store/ducks/auth/saga/authSigninApple'
import authSigninAnonymous from 'store/ducks/auth/saga/authSigninAnonymous'
import authSignout from 'store/ducks/auth/saga/authSignout'
import authReset from 'store/ducks/auth/saga/authReset'

import authData from 'store/ducks/auth/saga/authData'
import authToken from 'store/ducks/auth/saga/authToken'
import authFlow from 'store/ducks/auth/saga/authFlow'
import authPrefetch from 'store/ducks/auth/saga/authPrefetch'

import signup from 'store/ducks/signup/saga'
import signupCreate from 'store/ducks/signup/saga/signupCreate'
import signupConfirm from 'store/ducks/signup/saga/signupConfirm'
import signupPassword from 'store/ducks/signup/saga/signupPassword'
import signupUsername from 'store/ducks/signup/saga/signupUsername'

import datingMatchedUsers from 'store/ducks/dating/saga/datingMatchedUsers'
import datingConfirmedUsers from 'store/ducks/dating/saga/datingConfirmedUsers'
import datingMatchApprove from 'store/ducks/dating/saga/datingMatchApprove'
import datingMatchReject from 'store/ducks/dating/saga/datingMatchReject'

import posts from 'store/ducks/posts/saga'
import postsCreate from 'store/ducks/posts/saga/postsCreate'
import postsShare from 'store/ducks/posts/saga/postsShare'
import postsReportPostViews from 'store/ducks/posts/saga/postsReportPostViews'
import postsGetTrendingPosts from 'store/ducks/posts/saga/postsGetTrendingPosts'

import * as Logger from 'services/Logger'
import path from 'ramda/src/path'

const captureErrors = (payload) => {
  const message = path(['payload', 'message'])(payload)
  const type = path(['type'])(payload)

  Logger.withScope(scope => {
    scope.setExtra('message', message)
    Logger.captureMessage(type)
  })
}

export default function* rootSaga(persistor) {
  yield all([]
    .concat(appReady())

    .concat(camera())
    .concat(albums())
    .concat(chat())

    .concat(cache())
    .concat(subscriptions())
    .concat(purchases())
    .concat(contacts())

    .concat(users())
    .concat(usersSetUserDatingStatus())

    .concat(auth(persistor))
    .concat(authSigninCognito(persistor))
    .concat(authSigninGoogle(persistor))
    .concat(authSigninApple(persistor))
    .concat(authSigninAnonymous(persistor))
    .concat(authData(persistor))
    .concat(authToken(persistor))
    .concat(authFlow(persistor))
    .concat(authPrefetch(persistor))
    .concat(authSignout(persistor))
    .concat(authReset(persistor))

    .concat(signup())
    .concat(signupCreate())
    .concat(signupConfirm())
    .concat(signupPassword())
    .concat(signupUsername())

    .concat(posts())
    .concat(postsCreate())
    .concat(postsShare())
    .concat(postsReportPostViews())
    .concat(postsGetTrendingPosts())

    .concat(datingMatchedUsers())
    .concat(datingConfirmedUsers())
    .concat(datingMatchApprove())
    .concat(datingMatchReject())

    .concat([
      takeEvery(action => /FAILURE$/.test(action.type), captureErrors),
    ]),
  )
}
