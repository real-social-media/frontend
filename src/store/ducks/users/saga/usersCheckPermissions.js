import { getContext, select } from 'redux-saga/effects'
import * as authSelector from 'store/ducks/auth/selectors'
import * as navigationActions from 'navigation/actions'

function* usersCheckPermissions() {
  const authUser = yield select(authSelector.authUserSelector)

  if (authUser.userStatus !== 'ACTIVE') {
    const ReactNavigationRef = yield getContext('ReactNavigationRef')
    navigationActions.navigateProfileUpgrade(ReactNavigationRef.current)

    throw new Error('User is not ACTIVE')
  }
}

export default usersCheckPermissions
