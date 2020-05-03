import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import { useNavigation } from '@react-navigation/native'
import toLower from 'ramda/src/toLower'
import * as navigationActions from 'navigation/actions'

const AuthForgotComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authCheck = useSelector(state => state.auth.authCheck)
  const authForgot = useSelector(state => state.auth.authForgot)
  const authForgotConfirm = useSelector(state => state.auth.authForgotConfirm)

  const authForgotRequest = (payload) =>
    dispatch(authActions.authForgotRequest({
      username: toLower(payload.username),
    }))

  const authForgotIdle = () =>
    dispatch(authActions.authForgotIdle())

  useEffect(() => {
    if (authForgot.status === 'success') {
      navigationActions.navigateAuthForgotConfirm(navigation)()
      dispatch(authActions.authForgotIdle())
    }

    if (authForgotConfirm.status === 'success') {
      navigationActions.navigateAuthHome(navigation)()
      dispatch(authActions.authForgotConfirmIdle())
    }
  }, [
    authForgot.status,
    authForgotConfirm.status,
  ])

  return children({
    authCheck,
    authForgot,
    authForgotRequest,
    authForgotIdle,
    authForgotConfirm,
  })
}

export default AuthForgotComponentService
