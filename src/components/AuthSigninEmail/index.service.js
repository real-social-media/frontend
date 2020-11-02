import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const authSigninCognito = useSelector(state => state.auth.authSigninCognito)
  const authFlow = useSelector(state => state.auth.authFlow)

  const handleFormSubmit = (payload) => {
    dispatch(authActions.authSigninCognitoRequest({
      usernameType: 'email',
      username: toLower(payload.username),
      password: payload.password,
    }))
  }

  const formSubmitLoading = authSigninCognito.status === 'loading' || authFlow.status === 'loading'
  const formSubmitDisabled = authSigninCognito.status === 'loading' || authFlow.status === 'loading'
  const formErrorMessage = authSigninCognito.error.text

  const formInitialValues = {
    username: pathOr('', ['payload', 'username'])(authSigninCognito),
    password: pathOr('', ['payload', 'password'])(authSigninCognito),
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower, pathOr('', ['username']))(values),
    password: values.password,
  })

  const handleErrorClose = () => dispatch(authActions.authSigninCognitoIdle({}))

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
