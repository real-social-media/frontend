import { useEffect, useCallback } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'

const guessUsernameType = (username) => {
  const hasEmail = /\S+@\S+\.\S+/.test(username)
  const hasPhone = /^[0-9 ()+-]+$/.test(username)

  return (() => {
    if (hasEmail) return 'email'
    if (hasPhone) return 'phone'
    return 'username'
  })()
}

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const authSignin = useSelector(state => state.auth.authSignin)

  const handleFormSubmit = (payload) => {
    const usernameType = guessUsernameType(payload.username)
    dispatch(authActions.authSignupIdle())
    dispatch(authActions.authSigninRequest({
      usernameType,
      username: toLower(payload.username),
      password: payload.password,
    }))
  }

  const formSubmitLoading = authSignin.status === 'loading'
  const formSubmitDisabled = authSignin.status === 'loading'
  const formErrorMessage = authSignin.error.text

  const formInitialValues = {
    username: authSignin.payload.username,
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower)(values.username),
    password: values.password,
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

export default AuthSigninComponentService
