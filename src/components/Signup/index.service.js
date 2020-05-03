import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import { useNavigation } from '@react-navigation/native'
import toLower from 'ramda/src/toLower'
import * as navigationActions from 'navigation/actions'

const AuthComponentService = ({ children }) => {
  const guessUsernameType = (username) => {
    const hasEmail = /\S+@\S+\.\S+/.test(username)
    const hasPhone = /^[0-9 ()+-]+$/.test(username)

    return (() => {
      if (hasEmail) return 'email'
      if (hasPhone) return 'phone'
      return 'username'
    })()
  }

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authSignin = useSelector(state => state.auth.authSignin)
  const authSignup = useSelector(state => state.auth.authSignup)
  
  const authSignupRequest = () => {
    const usernameType = guessUsernameType(authSignin.payload.username)
    dispatch(authActions.authSignupRequest({
      usernameType,
      password: authSignin.payload.password,
      email: toLower(authSignin.payload.username),
      phone: authSignin.payload.username,
    }))
  }

  const authSignupIdle = () => 
    dispatch(authActions.authSignupIdle())

  const authSignupResendRequest = () => {
    dispatch(authActions.authSignupResendRequest({
      username: authSignin.payload.username,
    }))
  }

  useEffect(() => {
    if (authSignup.status === 'success') {
      navigationActions.navigateAuthSignupConfirm(navigation)()
    }

    if (authSignup.status === 'failure' && authSignup.nextRoute) {
      navigation.navigate(authSignup.nextRoute)
      authSignupResendRequest()
    }
  }, [
    authSignup.status,
  ])

  return children({
    authSignin,
    authSignup,
    authSignupRequest,
    authSignupIdle,
  })
}

export default AuthComponentService
