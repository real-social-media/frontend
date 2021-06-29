import { useContext } from 'react'
import {  useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import { useNavigation, useRoute, useScrollToTop } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as usersSelector from 'store/ducks/users/selectors'
import { AuthContext } from 'services/providers/Auth'
import { useEffectWhenFocused } from 'services/hooks'

const ProfileService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const { user } = useContext(AuthContext)

  const { userId } = route.params

  const usersGetProfile = useSelector(usersSelector.usersGetProfileSelector(userId))
  const usersBlock = useSelector(state => state.users.usersBlock)
  const usersUnblock = useSelector(state => state.users.usersUnblock)
  const usersFollow = useSelector(usersSelector.usersFollow)
  const usersUnfollow = useSelector(usersSelector.usersUnfollow)

  const profileRef = useRef(null)

  useScrollToTop(profileRef)

  useEffectWhenFocused(() => {
    navigation.setOptions({
      title: path(['data', 'username'])(usersGetProfile),
    })
  }, [path(['data', 'username'])(usersGetProfile)])

  const usersGetProfileRequest = ({ userId }) =>
    dispatch(usersActions.usersGetProfileRequest({ userId }))

  const usersUnblockRequest = ({ userId }) =>
    dispatch(usersActions.usersUnblockRequest({ userId }))

  const usersBlockRequest = ({ userId }) =>
    dispatch(usersActions.usersBlockRequest({ userId }))

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))

  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))

  useEffectWhenFocused(() => {
    if (usersBlock.status === 'success') {
      dispatch(usersActions.usersBlockIdle({}))
    }

    if (usersUnblock.status === 'success') {
      dispatch(usersActions.usersUnblockIdle({}))
    }
  }, [
    usersBlock.status,
    usersUnblock.status,
  ])

  useEffectWhenFocused(() => {
    if(!userId) return

    usersGetProfileRequest({ userId })
  }, [userId])

  return children({
    user,
    profileRef,
    usersGetProfile,
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
