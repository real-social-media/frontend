import React, { useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authActions from 'store/ducks/auth/actions'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as authSelector from 'store/ducks/auth/selectors'
import HeaderRight from 'components/ProfileSelf/Header'
import { useEffectWhenFocused } from 'services/hooks'

const ProfileSelfService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUser)
  const authUser = useSelector(authSelector.authUserSelector)
  const username = path(['username'])(authUser)

  const profileRef = useRef(null)
  useScrollToTop(profileRef)

  const headerRight = useCallback(
    () => <HeaderRight navigation={navigation} />,
    [navigation],
  )

  useEffect(() => {
    dispatch(authActions.authGetUserRequest())

    navigation.setOptions({ headerRight })
  }, [])

  useEffectWhenFocused(() => {
    if (username) {
      navigation.setOptions({ title: username })
    }
  }, [username])

  return children({
    user,
    profileRef,
    usersGetProfile: authUser,
  })
}

export default ProfileSelfService
