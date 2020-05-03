import { useEffect, useRef, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as authSelector from 'store/ducks/auth/selectors'

const ProfileService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const user = useSelector(authSelector.authUserSelector)
  const usersGetProfile = useSelector(state => state.users.usersGetProfile)
  const usersGetProfileCache = useSelector(state => state.users.usersGetProfileCache)
  const usersBlock = useSelector(state => state.users.usersBlock)
  const usersUnblock = useSelector(state => state.users.usersUnblock)
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const userId = path(['params', 'user', 'userId'])(route)

  const profileRef = useRef(null)

  const usersGetProfileCached = usersServices.cachedUsersGetProfile(
    usersGetProfile,
    usersGetProfileCache,
    path(['params', 'user'])(route)
  )

  navigation.setOptions({
    title: path(['data', 'username'])(usersGetProfileCached),
  })

  const usersGetProfileRequest = ({ userId }) => 
    dispatch(usersActions.usersGetProfileRequest({ userId }))

  const usersGetProfileIdle = (payload) => 
    dispatch(usersActions.usersGetProfileIdle(payload))

  const usersUnblockRequest = ({ userId }) =>
    dispatch(usersActions.usersUnblockRequest({ userId }))

  const usersBlockRequest = ({ userId }) =>
    dispatch(usersActions.usersBlockRequest({ userId }))

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))
  
  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))

  useEffect(() => {
    if (usersBlock.status === 'success') {
      dispatch(usersActions.usersBlockIdle())
    }

    if (usersUnblock.status === 'success') {
      dispatch(usersActions.usersUnblockIdle())
    }
  }, [
    usersBlock.status,
    usersUnblock.status,
  ])

  useFocusEffect(
    useCallback(() => {
      usersGetProfileRequest({ userId })

      return () => {
        usersGetProfileIdle({ payload: { userId } })
      }
    }, [userId])
  )

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      usersGetProfileRequest({ userId })
    })
  }, [userId])

  return children({
    profileRef,
    user,
    usersGetProfile: usersGetProfileCached,
    usersGetProfileRequest,
    usersUnblock,
    usersUnblockRequest,
    usersBlock,
    usersBlockRequest,
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
  })
}

export default ProfileService
