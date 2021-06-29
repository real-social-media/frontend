import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import { useRoute } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as albumsSelector from 'store/ducks/albums/selectors'
import pathOr from 'ramda/src/pathOr'
import { useEffectWhenFocused } from 'services/hooks'

const AlbumsGridService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()
  const authUserId = useSelector(authSelector.authUserId)
  const userId = pathOr(authUserId, ['params', 'userId'], route)
  const albumsGet = useSelector(albumsSelector.albumsGetSelector(userId))

  const albumsGetRequest = ({ nextToken }) =>
    dispatch(albumsActions.albumsGetRequest({ userId, nextToken }))

  const albumsGetMoreRequest = ({ nextToken }) =>
    dispatch(albumsActions.albumsGetMoreRequest({ userId, nextToken }))

  useEffectWhenFocused(() => {
    if(!userId) return

    dispatch(albumsActions.albumsGetRequest({ userId }))
  }, [userId])

  return children({
    albumsGet,
    albumsGetRequest,
    albumsGetMoreRequest,
  })
}

export default AlbumsGridService
