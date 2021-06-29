import { useEffect } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import * as authSelectors from 'store/ducks/auth/selectors'
import * as Validation from 'services/Validation'

const AuthForgotConfirmComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()
  const authForgot = useSelector(authSelectors.authForgot)
  const authForgotConfirm = useSelector(authSelectors.authForgotConfirm)

  const handleFormTransform = (values) => ({
    username: Validation.getUsername(values),
    confirmationCode: Validation.getConfirmationCode(values),
    password: Validation.getPassword(values),
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    formApi.setValues(nextValues)

    dispatch(authActions.authForgotConfirmRequest(nextValues))
  }

  const onUnmount = () => {
    dispatch(authActions.authForgotConfirmIdle())
  }

  useEffect(() => onUnmount, [])

  const formSubmitLoading = authForgotConfirm.status === 'loading'
  const formSubmitDisabled = authForgotConfirm.status === 'loading'
  const formInitialValues = handleFormTransform({ ...authForgot.payload, ...route.params })

  return children({
    handleFormSubmit,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthForgotConfirmComponentService
