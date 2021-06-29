import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersSelector from 'store/ducks/users/selectors'
import { useRoute } from '@react-navigation/native'
import { useEffectWhenFocused } from 'services/hooks'

const ProfileFollowerService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()
  const userId = route.params.userId
  const usersGetFollowerUsers = useSelector(usersSelector.usersGetFollowerUsersSelector(userId))
  const usersFollow = useSelector(usersSelector.usersFollow)
  const usersUnfollow = useSelector(usersSelector.usersUnfollow)

  const usersGetFollowerUsersRequest = () =>
    dispatch(usersActions.usersGetFollowerUsersRequest({ userId }))

  useEffectWhenFocused(() => {
    if (usersFollow.status === 'success') {
      usersGetFollowerUsersRequest({ userId })
    }
    if (usersUnfollow.status === 'success') {
      usersGetFollowerUsersRequest({ userId })
    }
  }, [usersFollow.status, usersUnfollow.status])

  useEffectWhenFocused(() => {
    if(!userId) return

    usersGetFollowerUsersRequest()
  }, [userId])

  return children({
    usersGetFollowerUsers,
    usersGetFollowerUsersRequest,
  })
}

export default ProfileFollowerService
