import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import { useNavigation } from '@react-navigation/native'

const ProfileService = ({ children, }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.user)
  const usersGetProfileSelf = useSelector(state => state.users.usersGetProfileSelf)
  const userId = authUser.userId

  const usersGetProfileSelfRequest = ({ userId }) => 
    dispatch(usersActions.usersGetProfileSelfRequest({ userId }))

  useEffect(() => {
    usersGetProfileSelfRequest({ userId })
  }, [userId])

  return children({
    authUser,
    usersGetProfile: usersServices.cachedUsersGetProfileSelf(usersGetProfileSelf, authUser),
    usersGetProfileSelfRequest,
  })
}

export default ProfileService
