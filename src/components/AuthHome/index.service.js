import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import { useNavigation } from '@react-navigation/native'

const AuthHomeComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authCheck = useSelector(state => state.auth.authCheck)
  const authGoogle = useSelector(state => state.auth.authGoogle)
  const authApple = useSelector(state => state.auth.authApple)
  const authSignin = useSelector(state => state.auth.authSignin)

  const authGoogleRequest = () => 
    dispatch(authActions.authGoogleRequest())

  const authAppleRequest = () => 
    dispatch(authActions.authAppleRequest())

  useEffect(() => {
    if (authGoogle.status === 'success') {
      dispatch(authActions.authCheckIdle({}))
      dispatch(authActions.authCheckRequest(authGoogle.data))
      dispatch(authActions.authGoogleIdle({}))
      dispatch(authActions.authSigninIdle({}))
    }
  }, [
    authGoogle.status,
  ])

  useEffect(() => {
    if (authApple.status === 'success') {
      dispatch(authActions.authCheckIdle({}))
      dispatch(authActions.authCheckRequest(authApple.data))
      dispatch(authActions.authAppleIdle({}))
      dispatch(authActions.authSigninIdle({}))
    }
  }, [
    authApple.status,
  ])
  
  useEffect(() => {
    if (authSignin.status === 'success') {
      dispatch(authActions.authCheckRequest())
      dispatch(authActions.authSigninIdle({}))
    }
  }, [
    authSignin.status,
  ])

  useEffect(() => {
    const shouldRedirect = [
      'AuthHome',
      'AuthCognito',
      'AuthSignupConfirm',
    ].includes(authCheck.nextRoute)
    if (shouldRedirect) {
      navigation.navigate(authCheck.nextRoute)
    }
  }, [
    authCheck.nextRoute,
  ])

  return children({
    authGoogle,
    authGoogleRequest,
    authApple,
    authAppleRequest,
  })
}

export default AuthHomeComponentService
