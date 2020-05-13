import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import { useNavigation } from '@react-navigation/native'
import toLower from 'ramda/src/toLower'

const AuthHomeComponentService = ({ children }) => {
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
  const authCheck = useSelector(state => state.auth.authCheck)
  const authGoogle = useSelector(state => state.auth.authGoogle)
  const authSignin = useSelector(state => state.auth.authSignin)

  const authGoogleRequest = () => 
    dispatch(authActions.authGoogleRequest())
  
  const authSigninRequest = (payload) => {
    const usernameType = guessUsernameType(payload.username)
    dispatch(authActions.authSigninRequest({
      usernameType,
      username: toLower(payload.username),
      password: payload.password,
    }))
  }
  
  const authSigninIdle = () => 
    dispatch(authActions.authSigninIdle())

  useEffect(() => {
    if (authGoogle.status === 'success') {
      dispatch(authActions.authCheckIdle())
      dispatch(authActions.authCheckRequest(authGoogle.data))
      dispatch(authActions.authGoogleIdle())
      dispatch(authActions.authSigninIdle())
    }
  }, [
    authGoogle.status,
  ])
  
  useEffect(() => {
    if (authSignin.status === 'success') {
      dispatch(authActions.authCheckRequest({}))
      dispatch(authActions.authSigninIdle())
    }

    if (authSignin.status === 'failure' && authSignin.nextRoute) {
      navigation.navigate(authSignin.nextRoute)
      dispatch(authActions.authSigninIdle())
    }
  }, [
    authSignin.status,
  ])

  useEffect(() => {
    const shouldRedirect = [
      'AuthHome',
      'AuthPhoto',

      'OnboardName',
      'OnboardPhoto',
      'AuthSignup',
      'AuthSignupConfirm',
    ].includes(authCheck.nextRoute)
    if (shouldRedirect) {
      navigation.navigate(authCheck.nextRoute)
    }
  }, [
    authCheck.nextRoute
  ])

  return children({
    authCheck,
    authGoogle,
    authGoogleRequest,
    authSignin,
    authSigninRequest,
    authSigninIdle,
  })
}

export default AuthHomeComponentService
