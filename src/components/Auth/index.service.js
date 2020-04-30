import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import { useNavigation, useRoute } from '@react-navigation/native'
import toLower from 'ramda/src/toLower'
import path from 'ramda/src/path'

const AuthComponentService = ({ children, }) => {
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
  const route = useRoute()
  const authCheck = useSelector(state => state.auth.authCheck)
  const authFacebook = useSelector(state => state.auth.authFacebook)
  const authGoogle = useSelector(state => state.auth.authGoogle)
  const authSignin = useSelector(state => state.auth.authSignin)

  const authFacebookRequest = () => 
    dispatch(authActions.authFacebookRequest())
  
  const authGoogleRequest = () => 
    dispatch(authActions.authGoogleRequest())
  
  const authSigninRequest = (payload) => {
    const usernameType = guessUsernameType(payload.username)
    dispatch(authActions.authSignupIdle())
    dispatch(authActions.authSigninRequest({
      usernameType,
      username: toLower(payload.username),
      password: payload.password,
    }))
  }
  
  const authSigninIdle = () => 
    dispatch(authActions.authSigninIdle())

  useEffect(() => {
    if (authFacebook.status === 'success') {
      dispatch(authActions.authCheckIdle())
      dispatch(authActions.authCheckRequest(authFacebook.data))
      dispatch(authActions.authFacebookIdle())
      dispatch(authActions.authSignupIdle())
      dispatch(authActions.authSigninIdle())
      dispatch(authActions.authSignupConfirmIdle())
    }

    if (authGoogle.status === 'success') {
      dispatch(authActions.authCheckIdle())
      dispatch(authActions.authCheckRequest(authGoogle.data))
      dispatch(authActions.authGoogleIdle())
      dispatch(authActions.authSignupIdle())
      dispatch(authActions.authSigninIdle())
      dispatch(authActions.authSignupConfirmIdle())
    }
  }, [
    authFacebook.status,
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
    if (path(['params', 'username'])(route) && path(['params', 'confirmationCode'])(route)) {
      dispatch(authActions.authSignupConfirmRequest({
        username: toLower(path(['params', 'username'])(route)),
        confirmationCode: path(['params', 'confirmationCode'])(route),
      }))
    }
  }, [
    path(['params', 'action'])(route) === 'signupConfirm',
    path(['params', 'username'])(route),
    path(['params', 'confirmationCode'])(route),
  ])

  useEffect(() => {
    const shouldRedirect = [
      'Auth',
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
    authFacebook,
    authFacebookRequest,
    authGoogle,
    authGoogleRequest,
    authSignin,
    authSigninRequest,
    authSigninIdle,
  })
}

export default AuthComponentService
