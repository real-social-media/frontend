import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'

const AuthEmailComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupEmail = useSelector(state => state.signup.signupEmail)
  const signupPassword = useSelector(state => state.signup.signupPassword)
  const signupCreate = useSelector(state => state.signup.signupCreate)
  const signupCognitoIdentity = useSelector(state => state.signup.signupCognitoIdentity)

  /**
   *
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(signupActions.signupCreateIdle())
    })
    return unsubscribe
  }, [navigation])

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupEmailRequest(payload))

    /**
     *
     */
    const signupCreatePayload = {
      username: signupUsername.payload.username,
      usernameType: 'email',
      phone: null,
      email: payload.email,
      password: signupPassword.payload.password,
    }
    dispatch(signupActions.signupCreateRequest(signupCreatePayload))
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

    if (
      signupUsername.payload.username === signupCognitoIdentity.username &&
      signupEmail.payload.email === signupCognitoIdentity.cognitoUsername &&
      signupPassword.payload.password === signupCognitoIdentity.password
    ) {
      navigationActions.navigateAuthEmailConfirm(navigation)()
      return
    }
  }, [
    signupUsername.payload.username,
    signupEmail.payload.email,
    signupPassword.payload.password,

    signupUsername.status,
    signupEmail.status,
    signupPassword.status
  ])

  /**
   * Redirect to verification confirmation once signup was successful
   */
  useEffect(() => {
    if (
      signupCreate.status !== 'success' ||
      signupCreate.data.cognitoDelivery !== 'EMAIL'
    ) return

    navigationActions.navigateAuthEmailConfirm(navigation)()
  }, [
    signupCreate.status,
  ])

  const formSubmitLoading = signupCreate.status === 'loading'
  const formSubmitDisabled = signupCreate.status === 'loading'
  const formErrorMessage = signupCreate.error.text

  const formInitialValues = {
    email: signupEmail.payload.email,
  }

  const handleFormTransform = (values) => ({
    email: compose(trim, toLower)(values.email),
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

export default AuthEmailComponentService
