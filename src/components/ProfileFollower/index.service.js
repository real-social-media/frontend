import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersSelector from 'store/ducks/users/selectors'
import { useRoute } from '@react-navigation/native'

const ProfileFollowerService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()
  const userId = route.params.userId
  const usersGetFollowerUsers = useSelector(usersSelector.usersGetFollowerUsersSelector(userId))
  const usersFollow = useSelector((state) => state.users.usersFollow)
  const usersUnfollow = useSelector((state) => state.users.usersUnfollow)
  const usersAcceptFollowerUser = useSelector((state) => state.users.usersAcceptFollowerUser)

  const usersGetFollowerUsersRequest = () => dispatch(usersActions.usersGetFollowerUsersRequest({ userId }))

  const usersFollowRequest = ({ userId }) => dispatch(usersActions.usersFollowRequest({ userId }))

  const usersUnfollowRequest = ({ userId }) => dispatch(usersActions.usersUnfollowRequest({ userId }))

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
    usersGetFollowerUsers,
    usersGetFollowerUsersRequest,
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
    usersAcceptFollowerUser,
    usersAcceptFollowerUserRequest,
  })
}

export default ProfileFollowerService
