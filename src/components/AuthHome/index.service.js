import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as authActions from 'store/ducks/auth/actions'
import * as authSelectors from 'store/ducks/auth/selectors'
import * as navigationActions from 'navigation/actions'

const AuthHomeComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authSigninGoogle = useSelector(authSelectors.authSigninGoogle)
  const authSigninApple = useSelector(authSelectors.authSigninApple)
  const authSigninAnonymous = useSelector(authSelectors.authSigninAnonymous)

  const authSigninGoogleRequest = navigationActions.mockForWeb(
    () => dispatch(authActions.authSigninGoogleRequest()),
    navigation,
  )

  const authSigninAppleRequest = navigationActions.mockForWeb(
    () => dispatch(authActions.authSigninAppleRequest()),
    navigation,
  )

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
