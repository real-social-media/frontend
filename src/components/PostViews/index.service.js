import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as postsSelector from 'store/ducks/posts/selectors'
import { useRoute } from '@react-navigation/native'

const PostViewsService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()
  const postId = route.params.postId
  const userId = route.params.userId
  const postsViewsGet = useSelector(postsSelector.postsViewsGetSelector(postId))
  const postsSingleGet = useSelector(postsSelector.postsSingleGetSelector(postId))
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))
  
  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))
  
  const usersAcceptFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersAcceptFollowerUserRequest({ userId }))

  const postsViewsGetRequest = (payload) => 
    dispatch(postsActions.postsViewsGetRequest(payload))
  
  const postsViewsGetMoreRequest = (payload) => 
    dispatch(postsActions.postsViewsGetMoreRequest(payload))

  useEffect(() => {
    if(!postId || !userId) return
    
    dispatch(postsActions.postsSingleGetRequest({ postId, userId }))
  }, [postId])

  useEffect(() => {
    if (usersFollow.status === 'success') {
      postsViewsGetRequest({ postId })
    }
    if (usersUnfollow.status === 'success') {
      postsViewsGetRequest({ postId })
    }
  }, [usersFollow.status, usersUnfollow.status])

  useEffect(() => {
    postsViewsGetRequest({ postId })
  }, [])

  return children({
    postsViewsGet,
    postsViewsGetRequest,
    postsViewsGetMoreRequest,
    usersFollow,
    usersUnfollow,
    usersAcceptFollowerUser,
    usersFollowRequest,
    usersUnfollowRequest,
    usersAcceptFollowerUserRequest,
    postsSingleGet,
  })
}

export default PostViewsService
