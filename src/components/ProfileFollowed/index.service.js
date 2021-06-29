import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersSelector from 'store/ducks/users/selectors'
import { useRoute } from '@react-navigation/native'
import { useEffectWhenFocused } from 'services/hooks'

const ProfileFollowedService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()
  const userId = route.params.userId
  const usersGetFollowedUsers = useSelector(usersSelector.usersGetFollowedUsersSelector(userId))
  const usersFollow = useSelector(usersSelector.usersFollow)
  const usersUnfollow = useSelector(usersSelector.usersUnfollow)

  const usersGetFollowedUsersRequest = () =>
    dispatch(usersActions.usersGetFollowedUsersRequest({ userId }))

  useEffectWhenFocused(() => {
    if (usersFollow.status !== 'success') return
    if (usersUnfollow.status !== 'success') return

    usersGetFollowedUsersRequest()
  }, [usersFollow.status, usersUnfollow.status])

  useEffectWhenFocused(() => {
    if(!userId) return

    usersGetFollowedUsersRequest()
  }, [userId])

  return children({
    usersGetFollowedUsers,
    usersGetFollowedUsersRequest,
  })
}

export default ProfileFollowedService
