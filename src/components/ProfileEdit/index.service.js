import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'
import * as Validation from 'services/Validation'
import { useEffectWhenFocused } from 'services/hooks'

const ProfileEditService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUser)
  const usersEditProfile = useSelector(usersSelector.usersEditProfile)

  const handleFormTransform = (values) => ({
    email: Validation.getEmail(values),
    phoneNumber: Validation.getPhoneNumber(values),
    username: Validation.getUsername(values),
    fullName: Validation.getFullName(values),
    bio: Validation.getBio(values),
  })

  const handleFormSubmit = (values, formApi) => {
    const nextValues = handleFormTransform(values)
    const meta = { messageCode: 'FORM_EDIT_PROFILE' }
    formApi.setValues(nextValues)

    dispatch(usersActions.usersEditProfileRequest(nextValues, meta))
  }

  useEffectWhenFocused(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle())
    }
  }, [usersEditProfile.status])

  const formInitialValues = handleFormTransform(user)
  const formSubmitLoading = usersEditProfile.status === 'loading'

  return children({
    formInitialValues,
    formSubmitLoading,
    handleFormSubmit,
  })
}

export default ProfileEditService
