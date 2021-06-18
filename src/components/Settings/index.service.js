import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as snackbarsSelector from 'store/ducks/snackbars/selectors'
import * as authActions from 'store/ducks/auth/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as snackbarsActions from 'store/ducks/snackbars/actions'
import UploadAvatar from 'components/UploadAvatar'
import { useOTAVersion } from 'services/OTA'

const SettingsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { appVersion } = useOTAVersion()

  const usersDelete = useSelector((state) => state.users.usersDelete)
  const debugMode = useSelector(snackbarsSelector.debugMode)
  const user = useSelector(authSelector.authUser)

  const authSignoutRequest = () => dispatch(authActions.authSignoutRequest())
  const authForgotRequest = () => dispatch(authActions.authForgotRequest({ username: user.email }))
  const usersDeleteRequest = () => dispatch(usersActions.usersDeleteRequest())
  const toggleDebugMode = () => dispatch(snackbarsActions.toggleDebugMode())

  return (
    <UploadAvatar backRoute="ProfileSelf">
      {({ openUploadAvatarMenu }) =>
        children({
          authSignoutRequest,
          navigation,
          user,
          openUploadAvatarMenu,
          authForgotRequest,
          appVersion,
          usersDelete,
          usersDeleteRequest,
          debugMode,
          toggleDebugMode,
        })
      }
    </UploadAvatar>
  )
}

SettingsService.propTypes = {
  children: PropTypes.any.isRequired,
}

export default SettingsService
