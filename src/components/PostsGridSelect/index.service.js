import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsActions from 'store/ducks/posts/actions'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'
import { v4 as uuid } from 'uuid';
import path from 'ramda/src/path'

const PostsGridSelectService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const user = useSelector(authSelector.authUserSelector)
  const usersImagePostsGet = useSelector(state => state.users.usersImagePostsGet)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)

  const [avatar] = path(['params', 'photos'])(route) || []

  const postsAvatarRequest = ({ uri }) => {
    const postId = uuid()
    const mediaId = uuid()

    dispatch(postsActions.postsAvatarRequest({
      postId,
      postType: 'IMAGE',
      albumId: null,
      lifetime: 'P1D',
      mediaId,
      text: '',
      images: [uri],
      commentsDisabled: true,
      likesDisabled: true,
      sharingDisabled: true,
      takenInReal: true,
      originalFormat: 'jpg',
    }))
  }

  useEffect(() => {
    postsAvatarRequest({ uri: avatar.uri })
  }, [avatar.uri])

  const usersImagePostsGetRequest = (payload) =>
    dispatch(usersActions.usersImagePostsGetRequest(payload))

  const usersEditProfileRequest = () =>
    dispatch(usersActions.usersEditProfileRequest({ photoPostId: selectedPost.postId }))

  useEffect(() => {
    usersImagePostsGetRequest({ userId: user.userId })
  }, [])

  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      navigationActions.navigateProfileSelf(navigation)()
      dispatch(usersActions.usersEditProfileIdle())
    }
  }, [usersEditProfile.status])

  const [selectedPost, setSelectedPost] = useState({})
  const handlePostPress = (post) => setSelectedPost(post)

  return children({
    user,
    usersImagePostsGet,
    usersImagePostsGetRequest,
    handlePostPress,
    selectedPost,
    usersEditProfileRequest,
  })
}

export default PostsGridSelectService
