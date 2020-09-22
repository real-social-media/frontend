import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'
import * as authActions from 'store/ducks/auth/actions'
import * as usersActions from 'store/ducks/users/actions'
import useProfilePhotoService from 'services/providers/ProfilePhoto'
import path from 'ramda/src/path'

const SettingsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const usersDeleteAvatar = useSelector(usersSelector.usersDeleteAvatar)
  const settingsErrorMessage = path(['error', 'text'])(usersDeleteAvatar)
  const authSignout = useSelector((state) => state.auth.authSignout)
  const user = useSelector(authSelector.authUserSelector)

  const authSignoutRequest = () => dispatch(authActions.authSignoutRequest())
  const usersDeleteAvatarRequest = () => dispatch(usersActions.usersDeleteAvatarRequest())
  const handleErrorClose = () => dispatch(usersActions.usersDeleteAvatarIdle({}))

  const { handleLibrarySnap, handleCameraSnap } = useProfilePhotoService()

  return children({
    user,
    authSignout,
    navigation,
    authSignoutRequest,
    handleCameraSnap,
    handleLibrarySnap,
    usersDeleteAvatarRequest,
    handleErrorClose,
    settingsErrorMessage,
  })
}

export default SettingsService
