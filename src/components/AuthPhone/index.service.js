import { useEffect, useCallback } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'

const AuthPhoneComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupPhone = useSelector(state => state.signup.signupPhone)
  const signupPassword = useSelector(state => state.signup.signupPassword)
  const signupCreate = useSelector(state => state.signup.signupCreate)
  const signupCognitoIdentity = useSelector(state => state.signup.signupCognitoIdentity)

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupEmailIdle())
    dispatch(signupActions.signupPhoneRequest(payload))
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

    const payload = {
      username: signupUsername.payload.username,
      usernameType: 'phone',
      phone: signupPhone.payload.phone,
      email: null,
      password: signupPassword.payload.password,
    }
    dispatch(signupActions.signupCreateRequest(payload))
  }, [
    signupUsername.status === 'success',
    signupPhone.status === 'success',
    signupPassword.status === 'success'
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
    signupCreate.status === 'success',
  ])

  /**
   * Cleaning up phone verification sending on screen blur
   */
  useFocusEffect(
    useCallback(() => {
      return () => {
        // dispatch(signupActions.signupEmailIdle())
        // dispatch(signupActions.signupPhoneIdle())
      }
    }, [])
  )

  const formSubmitLoading = signupCreate.status === 'loading'
  const formSubmitDisabled = signupCreate.status === 'loading'
  const formErrorMessage = signupCreate.error.text

  const formInitialValues = {
    phone: signupPhone.payload.phone,
  }

  const handleFormTransform = (values) => ({
    phone: compose(trim, toLower)(values.phone),
  })

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleFormTransform,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthPhoneComponentService
