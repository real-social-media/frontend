import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import { useDispatch, useSelector } from 'react-redux'
import * as Validation from 'services/Validation'
import * as signupSelectors from 'store/ducks/signup/selectors'

const AuthPasswordComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const signupPassword = useSelector(signupSelectors.signupPassword)

  const onUnmount = () => {
    dispatch(signupActions.signupPasswordIdle())
  }

  useEffect(() => onUnmount, [])

  const handleFormTransform = (values) => ({
    password: Validation.getPassword(values),
  })

  const handleFormSubmit = (values) => {
    const nextValues = handleFormTransform(values)
    
    dispatch(signupActions.signupPasswordRequest(nextValues))
  }

  const formSubmitLoading = signupPassword.status === 'loading'
  const formSubmitDisabled = signupPassword.status === 'loading'
  const formErrorMessage = signupPassword.error.text
  const formInitialValues = handleFormTransform(signupPassword.payload)

  const handleErrorClose = () => dispatch(signupActions.signupPasswordIdle({}))

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

export default AuthPasswordComponentService
