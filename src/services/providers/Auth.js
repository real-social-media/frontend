import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import * as subscriptionsActions from 'store/ducks/subscriptions/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import useAppState from 'services/AppState'

export const AuthContext = React.createContext({})

/**
 * 
 */
export const AuthProvider = ({
  children,
}) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const isUserActive = user.userStatus === 'ACTIVE'

  /**
   * Constructor function to fetch: Translations, Themes and Auth data
   */
  useEffect(() => {
    dispatch(authActions.authFlowRequest({ allowAnonymous: false }))
  }, [])

  /**
   * Application version check handler, which forces users to update
   * the app if new build is available
   */
  useAppState({
    onForeground: () => {
      if (user.userId) {
        dispatch(subscriptionsActions.subscriptionsMainRequest())
        dispatch(subscriptionsActions.subscriptionsPollRequest())
        dispatch(subscriptionsActions.subscriptionsPrefetchRequest())
      }
    },
    onBackground: () => {
      if (user.userId) {
        dispatch(subscriptionsActions.subscriptionsMainIdle())
        dispatch(subscriptionsActions.subscriptionsPollIdle())
      }
    },
  })

  return (
    <AuthContext.Provider value={{ user, isUserActive }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.any,
}
