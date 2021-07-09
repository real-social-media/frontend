import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as appActions from 'store/ducks/appState/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import useAppState from 'services/AppState'
import * as UserService from 'services/User'
import { Platform } from 'react-native'

export const AuthContext = React.createContext({})

/**
 *
 */
export const AuthProvider = ({
  children,
}) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUser)
  const [swipeDisabled, setSwipeDisabled] = useState(false)
  const isUserActive = UserService.isUserActive(user)
  const swipeEnabled = isUserActive && !swipeDisabled

  /**
   * Application version check handler, which forces users to update
   * the app if new build is available
   */
  /**
   * We doesn't handle background and foreground app states on Android
  */
  Platform.OS === 'ios' && useAppState({
    onForeground: () => {
      dispatch(appActions.appStateForeground())
    },
    onBackground: () => {
      dispatch(appActions.appStateBackground())
    },
  })

  return (
    <AuthContext.Provider value={{ user, swipeEnabled, setSwipeDisabled, isUserActive }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.any,
}
