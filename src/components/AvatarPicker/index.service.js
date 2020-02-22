import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import { useNavigation, useRoute } from '@react-navigation/native'
import uuid from 'uuid/v4'
import { PERMISSIONS, request } from 'react-native-permissions'
import path from 'ramda/src/path'

const AvatarPickerService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const user = useSelector(authSelector.authUserSelector)
  const postsCreate = useSelector(state => state.posts.postsCreate)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)

  /**
   * picking first photo from array, used to be base64
   */
  const [avatar] = path(['params', 'photos'])(route) || []

  const checkCameraPermissions = async () => {
    await request(PERMISSIONS.IOS.CAMERA)
  }

  useEffect(() => {
    checkCameraPermissions()
  }, [])

  const usersEditProfileRequest = (media) =>
    dispatch(usersActions.usersEditProfileRequest({ photoMediaId: media.mediaId }))

  useEffect(() => {
    if (postsCreate.status === 'success') {
      usersEditProfileRequest(postsCreate.payload)
    }
  }, [postsCreate.status])

  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle({ }))
      navigation.navigate('Main')
    }
  }, [usersEditProfile.status])

  const postsCreateRequest = ({ images, takenInReal, originalFormat }) => {
    const postId = uuid()
    const mediaId = uuid()

    dispatch(postsActions.postsCreateRequest({
      postId,
      albumId: null,
      lifetime: 'P1D',
      mediaId,
      text: '',
      images: [avatar],
      commentsDisabled: true,
      likesDisabled: true,
      sharingDisabled: true,
      takenInReal,
      originalFormat,
    }))
  }

  const handleCameraPress = async () => {
    navigation.navigate('Camera', { nextRoute: 'AvatarPicker' })
  }

  return children({
    user,
    avatar,
    postsCreate,
    postsCreateRequest,
    handleCameraPress,
  })
}

export default AvatarPickerService
