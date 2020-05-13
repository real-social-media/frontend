import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import replace from 'ramda/src/replace'
import pathOr from 'ramda/src/pathOr'

const AuthPhoneComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupPhone = useSelector(state => state.signup.signupPhone)
  const signupPassword = useSelector(state => state.signup.signupPassword)
  const signupCreate = useSelector(state => state.signup.signupCreate)
  const signupCognitoIdentity = useSelector(state => state.signup.signupCognitoIdentity)

  /**
   *
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(signupActions.signupCreateIdle())
    })
    return unsubscribe
  }, [navigation])

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupPhoneRequest(payload))

    /**
     *
     */
    const signupCreatePayload = {
      username: signupUsername.payload.username,
      usernameType: 'phone',
      phone: signupPhone.payload.phone,
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
    signupPassword.status
  ])

  /**
   * Redirect to verification confirmation once signup was successful
   */
  useEffect(() => {
    if (
      signupCreate.status !== 'success' ||
      signupCreate.data.cognitoDelivery !== 'SMS'
    ) return

    navigationActions.navigateAuthPhoneConfirm(navigation)()
  }, [
    signupCreate.status,
  ])

  const formSubmitLoading = signupCreate.status === 'loading'
  const formSubmitDisabled = signupCreate.status === 'loading'
  const formErrorMessage = signupCreate.error.text

  const formInitialValues = {
    phone: signupPhone.payload.phone || '+1',
  }

  const handleFormTransform = (values) => ({
    phone: compose(replace(/[^+0-9]/g, ''),  trim, toLower, pathOr('', ['phone']))(values),
  })

  const handleErrorClose = () => dispatch(signupActions.signupCreateIdle())

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
