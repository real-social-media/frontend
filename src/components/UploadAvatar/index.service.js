import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersActions from 'store/ducks/users/actions'
import useProfilePhotoService from 'services/providers/ProfilePhoto'
import * as helpers from 'components/UploadAvatar/helpers'
import * as navigationActions from 'navigation/actions'

const UploadAvatarService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const user = useSelector(authSelector.authUserSelector)
  const isAvatarEmpty = helpers.isAvatarEmpty(user)

  const { handleLibrarySnap, handleCameraSnap } = useProfilePhotoService()
  const usersDeleteAvatarRequest = () => dispatch(usersActions.usersDeleteAvatarRequest())
  const navigateProfilePhotoGrid = () => navigationActions.navigateProfilePhotoGrid(navigation)

  return children({
    handleLibrarySnap,
    handleCameraSnap,
    usersDeleteAvatarRequest,
    navigateProfilePhotoGrid,
    isAvatarEmpty,
  })
}

export default UploadAvatarService