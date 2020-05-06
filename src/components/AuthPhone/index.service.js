import { useEffect, useCallback } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const AuthPhoneComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupPhone = useSelector(state => state.signup.signupPhone)
  const signupPassword = useSelector(state => state.signup.signupPassword)
  const signupCreate = useSelector(state => state.signup.signupCreate)

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

    const payload = {
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
      signupCreate.status !== 'success'
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
  const formErrorMessage = signupCreate.error.text

  const formInitialValues = {
    phone: signupPhone.payload.phone,
  }

  return children({
    formErrorMessage,
    handleFormSubmit,
    formSubmitLoading,
    formInitialValues,
  })
}

export default AuthPhoneComponentService
