import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthCognitoComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupCognito = useSelector(state => state.signup.signupCognito)

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupUsernameRequest(payload))
  }

  /**
   * Create cognito user
   */
  useEffect(() => {
    if (
      signupUsername.status !== 'success'
    ) return

    const nextPayload = {
      username: signupUsername.payload.username
    }

    dispatch(signupActions.signupCognitoRequest(nextPayload))
  }, [
    signupUsername.status,
    signupUsername.payload.username,
  ])

  /**
   * Redirect to password selection once username is available
   */
  useEffect(() => {
    if (
      signupCognito.status !== 'success'
    ) return

    navigationActions.navigateAuthPhoto(navigation)()
  }, [
    signupCognito.status,
  ])

  const formSubmitLoading = signupUsername.status === 'loading'
  const formSubmitDisabled = signupUsername.status === 'loading'
  const formErrorMessage = signupUsername.error.text

  const formInitialValues = {
    username: signupUsername.payload.username,
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower, pathOr('', ['username']))(values),
  })

  const handleErrorClose = () => dispatch(signupActions.signupUsernameIdle())

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

export default AuthCognitoComponentService
