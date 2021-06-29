import { getContext, select } from 'redux-saga/effects'
import * as authSelector from 'store/ducks/auth/selectors'
import * as navigationActions from 'navigation/actions'
import * as UserService from 'services/User'
import { UserInNotActiveError } from 'store/errors'

function* usersCheckPermissions() {
  const authUser = yield select(authSelector.authUser)

  if (!UserService.isUserActive(authUser)) {
    const ReactNavigationRef = yield getContext('ReactNavigationRef')
    navigationActions.navigateProfileUpgrade(ReactNavigationRef.current)

    throw new UserInNotActiveError()
  }
}

export default usersCheckPermissions
