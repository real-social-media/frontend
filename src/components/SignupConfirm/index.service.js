import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import { useNavigation } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'

const AuthComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authSignin = useSelector(state => state.auth.authSignin)
  const authSignup = useSelector(state => state.auth.authSignup)
  const authSignupConfirm = useSelector(state => state.auth.authSignupConfirm)

  const authSignupConfirmRequest = (payload) => {
    dispatch(authActions.authSignupConfirmRequest({
      username: authSignup.data.username,
      password: authSignup.payload.password,
      confirmationCode: payload.confirmationCode,
    }))
  }

  const authSignupConfirmIdle = (payload) =>
    dispatch(authActions.authSignupConfirmIdle(payload))

  useEffect(() => {
    /**
     * Authorization for existing user
     */
    if (authSignupConfirm.status === 'success') {
      navigationActions.navigateAuthHome(navigation)()
      dispatch(authActions.authSignupIdle())
      dispatch(authActions.authSigninIdle())
      dispatch(authActions.authSignupConfirmIdle())
      dispatch(authActions.authCheckIdle())
    }
  }, [
    authSignupConfirm.status,
  ])

  return children({
    authSignin,
    authSignup,
    authSignupConfirm,
    authSignupConfirmIdle,
    authSignupConfirmRequest,
  })
}

export default AuthComponentService
