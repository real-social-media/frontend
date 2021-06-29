import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffectWhenFocused } from 'services/hooks'
import * as helpers from 'components/DatingMatch/helpers'
import pathOr from 'ramda/src/pathOr'
import * as Units from 'constants/Units'

const DatingAboutService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUser)
  const usersEditProfile = useSelector(usersSelector.usersEditProfile)
  const dateOfBirthParsed = helpers.getDateOfBirth(user)
  const route = useRoute()
  const nextAction = pathOr(false, ['params', 'nextAction'], route)

  useEffectWhenFocused(() => {
    if (usersEditProfile.status === 'success' && nextAction === false) {
      dispatch(usersActions.usersEditProfileIdle())
      navigation.goBack()
    }
  }, [usersEditProfile.status])

  /**
   * Form helpers
   */
  const handleFormTransform = (values) => ({
    dateOfBirth: helpers.makeDateOfBirth(values),
    gender: values.gender,
    displayName: values.displayName,
    bio: values.bio,
    height: values.height,
  })

  const handleFormSubmit = (values) => {
    dispatch(usersActions.usersEditProfileRequest(handleFormTransform(values)))
  }

  const formSubmitLoading = usersEditProfile.status === 'loading'

  const formInitialValues = {
    dateOfBirthYear: dateOfBirthParsed.dateOfBirthYear,
    dateOfBirthMonth: dateOfBirthParsed.dateOfBirthMonth,
    dateOfBirthDay: dateOfBirthParsed.dateOfBirthDay,
    gender: user.gender,
    displayName: user.displayName,
    bio: user.bio,
    height: user.height ? user.height : Units.DEFAULT_HEIGHT,
  }

  return children({
    nextAction,
    handleFormSubmit,
    formInitialValues,
    formSubmitLoading,
  })
}

export default DatingAboutService
