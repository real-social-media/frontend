import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as authActions from 'store/ducks/auth/actions'
import { useNavigation } from '@react-navigation/native'

const ProfileEditService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
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
      navigation.navigate('Auth')
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
