import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'
import * as usersSelector from 'store/ducks/users/selectors'
import HeaderRight from 'navigation/HeaderRight'
import { VERIFICATION_TYPE } from 'components/Verification'
import path from 'ramda/src/path'

const ProfilePhotoGridService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const user = useSelector(authSelector.authUserSelector)
  const usersImagePostsGet = useSelector(usersSelector.usersImagePostsGetSelector())
  const usersChangeAvatar = useSelector(usersSelector.usersChangeAvatar)

  const usersImagePostsGetRequest = () => dispatch(usersActions.usersImagePostsGetRequest({ userId: user.userId, isVerified: true }))

  useEffect(() => {
    usersImagePostsGetRequest()
  }, [])

  useEffect(() => {
    if (usersChangeAvatar.status === 'success') {
      const backRoute = path(['params', 'backRoute'], route)

      if (backRoute) {
        navigation.replace(backRoute)
      } else {
        navigation.goBack()
      }

      dispatch(usersActions.usersChangeAvatarIdle())
    }
  }, [usersChangeAvatar.status])

  const [selectedPost, setSelectedPost] = useState({})
  const handlePostPress = (post) => setSelectedPost(post)

  const changeAvatarRequest = () => 
    dispatch(usersActions.usersChangeAvatarRequest(selectedPost))

  /**
   *
   */
  const headerRight = () => (
    <HeaderRight onPress={changeAvatarRequest} title="Update" hidden={!selectedPost.postId} />
  )

  /**
   *
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight,
    })
  }, [selectedPost.postId])

  const handleOpenVerification = navigationActions.navigateVerification(navigation, {
    actionType: VERIFICATION_TYPE.BACK,
  })

  return children({
    usersImagePostsGetRequest,
    usersImagePostsGet,
    handlePostPress,
    selectedPost,
    handleOpenVerification,
  })
}

export default ProfilePhotoGridService
