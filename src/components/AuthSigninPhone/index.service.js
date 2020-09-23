import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import replace from 'ramda/src/replace'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const authSignin = useSelector(state => state.auth.authSignin)
  const authCheck = useSelector(state => state.auth.authCheck)

  const handleFormTransform = (values) => ({
    countryCode: compose(replace(/[^+0-9]/g, ''), trim, toLower, pathOr('', ['countryCode']))(values),
    username: compose(trim, toLower, pathOr('', ['username']))(values),
    password: values.password,
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    formApi.setValues(nextValues)

    dispatch(authActions.authSigninSubmit({
      usernameType: 'phone',
      countryCode: nextValues.countryCode,
      username: `${nextValues.countryCode}${nextValues.username}`,
      password: nextValues.password,
    }))
  }

  const formSubmitting = authSignin.status === 'loading' || authCheck.status === 'loading'
  const formErrorMessage = authSignin.error.text 

  const formInitialValues = {
    countryCode: '+1',
    username: replace(pathOr('', ['payload', 'countryCode'])(authSignin), '', pathOr('', ['payload', 'username'])(authSignin)),
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
