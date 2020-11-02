import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as albumsActions from 'store/ducks/albums/actions'
import * as navigationActions from 'navigation/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as albumsSelector from 'store/ducks/albums/selectors'

const AlbumService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const albumId = route.params.album.albumId
  const user = useSelector(authSelector.authUserSelector)
  const albumsDelete = useSelector(state => state.albums.albumsDelete)
  const albumsSingleGet = useSelector(albumsSelector.albumsSingleGetSelector(albumId))
  const albumsPostsGet = useSelector(albumsSelector.albumsPostsGetSelector(albumId))

  const albumsPostsGetRequest = (payload) =>
    dispatch(albumsActions.albumsPostsGetRequest(payload))

  const albumsPostsGetMoreRequest = (payload) =>
    dispatch(albumsActions.albumsPostsGetMoreRequest(payload))

  const albumsDeleteRequest = (payload) =>
    dispatch(albumsActions.albumsDeleteRequest(payload))

  useEffect(() => {
    dispatch(albumsActions.albumsPostsGetRequest({ albumId }))
  }, [])

  useEffect(() => {
    if (albumsDelete.status === 'success') {
      dispatch(albumsActions.albumsDeleteIdle({}))
      dispatch(albumsActions.albumsGetRequest({ userId: user.userId }))
      navigationActions.navigateBack(navigation)
    }
  }, [albumsDelete.status])

  return children({
    user,
    albumsSingleGet,
    albumsPostsGet,
    albumsPostsGetRequest,
    albumsPostsGetMoreRequest,
    albumsDeleteRequest,
  })
}

export default AlbumService
