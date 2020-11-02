import { useEffect, useCallback, useContext } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { ThemeContext } from 'services/providers/Theme'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { logEvent } from 'services/Analytics'
import { pageHeaderLeft } from 'navigation/options'
import testIDs from './test-ids'

const AuthPasswordComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { theme } = useContext(ThemeContext)

  const signupPassword = useSelector(state => state.signup.signupPassword)

  /**
   * Navigation state reset on back button press
   */
  const handleGoBack = useCallback(() => {
    dispatch(signupActions.signupPasswordIdle({}))
    navigationActions.navigateAuthUsername(navigation)
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => pageHeaderLeft({ 
        testID: testIDs.header.backBtn, 
        onPress: handleGoBack, 
        theme,
      }),
    })
  }, [])

  const handleFormSubmit = (payload) => {
    logEvent('SIGNUP_PASSWORD_REQUEST')
    dispatch(signupActions.signupPasswordRequest(payload))
  }

  const formSubmitLoading = signupPassword.status === 'loading'
  const formSubmitDisabled = signupPassword.status === 'loading'
  const formErrorMessage = signupPassword.error.text

  const formInitialValues = {
    password: signupPassword.payload.password,
  }

  const handleFormTransform = (values) => values

  const handleErrorClose = () => dispatch(signupActions.signupPasswordIdle({}))

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleFormTransform,
    handleErrorClose,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthPasswordComponentService
