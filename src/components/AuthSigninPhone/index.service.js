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

  const handleFormSubmit = (payload) => {
    dispatch(authActions.authSigninRequest({
      usernameType: 'phone',
      countryCode: payload.countryCode,
      username: `${payload.countryCode}${payload.username}`,
      password: payload.password,
    }))
  }

  const formSubmitLoading = authSignin.status === 'loading'
  const formSubmitDisabled = authSignin.status === 'loading'
  const formErrorMessage = authSignin.error.text

  const formInitialValues = {
    countryCode: '+1',
    username: replace(pathOr('', ['payload', 'countryCode'])(authSignin), '', pathOr('', ['payload', 'username'])(authSignin)),
    password: pathOr('', ['payload', 'password'])(authSignin),
  }

  const handleFormTransform = (values) => ({
    countryCode: compose(replace(/[^+0-9]/g, ''), trim, toLower, pathOr('', ['countryCode']))(values),
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
