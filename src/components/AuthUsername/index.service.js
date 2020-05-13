import { useEffect } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'

const AuthUsernameComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const signupUsername = useSelector(state => state.signup.signupUsername)

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupUsernameRequest(payload))
  }

  /**
   * Redirect to password selection once username is available
   */
  useEffect(() => {
    if (
      signupUsername.status !== 'success'
    ) return

    navigationActions.navigateAuthPassword(navigation)()
  }, [
    signupUsername.status === 'success',
  ])

  const formSubmitLoading = signupUsername.status === 'loading'
  const formSubmitDisabled = signupUsername.status === 'loading'
  const formErrorMessage = signupUsername.error.text

  const formInitialValues = {
    username: signupUsername.payload.username,
  }

  const handleFormTransform = (values) => ({
    username: compose(trim, toLower)(values.username),
  })

  return children({
    formErrorMessage,
    handleFormSubmit,
    handleFormTransform,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthUsernameComponentService
