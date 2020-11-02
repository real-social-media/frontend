import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as navigationActions from 'navigation/actions'
import { useNavigation } from '@react-navigation/native'
import path from 'ramda/src/path'
import dayjs from 'dayjs'

const DatingMatchService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  const usersAge = dayjs().diff(user.dateOfBirth, 'year')

  const lowerBoundAge = (age) => {
    if (age <= 23 || !age) return 18
    return age - 5
  }

  const upperBoundAge = (age) => {
    if (age <= 23 || !age) return 23
    return age + 5
  }

  const usersEditProfileRequest = (payload) =>
    dispatch(usersActions.usersEditProfileRequest(payload))
  
  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle({}))
      navigationActions.navigateDatingProfile(navigation)()
    }
  }, [usersEditProfile.status])

  /**
   * Form helpers
   */
  const handleFormTransform = (values) => ({
    matchAgeRange: {
      min: values.matchAgeRangeMin,
      max: values.matchAgeRangeMax,
    },
    matchGenders: values.matchGenders,
    matchLocationRadius: values.matchLocationRadius,
    location: values.location,
  })

  const handleFormSubmit = (values) => {
    usersEditProfileRequest(handleFormTransform(values))
  }

  const formSubmitLoading = usersEditProfile.status === 'loading'
  const formSubmitDisabled = usersEditProfile.status === 'loading'
  const formErrorMessage = usersEditProfile.error.text

  const formInitialValues = {
    matchAgeRangeMin: path(['matchAgeRange', 'min'], user) || lowerBoundAge(usersAge),
    matchAgeRangeMax: path(['matchAgeRange', 'max'], user) || upperBoundAge(usersAge),
    matchGenders: path(['matchGenders', 0], user) || 'FEMALE',
    matchLocationRadius: user.matchLocationRadius || 50,
    location: user.location,
  }

  const handleErrorClose = () => dispatch(usersActions.usersEditProfileIdle({}))

  return children({
    form: {
      handleFormSubmit,
      formInitialValues,
      formSubmitLoading,
      formSubmitDisabled,
      formErrorMessage,
      handleErrorClose,
    },
  })
}

export default DatingMatchService
