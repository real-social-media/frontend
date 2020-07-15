import { useEffect, useCallback } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import replace from 'ramda/src/replace'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'
import { pageHeaderLeft } from 'navigation/options'

const AuthForgotComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const authForgot = useSelector(state => state.auth.authForgot)

  const handleFormSubmit = (payload) => {
    dispatch(authActions.authForgotRequest({
      countryCode: payload.countryCode,
      username: `${payload.countryCode}${payload.username}`,
    }))
  }

  /**
   * Navigation state reset on back button press
   */
  const handleGoBack = useCallback(() => {
    dispatch(authActions.authForgotIdle({}))
    navigationActions.navigateAuthHome(navigation)()
  }, [])

  useEffect(() => {
    const tabNavigator = navigation.dangerouslyGetParent();
    if (!tabNavigator) return
    tabNavigator.setOptions({
      headerLeft: (props) => pageHeaderLeft({ ...props, onPress: handleGoBack }),
    })
  }, [])

  /**
   * Redirect to verification confirmation once reset was successful
   */
  useEffect(() => {
    if (
      authForgot.status !== 'success'
    ) return

    navigationActions.navigateAuthForgotConfirm(navigation)()
  }, [
    authForgot.status === 'success',
  ])

  const formSubmitLoading = authForgot.status === 'loading'
  const formSubmitDisabled = authForgot.status === 'loading'
  const formErrorMessage = authForgot.error.text

  const formInitialValues = {
    countryCode: '+1',
    username: authForgot.payload.username,
  }

  const handleFormTransform = (values) => ({
    countryCode: compose(replace(/[^+0-9]/g, ''), trim, toLower, pathOr('', ['countryCode']))(values),
    username: compose(trim, toLower, pathOr('', ['username']))(values),
  })

  const handleErrorClose = () => dispatch(authActions.authForgotIdle({}))

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

export default AuthForgotComponentService
