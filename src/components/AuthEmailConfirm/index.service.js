import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'

const AuthEmailConfirmComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

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
      username: signupCognitoIdentity.username,
      password: signupCognitoIdentity.password,
    }
    dispatch(signupActions.signupConfirmRequest(nextPayload))
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

    dispatch(signupActions.signupCreateIdle())
    dispatch(signupActions.signupConfirmIdle())

    navigationActions.navigateAuthPhoto(navigation)()
  }, [
    signupConfirm.status === 'success',
  ])

  /**
   * Redirect to verification confirmation once signup was successful
   */
  useEffect(() => {
    if (
      path(['params', 'confirmationCode', 'length'])(route) !== 6 ||
      !path(['cognitoUsername', 'length'])(signupCognitoIdentity) ||
      !path(['cognitoUserId', 'length'])(signupCognitoIdentity) ||
      !path(['username', 'length'])(signupCognitoIdentity) ||
      !path(['password', 'length'])(signupCognitoIdentity)
    ) return

    handleFormSubmit({
      confirmationCode: path(['params', 'confirmationCode'])(route),
    })
  }, [
    path(['params', 'confirmationCode'])(route),
  ])

  const formSubmitLoading = signupConfirm.status === 'loading'
  const formSubmitDisabled = signupConfirm.status === 'loading'
  const formErrorMessage = signupConfirm.error.text

  const formInitialValues = {
    cognitoUsername: path(['cognitoUsername'])(signupCognitoIdentity),
    confirmationCode: path(['params', 'confirmationCode'])(route),
  }

  const handleFormTransform = (values) => values

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleFormTransform,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthEmailConfirmComponentService
