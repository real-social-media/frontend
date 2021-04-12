import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import { useNavigation } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import { useEffectWhenFocused } from 'services/hooks'

const AlbumEditService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUser)
  const albumsEdit = useSelector(state => state.albums.albumsEdit)

  const albumsEditRequest = (payload) =>
    dispatch(albumsActions.albumsEditRequest(payload))

  useEffectWhenFocused(() => {
    if (albumsEdit.status === 'success') {
      dispatch(albumsActions.albumsEditIdle({}))
      dispatch(albumsActions.albumsGetRequest({ userId: user.userId }))
      navigationActions.navigateBack(navigation)
    }
  }, [albumsEdit.status])

  return children({
    user,
    albumsEdit,
    albumsEditRequest,
  })
}

export default AlbumEditService
