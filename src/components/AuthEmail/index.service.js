import { useEffect, useCallback, useContext } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'
import { ThemeContext } from 'services/providers/Theme'
import { logEvent } from 'services/Analytics'
import { pageHeaderLeft } from 'navigation/options'
import testIDs from './test-ids'

const AuthEmailComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { theme } = useContext(ThemeContext)

  const signupCheck = useSelector(state => state.signup.signupCheck)
  const signupEmail = useSelector(state => state.signup.signupEmail)
  const signupCreate = useSelector(state => state.signup.signupCreate)

  /**
   * Navigation state reset on back button press
   */
  const handleGoBack = useCallback(() => {
    dispatch(signupActions.signupEmailIdle({}))
    dispatch(signupActions.signupPhoneIdle({}))
    dispatch(signupActions.signupCreateIdle({}))
    navigationActions.navigateAuthPassword(navigation)
  }, [])

  useEffect(() => {
    const tabNavigator = navigation.dangerouslyGetParent()
    
    if (!tabNavigator) return
    tabNavigator.setOptions({
      headerLeft: () => pageHeaderLeft({ 
        testID: testIDs.header.backBtn, 
        onPress: handleGoBack, 
        theme,
      }),
    })
  }, [])

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupEmailRequest(payload))

    /**
     *
     */
    logEvent('SIGNUP_CREATE_REQUEST')
    const signupCreatePayload = {
      username: signupCheck.payload.username,
      usernameType: 'email',
      phone: null,
      email: payload.email,
    }
    dispatch(signupActions.signupCreateRequest(signupCreatePayload))
  }

  const formSubmitLoading = signupCreate.status === 'loading'
  const formSubmitDisabled = signupCreate.status === 'loading'
  const formErrorMessage = signupCreate.error.text

  const formInitialValues = {
    email: signupEmail.payload.email,
  }

  const handleFormTransform = (values) => ({
    email: compose(trim, toLower, pathOr('', ['email']))(values),
  })

  const handleErrorClose = () => dispatch(signupActions.signupCreateIdle({}))

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

export default AuthEmailComponentService
