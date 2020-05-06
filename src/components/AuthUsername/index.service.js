import { useCallback } from 'react'
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
    navigationActions.navigateAuthPassword(navigation)()
  }

  const formSubmitLoading = false

  const formInitialValues = {
    username: signupUsername.payload.username,
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

  return children({
    handleFormSubmit,
    formSubmitLoading,
    formInitialValues,
  })
}

export default AuthUsernameComponentService
