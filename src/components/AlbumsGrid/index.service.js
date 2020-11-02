import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import { useRoute } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as albumsSelector from 'store/ducks/albums/selectors'

const AlbumsGridService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()

  const { userId } = route.params || useSelector(authSelector.authUserSelector)
  const albumsGet = useSelector(albumsSelector.albumsGetSelector(userId))

  const albumsGetRequest = ({ nextToken }) =>
    dispatch(albumsActions.albumsGetRequest({ userId, nextToken }))

  const albumsGetMoreRequest = ({ nextToken }) =>
    dispatch(albumsActions.albumsGetMoreRequest({ userId, nextToken }))

  useEffect(() => {
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
