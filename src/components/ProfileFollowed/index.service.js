import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'

const ProfileFollowedService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const userId = route.params.user.userId
  const usersGetFollowedUsers = useSelector(state => state.users.usersGetFollowedUsers)
  const usersGetFollowedUsersCache = useSelector(state => state.users.usersGetFollowedUsersCache)
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)

  const usersGetFollowedUsersRequest = (payload) => 
    dispatch(usersActions.usersGetFollowedUsersRequest(payload))

  const usersGetFollowedUsersIdle = (payload) => 
    dispatch(usersActions.usersGetFollowedUsersIdle(payload))

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))
  
  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))
  
  const usersAcceptFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersAcceptFollowerUserRequest({ userId }))

  useEffect(() => {
    if (usersFollow.status === 'success') {
      usersGetFollowedUsersRequest({ userId })
    }
    if (usersUnfollow.status === 'success') {
      usersGetFollowedUsersRequest({ userId })
    }
  }, [usersFollow.status, usersUnfollow.status])

  useFocusEffect(
    useCallback(() => {
      usersGetFollowedUsersRequest({ userId })

      return () => {
        usersGetFollowedUsersIdle({ payload: { userId } })
      }
    }, [userId])
  )

  return children({
    usersGetFollowedUsers: usersServices.cachedUsersGetFollowedUsers(usersGetFollowedUsers, usersGetFollowedUsersCache, userId),
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
    usersAcceptFollowerUser,
    usersAcceptFollowerUserRequest,
  })
}

export default ProfileFollowedService
