import * as Yup from 'yup'
import path from 'ramda/src/path'
import debounce from 'debounce-async'
import API, { graphqlOperation } from '@aws-amplify/api'
import * as usersQueries from 'store/ducks/users/queries'

export async function usernameStatusRequest(username) {
  const response = await API.graphql(graphqlOperation(usersQueries.usernameStatus, { username }))
  return path(['data', 'usernameStatus'], response)
}

export const remoteUsernameValidation = () => {
  function validate(value) {
    return new Promise((resolve) => {
      usernameStatusRequest(value)
        .then((usernameStatus) => resolve(usernameStatus === 'AVAILABLE'))
        .catch(() => resolve(true))
    })
  }

  const debouncedValidation = debounce(validate, 300, { leading: true })
  const ignoreError = () => {}

  return function (value) {
    return debouncedValidation(value).catch(ignoreError)
  }
}

export const username = Yup.string()
  .min(3)
  .max(50)
  .matches(/^[a-zA-Z0-9_.]*$/, 'username must only contain letters & numbers')
  .trim()
  .required()
  .test('usernameReserve', 'username is reserved', remoteUsernameValidation())
