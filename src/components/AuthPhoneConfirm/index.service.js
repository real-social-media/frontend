import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import { logEvent } from 'services/Analytics'

const AuthPhoneConfirmComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()

  const signupConfirm = useSelector(state => state.signup.signupConfirm)
  const signupCognitoIdentity = useSelector(state => state.signup.signupCognitoIdentity)

  const handleFormSubmit = (payload) => {
    logEvent('SIGNUP_CONFIRM_REQUEST')
    const nextPayload = {
      usernameType: 'email',
      confirmationCode: payload.confirmationCode,
      cognitoUsername: signupCognitoIdentity.cognitoUsername,
      cognitoUserId: signupCognitoIdentity.cognitoUserId,
      username: signupCognitoIdentity.username,
    }
    dispatch(signupActions.signupConfirmRequest(nextPayload))
  }

  const formSubmitLoading = signupConfirm.status === 'loading'
  const formSubmitDisabled = signupConfirm.status === 'loading'
  const formErrorMessage = signupConfirm.error.text

  const formInitialValues = {
    cognitoUsername: path(['cognitoUsername'])(signupCognitoIdentity),
    confirmationCode: path(['params', 'confirmationCode'])(route),
  }

  const handleFormTransform = (values) => ({
    cognitoUsername: values.cognitoUsername,
    confirmationCode: values.confirmationCode,
  })

  const handleErrorClose = () => dispatch(signupActions.signupConfirmIdle({}))

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
