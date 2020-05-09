import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const AuthPhoneConfirmComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupEmail = useSelector(state => state.signup.signupEmail)
  const signupPassword = useSelector(state => state.signup.signupPassword)
  const signupConfirm = useSelector(state => state.signup.signupConfirm)
  const signupCognitoIdentity = useSelector(state => state.signup.signupCognitoIdentity)

  const handleFormSubmit = (payload) => {
    const nextPayload = {
      confirmationCode: payload.confirmationCode,
      cognitoUsername: signupCognitoIdentity.cognitoUsername,
      cognitoUserId: signupCognitoIdentity.cognitoUserId,
      username: signupUsername.payload.username,
      password: signupPassword.payload.password,
    }
    dispatch(signupActions.signupConfirmRequest(nextPayload))
  }

  /**
   * Create new user once email and password is received from previous steps
   * 
   * Previous steps include:
   * - signupUsername -> AuthUsernameScreen
   * - signupEmail -> AuthPhoneScreen
   * - signupPassword -> AuthPasswordScreen
   */
  useEffect(() => {
    if (
      !signupUsername.payload.username ||
      !signupEmail.payload.email ||
      !signupPassword.payload.password
    ) return
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
      signupConfirm.status !== 'success'
    ) return

    navigationActions.navigateAuthPhoto(navigation)()
  }, [
    signupConfirm.status === 'success',
  ])

  const formSubmitLoading = signupConfirm.status === 'loading'
  const formSubmitDisabled = signupConfirm.status === 'loading'
  const formErrorMessage = signupConfirm.error.text

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

export default AuthPhoneConfirmComponentService
