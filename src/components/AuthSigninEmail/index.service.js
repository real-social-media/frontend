import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const authSignin = useSelector(state => state.auth.authSignin)

  const handleFormSubmit = (values, formApi) => {
    const nextValues = {
      username: compose(trim, toLower, pathOr('', ['username']))(values),
      password: values.password,
    }

    formApi.setValues(nextValues)
    
    dispatch(authActions.authSigninRequest({ usernameType: 'email', ...nextValues }))
  }

  const formSubmitLoading = authSignin.status === 'loading'
  const formSubmitDisabled = authSignin.status === 'loading'
  const formErrorMessage = authSignin.error.text

  const handleErrorClose = () => dispatch(authActions.authSigninIdle({}))

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
    formSubmitLoading,
    formSubmitDisabled,
  })
}

export default AuthSigninComponentService
