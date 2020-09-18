import { useState } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import { useDispatch } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const [formErrorMessage, setFormErrorMessage] = useState()
  const handleErrorClose = () => setFormErrorMessage(undefined)

  const handleFormSubmit = async (values, formApi) => {
    try {
      const nextValues = {
        username: compose(trim, toLower, pathOr('', ['username']))(values),
        password: values.password,
      }

      formApi.setValues(nextValues)

      await new Promise((resolve, reject) => {
        dispatch(
          authActions.authSigninRequest({
            values: { usernameType: 'email', ...nextValues },
            resolve,
            reject,
          }),
        )
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
