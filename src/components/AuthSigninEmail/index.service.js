import { useState } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import { useDispatch } from 'react-redux'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const [formErrorMessage, setFormErrorMessage] = useState()
  const handleErrorClose = () => setFormErrorMessage(undefined)

  const handleFormSubmit = async (values, formApi) => {
    try {
      await new Promise((resolve, reject) => {
        dispatch(authActions.authSigninEmailFormSubmit({ values, resolve, reject, formApi }))
      })
    } catch (error) {
      setFormErrorMessage(error.message)
    }
  }

  return children({
    handleFormSubmit,
    formErrorMessage,
    handleErrorClose,
  })
}

export default AuthSigninComponentService
