import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as albumsActions from 'store/ducks/albums/actions'
import * as navigationActions from 'navigation/actions'
import * as authSelector from 'store/ducks/auth/selectors'

const AlbumService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themes = useSelector(state => state.theme.themeFetch.data)
  const albumsDelete = useSelector(state => state.albums.albumsDelete)

  const albumsDeleteRequest = (payload) =>
    dispatch(albumsActions.albumsDeleteRequest(payload))

  useEffect(() => {
    if (albumsDelete.status === 'success') {
      dispatch(albumsActions.albumsDeleteIdle())
      dispatch(albumsActions.albumsGetRequest({ userId: user.userId }))
      navigationActions.navigateBack(navigation)()
    }
  }, [albumsDelete.status])

  return children({
    user,
    themeFetch,
    themes,
    albumsDeleteRequest,
  })
}

export default AlbumService
