import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'

const StoriesService = ({ children }) => {
  const dispatch = useDispatch()
  const usersGetFollowedUsersWithStories = useSelector(state => state.users.usersGetFollowedUsersWithStories)
  const user = useSelector(authSelector.authUserSelector)

  const usersGetFollowedUsersWithStoriesRequest = () =>
    dispatch(usersActions.usersGetFollowedUsersWithStoriesRequest())

    useEffect(() => {
    dispatch(usersActions.usersGetFollowedUsersWithStoriesRequest())
  }, [])

  return children({
    user,
    usersGetFollowedUsersWithStories,
    usersGetFollowedUsersWithStoriesRequest,
  })
}

export default StoriesService
