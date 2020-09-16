import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthCognitoComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const signupUsername = useSelector(state => state.signup.signupUsername)
  const signupCognito = useSelector(state => state.signup.signupCognito)
  const authSignout = useSelector(state => state.auth.authSignout)

  const authSignoutRequest = () => 
    dispatch(authActions.authSignoutRequest({}))

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupUsernameRequest(payload))
  }

  useEffect(() => {
    if (authSignout.status === 'success') {
      dispatch(authActions.authCheckIdle({}))
      dispatch(authActions.authSignoutIdle({}))
    }
  }, [
    authSignout.status,
  ])

  /**
   * Create cognito user
   */
  useEffect(() => {
    if (
      signupUsername.status !== 'success'
    ) return

    const nextPayload = {
      username: signupUsername.payload.username,
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

    dispatch(authActions.authCheckRequest())
  }, [
    signupCognito.status,
  ])

  const formSubmitLoading = (
    signupUsername.status === 'loading' ||
    signupCognito.status === 'loading'
  )
  const formSubmitDisabled = (
    signupUsername.status === 'loading' ||
    signupCognito.status === 'loading'
  )
  const formErrorMessage = (
    signupUsername.error.text ||
    signupCognito.error.text
  )

  const formInitialValues = {
    username: signupUsername.payload.username,
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower, pathOr('', ['username']))(values),
  })

  const handleErrorClose = () => dispatch(signupActions.signupUsernameIdle({}))

  return children({
    authSignoutRequest,
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
