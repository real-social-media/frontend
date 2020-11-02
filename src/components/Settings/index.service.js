import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'
import * as authActions from 'store/ducks/auth/actions'
import * as usersActions from 'store/ducks/users/actions'

import UploadAvatar from 'components/UploadAvatar'
import path from 'ramda/src/path'

const SettingsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const usersDeleteAvatar = useSelector(usersSelector.usersDeleteAvatar)
  const settingsErrorMessage = path(['error', 'text'])(usersDeleteAvatar)
  const user = useSelector(authSelector.authUserSelector)

  const authSignoutRequest = () => dispatch(authActions.authSignoutRequest())
  const handleErrorClose = () => dispatch(usersActions.usersDeleteAvatarIdle({}))

  return (
    <UploadAvatar>
      {({ openUploadAvatarMenu }) =>
        children({
          authSignoutRequest,
          navigation,
          handleErrorClose,
          settingsErrorMessage,
          user,
          openUploadAvatarMenu,
        })
      }
    </UploadAvatar>
  )
}

SettingsService.propTypes = {
  children: PropTypes.element.isRequired,
}

export default SettingsService
