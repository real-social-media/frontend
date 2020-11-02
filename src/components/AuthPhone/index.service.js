import { useEffect, useCallback, useContext } from 'react'
import * as signupActions from 'store/ducks/signup/actions'
import * as navigationActions from 'navigation/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { ThemeContext } from 'services/providers/Theme'
import trim from 'ramda/src/trim'
import compose from 'ramda/src/compose'
import toLower from 'ramda/src/toLower'
import replace from 'ramda/src/replace'
import pathOr from 'ramda/src/pathOr'
import { logEvent } from 'services/Analytics'
import { pageHeaderLeft } from 'navigation/options'

const AuthPhoneComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { theme } = useContext(ThemeContext)

  const signupCheck = useSelector(state => state.signup.signupCheck)
  const signupPhone = useSelector(state => state.signup.signupPhone)
  const signupCreate = useSelector(state => state.signup.signupCreate)

  /**
   * Navigation state reset on back button press
   */
  const handleGoBack = useCallback(() => {
    dispatch(signupActions.signupEmailIdle({}))
    dispatch(signupActions.signupPhoneIdle({}))
    dispatch(signupActions.signupCreateIdle({}))
    navigationActions.navigateAuthPassword(navigation)
  }, [])

  useEffect(() => {
    const tabNavigator = navigation.dangerouslyGetParent()
    if (!tabNavigator) return
    tabNavigator.setOptions({
      headerLeft: (props) => pageHeaderLeft({ ...props, onPress: handleGoBack, theme }),
    })
  }, [])

  const handleFormSubmit = (payload) => {
    dispatch(signupActions.signupPhoneRequest(payload))

    /**
     *
     */
    logEvent('SIGNUP_CREATE_REQUEST')
    const signupCreatePayload = {
      username: signupCheck.payload.username,
      usernameType: 'phone',
      phone: `${payload.countryCode}${payload.phone}`,
      email: null,
    }
    dispatch(signupActions.signupCreateRequest(signupCreatePayload))
  }

  const formSubmitLoading = signupCreate.status === 'loading'
  const formSubmitDisabled = signupCreate.status === 'loading'
  const formErrorMessage = signupCreate.error.text

  const formInitialValues = {
    countryCode: '+1',
    phone: signupPhone.payload.phone,
  }

  const handleFormTransform = (values) => ({
    countryCode: compose(replace(/[^+0-9]/g, ''), trim, toLower, pathOr('', ['countryCode']))(values),
    phone: compose(replace(/[^0-9]/g, ''), trim, toLower, pathOr('', ['phone']))(values),
  })

  const handleErrorClose = () => dispatch(signupActions.signupCreateIdle({}))

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

export default AuthPhoneComponentService
