import { useEffect, useCallback } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const AuthEmailComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupEmail = useSelector(state => state.signup.signupEmail)
  const signupPassword = useSelector(state => state.signup.signupPassword)
  const signupCreate = useSelector(state => state.signup.signupCreate)

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupPhoneIdle())
    dispatch(signupActions.signupEmailRequest(payload))
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

    const payload = {
      usernameType: 'email',
      phone: null,
      email: signupEmail.payload.email,
      password: signupPassword.payload.password,
    }
    dispatch(signupActions.signupCreateRequest(payload))
  }, [
    signupUsername.status === 'success',
    signupEmail.status === 'success',
    signupPassword.status === 'success'
  ])

  /**
   * Redirect to verification confirmation once signup was successful
   */
  useEffect(() => {
    if (
      signupCreate.status !== 'success'
    ) return

    navigationActions.navigateAuthEmailConfirm(navigation)()
  }, [
    signupCreate.status === 'success',
  ])

  /**
   * Cleaning up email verification sending on screen blur
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
    email: signupEmail.payload.email,
  }

  return children({
    formErrorMessage,
    handleFormSubmit,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthEmailComponentService
