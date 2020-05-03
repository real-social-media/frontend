import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import { useNavigation } from '@react-navigation/native'
import toLower from 'ramda/src/toLower'
import * as navigationActions from 'navigation/actions'

const AuthComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authForgot = useSelector(state => state.auth.authForgot)
  const authForgotConfirm = useSelector(state => state.auth.authForgotConfirm)

  const authForgotIdle = () =>
    dispatch(authActions.authForgotIdle())

  const authForgotConfirmRequest = (payload) =>
    dispatch(authActions.authForgotConfirmRequest({
      username: toLower(payload.username),
      code: payload.code,
      password: payload.password,
    }))

  const authForgotConfirmIdle = () =>
    dispatch(authActions.authForgotConfirmIdle())

  useEffect(() => {
    if (authForgotConfirm.status === 'success') {
      navigationActions.navigateAuthHome(navigation)()
      dispatch(authActions.authForgotConfirmIdle())
    }
  }, [
    authForgotConfirm.status,
  ])

  return children({
    authForgot,
    authForgotIdle,
    authForgotConfirm,
    authForgotConfirmRequest,
    authForgotConfirmIdle,
  })
}

export default AuthComponentService
