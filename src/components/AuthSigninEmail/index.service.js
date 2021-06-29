import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import * as Validation from 'services/Validation'
import * as authSelectors from 'store/ducks/auth/selectors'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const authSigninCognito = useSelector(authSelectors.authSigninCognito)
  const authFlow = useSelector(authSelectors.authFlow)

  const handleFormTransform = (values) => ({
    email: Validation.getEmail(values),
    password: Validation.getPassword(values),
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    formApi.setValues(nextValues)

    dispatch(authActions.authSigninCognitoRequest({
      username: nextValues.email,
      email: nextValues.email,
      password: nextValues.password,
    }))
  }

  const formSubmitLoading = authSigninCognito.status === 'loading' || authFlow.status === 'loading'
  const formSubmitDisabled = authSigninCognito.status === 'loading' || authFlow.status === 'loading'
  const formInitialValues = handleFormTransform(authSigninCognito.payload)

  return children({
    handleFormSubmit,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthSigninComponentService
