import { useEffect, useCallback } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'
import { logEvent } from 'services/Analytics'
import { pageHeaderLeft } from 'navigation/options'
import testIDs from './test-ids'

const AuthEmailComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupEmail = useSelector(state => state.signup.signupEmail)
  const signupPassword = useSelector(state => state.signup.signupPassword)
  const signupCreate = useSelector(state => state.signup.signupCreate)
  const signupCognitoIdentity = useSelector(state => state.signup.signupCognitoIdentity)

  /**
   * Navigation state reset on back button press
   */
  const handleGoBack = useCallback(() => {
    dispatch(signupActions.signupEmailIdle({}))
    dispatch(signupActions.signupPhoneIdle({}))
    dispatch(signupActions.signupCreateIdle({}))
    navigationActions.navigateAuthPassword(navigation)()
  }, [])

  useEffect(() => {
    const tabNavigator = navigation.dangerouslyGetParent()
    
    if (!tabNavigator) return
    tabNavigator.setOptions({
      headerLeft: () => pageHeaderLeft({ 
        testID: testIDs.header.backBtn, 
        onPress: handleGoBack, 
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
      username: signupUsername.payload.username,
      usernameType: 'email',
      phone: null,
      email: payload.email,
      password: signupPassword.payload.password,
    }
    dispatch(signupActions.signupCreateRequest(signupCreatePayload))
  }

  /**
   * Create new user once email and password is received from previous steps
   * 
   * Previous steps include:
   * - signupUsername -> AuthUsernameScreen
   * - signupEmail -> AuthEmailScreen
   * - signupPassword -> AuthPasswordScreen
   */
  useEffect(() => {
    if (
      !signupUsername.payload.username ||
      !signupEmail.payload.email ||
      !signupPassword.payload.password
    ) return

    if (
      signupUsername.payload.username === signupCognitoIdentity.username &&
      signupEmail.payload.email === signupCognitoIdentity.cognitoUsername &&
      signupPassword.payload.password === signupCognitoIdentity.password
    ) {
      navigationActions.navigateAuthEmailConfirm(navigation)()
      return
    }
  }, [
    signupUsername.payload.username,
    signupEmail.payload.email,
    signupPassword.payload.password,

    signupUsername.status,
    signupEmail.status,
    signupPassword.status,
  ])

  /**
   * Redirect to verification confirmation once signup was successful
   */
  useEffect(() => {
    if (
      signupCreate.status !== 'success' ||
      signupCreate.data.cognitoDelivery !== 'EMAIL'
    ) return

    logEvent('SIGNUP_CREATE_SUCCESS')
    navigationActions.navigateAuthEmailConfirm(navigation)()
  }, [
    signupCreate.status,
  ])

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
