import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersSelector from 'store/ducks/users/selectors'
import { useRoute } from '@react-navigation/native'

const ProfileFollowedService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()
  const userId = route.params.userId
  const usersGetFollowedUsers = useSelector(usersSelector.usersGetFollowedUsersSelector(userId))
  const usersFollow = useSelector((state) => state.users.usersFollow)
  const usersUnfollow = useSelector((state) => state.users.usersUnfollow)
  const usersAcceptFollowerUser = useSelector((state) => state.users.usersAcceptFollowerUser)

  const usersGetFollowedUsersRequest = () => dispatch(usersActions.usersGetFollowedUsersRequest({ userId }))

  const usersFollowRequest = ({ userId }) => dispatch(usersActions.usersFollowRequest({ userId }))

  const usersUnfollowRequest = ({ userId }) => dispatch(usersActions.usersUnfollowRequest({ userId }))

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

  useEffect(() => {
    usersGetFollowedUsersRequest({ userId })
  }, [userId])

  return children({
    usersGetFollowedUsers,
    usersGetFollowedUsersRequest,
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
    usersAcceptFollowerUser,
    usersAcceptFollowerUserRequest,
  })
}

export default ProfileFollowedService
