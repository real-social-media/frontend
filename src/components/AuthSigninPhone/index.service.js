import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import replace from 'ramda/src/replace'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const authSigninCognito = useSelector(state => state.auth.authSigninCognito)

  const handleFormSubmit = (payload) => {
    dispatch(authActions.authSigninCognitoRequest({
      usernameType: 'phone',
      countryCode: payload.countryCode,
      username: `${payload.countryCode}${payload.username}`,
    }))
  }

  const formSubmitLoading = authSigninCognito.status === 'loading'
  const formSubmitDisabled = authSigninCognito.status === 'loading'
  const formErrorMessage = authSigninCognito.error.text

  const formInitialValues = {
    countryCode: '+1',
    username: replace(pathOr('', ['payload', 'countryCode'])(authSigninCognito), '', pathOr('', ['payload', 'username'])(authSigninCognito)),
  }

  const handleFormTransform = (values) => ({
    countryCode: compose(replace(/[^+0-9]/g, ''), trim, toLower, pathOr('', ['countryCode']))(values),
    username: compose(trim, toLower, pathOr('', ['username']))(values),
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
