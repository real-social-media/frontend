import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const authSignin = useSelector(state => state.auth.authSignin)
  const authCheck = useSelector(state => state.auth.authCheck)

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower, pathOr('', ['username']))(values),
    password: values.password,
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    formApi.setValues(nextValues)

    dispatch(authActions.authSigninSubmit({
      usernameType: 'email',
      username: toLower(nextValues.username),
      password: nextValues.password,
    }))
  }

  const formSubmitting = authSignin.status === 'loading' || authCheck.status === 'loading'
  const formErrorMessage = authSignin.error.text || authCheck.error.text

  const formInitialValues = {
    username: pathOr('', ['payload', 'username'])(authSignin),
    password: pathOr('', ['payload', 'password'])(authSignin),
  }

  const handleErrorClose = () => {
    dispatch(authActions.authSigninIdle())
    dispatch(authActions.authCheckIdle())
  }

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
    formSubmitting,
    formInitialValues,
  })
}

export default AuthSigninComponentService
