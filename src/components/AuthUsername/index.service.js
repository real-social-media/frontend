import React, { useEffect } from 'react'
import path from 'ramda/src/path'
import * as signupActions from 'store/ducks/signup/actions'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import * as Validation from 'services/Validation'
import HeaderRight from 'navigation/HeaderRight'

const AuthUsernameComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const signupUsername = useSelector((state) => state.signup.signupUsername)
  const route = useRoute()
  const navigation = useNavigation()
  const nextRoute = path(['params', 'nextRoute'], route)

  const handleFormTransform = (values) => ({
    username: Validation.getUsername(values),
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    formApi.setValues(nextValues)

    dispatch(
      signupActions.signupUsernameRequest({
        username: path(['username'], nextValues),
        nextRoute,
      }),
    )
  }

  const handleSkip = () => {
    dispatch(signupActions.signupUsernameSkip({ nextRoute }))
  }

  const headerRight = () => (
    <HeaderRight
      onPress={handleSkip}
      title="Skip"
    />
  )

  useEffect(() => {
    navigation.setOptions({ headerRight })
    dispatch(signupActions.signupUsernameIdle())
  }, [])

  const formSubmitLoading = signupUsername.status === 'loading'
  const formSubmitDisabled = signupUsername.status === 'loading'
  const formInitialValues = {}

  return children({
    handleFormSubmit,
    formSubmitLoading,
    formSubmitDisabled,
    formInitialValues,
  })
}

export default AuthUsernameComponentService
