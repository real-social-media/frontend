import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'

const AlbumsGridService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const albumsGet = useSelector(state => state.albums.albumsGet)
  const albumsGetCache = useSelector(state => state.albums.albumsGetCache)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const userId = path(['params', 'user', 'userId'])(route) || useSelector(state => state.auth.user.userId)

  const albumsGetRequest = ({ nextToken }) =>
    dispatch(albumsActions.albumsGetRequest({ userId, nextToken }))

  const albumsGetMoreRequest = ({ nextToken }) =>
    dispatch(albumsActions.albumsGetMoreRequest({ userId, nextToken }))

  useEffect(() => {
    dispatch(albumsActions.albumsGetRequest({ userId }))
  }, [userId])

  return children({
    themeFetch,
    albumsGet: postsServices.cachedPostsGet(albumsGet, albumsGetCache, userId),
    albumsGetRequest,
    albumsGetMoreRequest,
  })
}

export default AlbumsGridService
