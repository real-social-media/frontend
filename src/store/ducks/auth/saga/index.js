import authForgot from 'store/ducks/auth/saga/authForgot'
import authSigninCognito from 'store/ducks/auth/saga/authSigninCognito'
import authSigninGoogle from 'store/ducks/auth/saga/authSigninGoogle'
import authSigninApple from 'store/ducks/auth/saga/authSigninApple'
import authSigninAnonymous from 'store/ducks/auth/saga/authSigninAnonymous'
import authSignout from 'store/ducks/auth/saga/authSignout'

import authFlow from 'store/ducks/auth/saga/authFlow'
import authPrefetch from 'store/ducks/auth/saga/authPrefetch'
import authGetUser from 'store/ducks/auth/saga/authGetUser'

export default () =>
  []
    .concat(authForgot())
    .concat(authSigninCognito())
    .concat(authSigninGoogle())
    .concat(authSigninApple())
    .concat(authSigninAnonymous())
    .concat(authFlow())
    .concat(authPrefetch())
    .concat(authSignout())
    .concat(authGetUser())
