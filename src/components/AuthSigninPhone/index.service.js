import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()

  const authSignin = useSelector(state => state.auth.authSignin)

  const handleFormSubmit = async (values, formApi) => {
    try {
      await new Promise((resolve, reject) => {
        dispatch(authActions.authSigninPhoneFormSubmit({ values, resolve, reject, formApi }))
      })
    } catch (error) {
      formApi.setFieldError('general', error.message)
    }
  }

  const formErrorMessage = authSignin.error.text

  const handleErrorClose = () => dispatch(authActions.authSigninIdle({}))

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
  })
}

export default AuthSigninComponentService
