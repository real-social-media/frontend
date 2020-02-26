import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import path from 'ramda/src/path'

const ProfileService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authUser = useSelector(state => state.auth.user)
  const usersGetProfileSelf = useSelector(state => state.users.usersGetProfileSelf)
  const userId = authUser.userId

  const profileRef = useRef(null)
  useScrollToTop(profileRef)

  const usersGetProfileCached = usersServices.cachedUsersGetProfileSelf(
    usersGetProfileSelf,
    authUser
  )

  navigation.setOptions({
    title: path(['data', 'username'])(usersGetProfileCached),
  })

  const usersGetProfileSelfRequest = ({ userId }) => 
    dispatch(usersActions.usersGetProfileSelfRequest({ userId }))

  useEffect(() => {
    usersGetProfileSelfRequest({ userId })
  }, [userId])

  return children({
    authUser,
    profileRef,
    usersGetProfile: usersServices.cachedUsersGetProfileSelf(usersGetProfileSelf, authUser),
    usersGetProfileSelfRequest,
  })
}

export default ProfileService
