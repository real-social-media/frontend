import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import { useNavigation } from '@react-navigation/native'

const PostsGridSelectService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersMediaObjectsGet = useSelector(state => state.users.usersMediaObjectsGet)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)

  const usersMediaObjectsGetRequest = (payload) =>
    dispatch(usersActions.usersMediaObjectsGetRequest(payload))

  const usersEditProfileRequest = () =>
    dispatch(usersActions.usersEditProfileRequest({ photoMediaId: selectedMedia.mediaId }))

  useEffect(() => {
    usersMediaObjectsGetRequest({ userId: user.userId })
  }, [])

  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      navigation.navigate('ProfileSelf')
      dispatch(usersActions.usersEditProfileIdle())
    }
  }, [usersEditProfile.status])

  const [selectedMedia, setSelectedMedia] = useState({})
  const handleMediaPress = (media) => setSelectedMedia(media)

  return children({
    user,
    usersMediaObjectsGet,
    usersMediaObjectsGetRequest,
    handleMediaPress,
    selectedMedia,
    usersEditProfileRequest,
  })
}

export default PostsGridSelectService
