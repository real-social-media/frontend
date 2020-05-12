import { useEffect, useCallback } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'

const AuthForgotComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const authForgot = useSelector(state => state.auth.authForgot)

  const handleFormSubmit = (payload) => {
    dispatch(authActions.authForgotRequest({
      username: toLower(payload.username),
    }))
  }

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
    username: authForgot.payload.username,
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower)(values.username),
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

export default AuthForgotComponentService
