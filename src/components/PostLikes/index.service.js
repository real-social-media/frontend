import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as postsSelector from 'store/ducks/posts/selectors'
import { useNavigation, useRoute } from '@react-navigation/native'

const PostsLikesService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postId = route.params.postId
  const postsLikesGet = useSelector(postsSelector.postsLikesGetSelector(postId))
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))
  
  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))
  
  const usersAcceptFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersAcceptFollowerUserRequest({ userId }))

  const postsLikesGetRequest = (payload) => 
    dispatch(postsActions.postsLikesGetRequest(payload))

  useEffect(() => {
    if (usersFollow.status === 'success') {
      postsLikesGetRequest({ postId })
    }
    if (usersUnfollow.status === 'success') {
      postsLikesGetRequest({ postId })
    }
  }, [usersFollow.status, usersUnfollow.status])

  useEffect(() => {
    postsLikesGetRequest({ postId })
  }, [])

  return children({
    postsLikesGet,
    postsLikesGetRequest,
    usersFollow,
    usersUnfollow,
    usersAcceptFollowerUser,
    usersFollowRequest,
    usersUnfollowRequest,
    usersAcceptFollowerUserRequest,
  })
}

export default PostsLikesService
