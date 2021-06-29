import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersSelector from 'store/ducks/users/selectors'

const UsersListService = ({ children }) => {
  const dispatch = useDispatch()
  const usersFollow = useSelector(usersSelector.usersFollow)
  const usersUnfollow = useSelector(usersSelector.usersUnfollow)
  const usersAcceptFollowerUser = useSelector(usersSelector.usersAcceptFollowerUser)
  const usersDeclineFollowerUser = useSelector(usersSelector.usersDeclineFollowerUser)

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))

  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))

  const usersAcceptFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersAcceptFollowerUserRequest({ userId }))

  const usersDeclineFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersDeclineFollowerUserRequest({ userId }))

  return children({
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
    usersAcceptFollowerUser,
    usersAcceptFollowerUserRequest,
    usersDeclineFollowerUser,
    usersDeclineFollowerUserRequest,
  })
}

export default UsersListService
