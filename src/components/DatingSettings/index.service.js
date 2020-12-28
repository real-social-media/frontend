import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import { useNavigation } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'
import * as navigationActions from 'navigation/actions'
import UploadAvatar from 'components/UploadAvatar'
import propEq from 'ramda/src/propEq'

const getDisableDatingByStatus = propEq('datingStatus', 'DISABLED')

// eslint-disable-next-line react/prop-types
const DatingSettingsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersSetUserDatingStatus = useSelector(usersSelector.usersSetUserDatingStatus)
  const [disableDating, setDisableDating] = useState(getDisableDatingByStatus(user))

  useEffect(() => {
    if (usersSetUserDatingStatus.status === 'failure') {
      setDisableDating(getDisableDatingByStatus(user))
    }
  }, [usersSetUserDatingStatus.status])

  useEffect(() => {
    dispatch(usersActions.usersSetUserDatingStatusIdle())
  }, [])

  const toggleDatingStatusRequest = () => {
    const status = disableDating ? 'ENABLED' : 'DISABLED'
    dispatch(usersActions.usersSetUserDatingStatusRequest({ status }))
    setDisableDating(!disableDating)
  }

  const navigateDatingMatch = navigationActions.navigateDatingMatch(navigation)
  const navigateDatingAbout = navigationActions.navigateDatingAbout(navigation)
  const navigateDatingProfile = navigationActions.navigateDatingProfile(navigation)
  const navigateMembership = () => navigationActions.navigateMembership(navigation)

  return (
    <UploadAvatar backRoute="DatingSettings">
      {({ openUploadAvatarMenu }) =>
        children({
          user,
          disableDating,
          toggleDatingStatusRequest,
          navigateDatingMatch,
          navigateDatingAbout,
          navigateMembership,
          openUploadAvatarMenu,
          navigateDatingProfile,
        })
      }
    </UploadAvatar>
  )
}

export default DatingSettingsService
