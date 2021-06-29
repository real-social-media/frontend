
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'
import { useEffectWhenFocused } from 'services/hooks'

const TranslationService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUser)
  const usersEditProfile = useSelector(usersSelector.usersEditProfile)

  const usersEditProfileRequest = (payload) =>
    dispatch(usersActions.usersEditProfileRequest({ languageCode: payload.languageCode }))

  useEffectWhenFocused(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle())
    }
  }, [usersEditProfile.status])

  return children({
    user,
    usersEditProfileRequest,
  })
}

export default TranslationService
