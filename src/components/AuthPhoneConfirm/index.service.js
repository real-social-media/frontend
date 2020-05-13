import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'

const AuthPhoneConfirmComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupPhone = useSelector(state => state.signup.signupPhone)
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
  }, [
    signupUsername.status,
    signupPhone.status,
    signupPassword.status
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
    signupConfirm.status,
  ])

  const formSubmitLoading = signupConfirm.status === 'loading'
  const formSubmitDisabled = signupConfirm.status === 'loading'
  const formErrorMessage = signupConfirm.error.text

  const formInitialValues = {
    cognitoUsername: path(['cognitoUsername'])(signupCognitoIdentity),
    confirmationCode: path(['params', 'confirmationCode'])(route),
  }

  const handleFormTransform = (values) => values

  const handleErrorClose = () => dispatch(signupActions.signupConfirmIdle())

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

export default AuthPhoneConfirmComponentService
