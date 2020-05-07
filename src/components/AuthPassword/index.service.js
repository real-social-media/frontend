import { useEffect, useCallback } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const AuthPasswordComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupPassword = useSelector(state => state.signup.signupPassword)

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupPasswordRequest(payload))
  }

  /**
   * Redirect to verification confirmation once signup was successful
   */
  useEffect(() => {
    if (
      signupPassword.status !== 'success'
    ) return

    navigationActions.navigateSignup(navigation)()
  }, [
    signupPassword.status === 'success',
  ])

  const formSubmitLoading = signupPassword.status === 'loading'
  const formSubmitDisabled = signupPassword.status === 'loading'
  const formErrorMessage = signupPassword.error.text

  const formInitialValues = {
  }

  /**
   * Cleaning up email verification sending on screen blur
   */
  useFocusEffect(
    useCallback(() => {
      dispatch(signupActions.signupPasswordIdle())
      dispatch(signupActions.signupEmailIdle())
      dispatch(signupActions.signupPhoneIdle())

      return () => {}
    }, [])
  )

  return children({
    formErrorMessage,
    handleFormSubmit,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthPasswordComponentService
