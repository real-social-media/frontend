import { useEffect, useCallback } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const AuthUsernameComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupUsernameRequest(payload))
  }

  /**
   * Cleaning up email verification sending on screen blur
   */
  useFocusEffect(
    useCallback(() => {
      dispatch(signupActions.signupUsernameIdle())
      dispatch(signupActions.signupPasswordIdle())
      dispatch(signupActions.signupEmailIdle())
      dispatch(signupActions.signupPhoneIdle())

      return () => {}
    }, [])
  )

  /**
   * Redirect to password selection once username is available
   */
  useEffect(() => {
    if (
      signupUsername.status !== 'success'
    ) return

    navigationActions.navigateAuthPassword(navigation)()
  }, [
    signupUsername.status === 'success',
  ])

  const formSubmitLoading = signupUsername.status === 'loading'
  const formErrorMessage = signupUsername.error.text

  const formInitialValues = {
    username: signupUsername.payload.username,
  }

  return children({
    formErrorMessage,
    handleFormSubmit,
    formSubmitLoading,
    formInitialValues,
  })
}

export default AuthUsernameComponentService
