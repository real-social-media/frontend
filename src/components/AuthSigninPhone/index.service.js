import { useState } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import { useDispatch } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'
import replace from 'ramda/src/replace'

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const [formErrorMessage, setFormErrorMessage] = useState()
  const handleErrorClose = () => setFormErrorMessage(undefined)

  const handleFormSubmit = async (values, formApi) => {
    try {
      const nextValues = {
        countryCode: compose(replace(/[^+0-9]/g, ''), trim, toLower, pathOr('', ['countryCode']))(values),
        username: compose(trim, toLower, pathOr('', ['username']))(values),
        password: values.password,
      }

      formApi.setValues(nextValues)

      await new Promise((resolve, reject) => {
        dispatch(
          authActions.authSigninRequest({
            values: {
              usernameType: 'phone',
              countryCode: nextValues.countryCode,
              username: `${nextValues.countryCode}${nextValues.username}`,
              password: nextValues.password,
            },
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
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
  })
}

export default AuthSigninComponentService
