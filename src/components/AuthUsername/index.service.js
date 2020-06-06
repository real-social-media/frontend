import { useEffect, useCallback } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'
import { logEvent } from 'services/Analytics'
import { pageHeaderLeft } from 'navigation/options'

const AuthUsernameComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)

  const handleFormSubmit = (payload) => {
    logEvent('SIGNUP_USERNAME_REQUEST')
    dispatch(signupActions.signupUsernameRequest(payload))
  }

  /**
   * Navigation state reset on back button press
   */
  const handleGoBack = useCallback(() => {
    dispatch(signupActions.signupUsernameIdle({}))
    navigationActions.navigateAuthHome(navigation)()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => pageHeaderLeft({ ...props, onPress: handleGoBack }),
    })
  }, [])

  /**
   * Redirect to password selection once username is available
   */
  useEffect(() => {
    if (
      signupUsername.status !== 'success'
    ) return

    logEvent('SIGNUP_USERNAME_SUCCESS')
    navigationActions.navigateAuthPassword(navigation)()
  }, [
    signupUsername.status,
    signupUsername.payload.username,
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

  const handleErrorClose = () => dispatch(signupActions.signupUsernameIdle({}))

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

export default AuthUsernameComponentService
