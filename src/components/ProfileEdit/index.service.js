import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as authActions from 'store/ducks/auth/actions'

const ProfileEditService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  const authSignout = useSelector(state => state.auth.authSignout)
  
  const usersEditProfileRequest = (payload) =>
    dispatch(usersActions.usersEditProfileRequest(payload))
  
  const authSignoutRequest = () => 
    dispatch(authActions.authSignoutRequest())

  useEffect(() => {
    if (authSignout.status === 'success') {
      dispatch(authActions.authCheckIdle())
      dispatch(authActions.authSignoutIdle())
    }
  }, [
    authSignout.status,
  ])

  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle())
    }
  }, [usersEditProfile.status])

  return children({
    authSignout,
    authSignoutRequest,
    user,
    usersEditProfile,
    usersEditProfileRequest,
  })
}

export default ProfileEditService
