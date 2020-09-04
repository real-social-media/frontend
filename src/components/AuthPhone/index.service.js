import { useEffect, useCallback } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import replace from 'ramda/src/replace'
import pathOr from 'ramda/src/pathOr'
import { logEvent } from 'services/Analytics'
import { pageHeaderLeft } from 'navigation/options'

const AuthPhoneComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupPhone = useSelector(state => state.signup.signupPhone)
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
      headerLeft: (props) => pageHeaderLeft({ ...props, onPress: handleGoBack }),
    })
  }, [])

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupPhoneRequest(payload))

    /**
     *
     */
    logEvent('SIGNUP_CREATE_REQUEST')
    const signupCreatePayload = {
      username: signupUsername.payload.username,
      usernameType: 'phone',
      phone: `${payload.countryCode}${payload.phone}`,
      email: null,
      password: signupPassword.payload.password,
    }
    dispatch(signupActions.signupCreateRequest(signupCreatePayload))
  }

  /**
   * Create new user once phone and password is received from previous steps
   * 
   * Previous steps include:
   * - signupUsername -> AuthUsernameScreen
   * - signupPhone -> AuthPhoneScreen
   * - signupPassword -> AuthPasswordScreen
   */
  useEffect(() => {
    if (
      !signupUsername.payload.username ||
      !signupPhone.payload.phone ||
      !signupPassword.payload.password
    ) return

    if (
      signupUsername.payload.username === signupCognitoIdentity.username &&
      signupPhone.payload.phone === signupCognitoIdentity.cognitoUsername &&
      signupPassword.payload.password === signupCognitoIdentity.password
    ) {
      navigationActions.navigateAuthPhoneConfirm(navigation)()
      return
    }
  }, [
    signupUsername.payload.username,
    signupPhone.payload.phone,
    signupPassword.payload.password,

    signupUsername.status,
    signupPhone.status,
    signupPassword.status,
  ])

  /**
   * Redirect to verification confirmation once signup was successful
   */
  useEffect(() => {
    if (
      signupCreate.status !== 'success' ||
      signupCreate.data.cognitoDelivery !== 'SMS'
    ) return

    logEvent('SIGNUP_CREATE_SUCCESS')
    navigationActions.navigateAuthPhoneConfirm(navigation)()
  }, [
    signupCreate.status,
  ])

  const formSubmitLoading = signupCreate.status === 'loading'
  const formSubmitDisabled = signupCreate.status === 'loading'
  const formErrorMessage = signupCreate.error.text

  const formInitialValues = {
    countryCode: '+1',
    phone: signupPhone.payload.phone,
  }

  const handleFormTransform = (values) => ({
    countryCode: compose(replace(/[^+0-9]/g, ''), trim, toLower, pathOr('', ['countryCode']))(values),
    phone: compose(replace(/[^0-9]/g, ''), trim, toLower, pathOr('', ['phone']))(values),
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

export default AuthPhoneComponentService
