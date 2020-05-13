import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

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
    username: compose(trim, toLower, pathOr('', ['username']))(values),
    password: values.password,
  })

  const handleErrorClose = () => dispatch(authActions.authSigninIdle())

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

export default AuthSigninComponentService
