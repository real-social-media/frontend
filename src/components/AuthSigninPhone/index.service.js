import { useState } from 'react'
import * as authActions from 'store/ducks/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import pathOr from 'ramda/src/pathOr'
import replace from 'ramda/src/replace'

const parseValues = values => ({
  countryCode: compose(replace(/[^+0-9]/g, ''), trim, toLower, pathOr('', ['countryCode']))(values),
  phone: compose(trim, toLower, pathOr('', ['phone']))(values),
  password: values.password,
})

const AuthSigninComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const authSignin = useSelector(state => state.auth.authSignin)
  const [formErrorMessage, setFormErrorMessage] = useState()
  const handleErrorClose = () => setFormErrorMessage(undefined)

  const handleFormSubmit = async (values, formApi) => {
    try {
      const nextValues = parseValues(values)
      formApi.setValues(nextValues)

      await new Promise((resolve, reject) => {
        const payload = {
          values: { usernameType: 'phone', ...nextValues },
          resolve,
          reject,
        }

        dispatch(authActions.authSigninFormSubmit(payload))
      })
    } catch (error) {
      setFormErrorMessage(error.message)
    }
  }

  const formInitialValues = {
    countryCode: pathOr('+1', ['values', 'countryCode'])(authSignin),
    phone: pathOr('', ['values', 'phone'])(authSignin),
    password: '',
  }

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleErrorClose,
    formInitialValues,
  })
}

export default AuthSigninComponentService
