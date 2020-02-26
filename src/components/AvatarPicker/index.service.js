import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import { withNavigation } from 'react-navigation'
import uuid from 'uuid/v4'
import { PERMISSIONS, request } from 'react-native-permissions'

const AvatarPickerService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const postsCreate = useSelector(state => state.posts.postsCreate)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)

  /**
   * picking first photo from array, used to be base64
   */
  const [avatar] = navigation.getParam('photos') || []

  const checkCameraPermissions = async () => {
    await request(PERMISSIONS.IOS.CAMERA)
  }

  useEffect(() => {
    checkCameraPermissions()
  }, [])

  const usersEditProfileRequest = (createPostPayload) =>
    dispatch(usersActions.usersEditProfileRequest({ photoPostId: createPostPayload.postId }))

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

export default withNavigation(AvatarPickerService)
