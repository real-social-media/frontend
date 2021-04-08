import { useSelector, useDispatch } from 'react-redux'
import * as albumsActions from 'store/ducks/albums/actions'
import { useNavigation } from '@react-navigation/native'
import { v4 as uuid } from 'uuid'
import * as navigationActions from 'navigation/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import { useEffectWhenFocused } from 'services/hooks'

const AlbumCreateService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserIdentity)

  const albumsCreate = useSelector((state) => state.albums.albumsCreate)

  const albumsCreateRequest = (payload) => {
    const albumId = uuid()
    dispatch(
      albumsActions.albumsCreateRequest({
        albumId,
        ...payload,
      }),
    )
  }

  useEffectWhenFocused(() => {
    if (albumsCreate.status === 'success') {
      dispatch(albumsActions.albumsCreateIdle({}))
      dispatch(albumsActions.albumsGetRequest({ userId: user.userId }))
      navigationActions.navigateBack(navigation)
    }
  }, [albumsCreate.status])

  const isSubmitting = albumsCreate.status === 'loading'

  return children({
    albumsCreateRequest,
    isSubmitting,
  })
}

export default AlbumCreateService
