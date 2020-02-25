import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'

const PostEditService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const authUser = useSelector(state => state.auth.user)
  const postId = path(['params', 'post', 'postId'])(route)
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)
  const postsEdit = useSelector(state => state.posts.postsEdit)
  const albumsGet = useSelector(state => state.albums.albumsGet)
  const albumsGetCache = useSelector(state => state.albums.albumsGetCache)

  useEffect(() => {
    dispatch(albumsActions.albumsGetRequest({ userId: authUser.userId }))
  }, [])

  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId }))

  const postsEditRequest = (payload) =>
    dispatch(postsActions.postsEditRequest(payload))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId }))
  }, [postId])

  useEffect(() => {
    if (postsEdit.status === 'success') {
      dispatch(postsActions.postsEditIdle())
      navigationActions.navigateHome(navigation)()
    }
  }, [postsEdit.status])

  return children({
    albumsGet: postsServices.cachedPostsGet(albumsGet, albumsGetCache, authUser.userId),
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, path(['params', 'post'])(route)),
    postsSingleGetRequest,
    postsEdit,
    postsEditRequest,
  })
}

export default PostEditService
