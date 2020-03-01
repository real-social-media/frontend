import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation } from '@react-navigation/native'

const AlbumService = ({ children, }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.auth.user)
  const albumsGet = useSelector(state => state.albums.albumsGet)
  const albumsGetCache = useSelector(state => state.albums.albumsGetCache)

  const albumsGetRequest = () =>
    dispatch(albumsActions.albumsGetRequest({ userId: authUser.userId }))

  useEffect(() => {
    dispatch(albumsActions.albumsGetRequest({ userId: authUser.userId }))
  }, [])

  return children({
    authUser,
    albumsGet: postsServices.cachedPostsGet(albumsGet, albumsGetCache, authUser.userId),
    albumsGetRequest,
  })
}

export default AlbumService
