import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import { useNavigation, useRoute } from '@react-navigation/native'

const ProfileFollowerService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const userId = route.params.userId
  const usersGetFollowerUsers = useSelector(state => state.users.usersGetFollowerUsers)
  const usersGetFollowerUsersCache = useSelector(state => state.users.usersGetFollowerUsersCache)
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)

  const usersGetFollowerUsersRequest = (payload) => 
    dispatch(usersActions.usersGetFollowerUsersRequest(payload))

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))
  
  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))
  
  const usersAcceptFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersAcceptFollowerUserRequest({ userId }))

  useEffect(() => {
    if (usersFollow.status === 'success') {
      usersGetFollowerUsersRequest({ userId })
    }
    if (usersUnfollow.status === 'success') {
      usersGetFollowerUsersRequest({ userId })
    }
  }, [usersFollow.status, usersUnfollow.status])

  useEffect(() => {
    usersGetFollowerUsersRequest({ userId })
  }, [userId])

  return children({
    usersGetFollowerUsers: usersServices.cachedUsersGetFollowerUsers(usersGetFollowerUsers, usersGetFollowerUsersCache, userId),
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
    usersAcceptFollowerUser,
    usersAcceptFollowerUserRequest,
  })
}

export default ProfileFollowerService
