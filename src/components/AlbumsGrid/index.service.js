import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import path from 'ramda/src/path'

const AlbumsGridService = ({ children, albumsGetRequestOnMount }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const albumsGet = useSelector(state => state.albums.albumsGet)
  const albumsGetCache = useSelector(state => state.albums.albumsGetCache)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themes = useSelector(state => state.theme.themeFetch.data)
  const user = path(['params', 'user'])(route) || useSelector(state => state.auth.user)
  const userId = user.userId

  const albumsGetRequest = ({ nextToken }) =>
    dispatch(albumsActions.albumsGetRequest({ userId, nextToken }))

  const albumsGetMoreRequest = ({ nextToken }) =>
    dispatch(albumsActions.albumsGetMoreRequest({ userId, nextToken }))

  useFocusEffect(
    useCallback(() => {
      if (albumsGetRequestOnMount) {
        dispatch(albumsActions.albumsGetRequest({ userId }))
      }

      return () => {
        dispatch(albumsActions.albumsGetIdle({ payload: { userId } }))
      }
    }, [userId])
  )

  return children({
    themes,
    themeFetch,
    user: route.params,
    albumsGet: postsServices.cachedPostsGet(albumsGet, albumsGetCache, userId),
    albumsGetRequest,
    albumsGetMoreRequest,
  })
}

export default AlbumsGridService
