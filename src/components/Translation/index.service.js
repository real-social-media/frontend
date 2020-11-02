import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'

const TranslationService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)

  const usersEditProfileRequest = (payload) =>
    dispatch(usersActions.usersEditProfileRequest({ languageCode: payload.languageCode }))
  
  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle({}))
    }
  }, [usersEditProfile.status])

  return children({
    user,
    usersEditProfileRequest,
  })
}

export default TranslationService
