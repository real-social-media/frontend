import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import * as postsActions from 'store/ducks/posts/actions'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as albumsSelector from 'store/ducks/albums/selectors'
import * as postsSelector from 'store/ducks/posts/selectors'

const PostEditService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const user = useSelector(authSelector.authUserSelector)
  const postId = path(['params', 'post', 'postId'])(route)
  const postUserId = path(['params', 'post', 'postedBy', 'userId'])(route)
  const postsSingleGet = useSelector(postsSelector.postsSingleGetSelector(postId))
  const postsEdit = useSelector(state => state.posts.postsEdit)
  const albumsGet = useSelector(albumsSelector.albumsGetSelector(user.userId))

  useEffect(() => {
    if(!user.userId) return

    dispatch(albumsActions.albumsGetRequest({ userId: user.userId }))
  }, [])

  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))

  const postsEditRequest = (payload) =>
    dispatch(postsActions.postsEditRequest({ ...payload, userId: postUserId }))

  useEffect(() => {
    if(!postId || !postUserId) return
    
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
  }, [postId])

  useEffect(() => {
    if (postsEdit.status === 'success') {
      dispatch(postsActions.postsEditIdle({}))
      navigationActions.navigateBack(navigation)
    }
  }, [postsEdit.status])

  return children({
    albumsGet,
    postsSingleGet,
    postsSingleGetRequest,
    postsEdit,
    postsEditRequest,
  })
}

export default PostEditService
