import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'

const AuthHomeComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const authSigninGoogle = useSelector(state => state.auth.authSigninGoogle)
  const authSigninApple = useSelector(state => state.auth.authSigninApple)
  const authSigninAnonymous = useSelector(state => state.auth.authSigninAnonymous)

  const authSigninGoogleRequest = () => 
    dispatch(authActions.authSigninGoogleRequest())

  const authSigninAppleRequest = () => 
    dispatch(authActions.authSigninAppleRequest())
  
  const authSigninAnonymousRequest = () => 
    dispatch(authActions.authSigninAnonymousRequest())

  const authSigninCognitoIdle = () => 
    dispatch(authActions.authSigninCognitoIdle({}))

  return children({
    authSigninGoogle,
    authSigninGoogleRequest,
    authSigninApple,
    authSigninAppleRequest,
    authSigninCognitoIdle,
    authSigninAnonymous,
    authSigninAnonymousRequest,
  })
}

export default AuthHomeComponentService
