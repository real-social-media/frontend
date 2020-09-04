import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const authSignin = useSelector(state => state.auth.authSignin)

  const handleFormSubmit = (payload) => {
    dispatch(authActions.authSigninRequest({
      usernameType: 'email',
      username: toLower(payload.username),
      password: payload.password,
    }))
  }

  const formSubmitLoading = authSignin.status === 'loading'
  const formSubmitDisabled = authSignin.status === 'loading'
  const formErrorMessage = authSignin.error.text

  const formInitialValues = {
    username: pathOr('', ['payload', 'username'])(authSignin),
    password: pathOr('', ['payload', 'password'])(authSignin),
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower, pathOr('', ['username']))(values),
    password: values.password,
  })

  const handleErrorClose = () => dispatch(authActions.authSigninIdle({}))

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
