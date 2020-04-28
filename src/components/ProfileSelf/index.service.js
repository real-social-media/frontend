import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as usersServices from 'store/ducks/users/services'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as authSelector from 'store/ducks/auth/selectors'

const ProfileService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersGetProfileSelf = useSelector(state => state.users.usersGetProfileSelf)
  const userId = user.userId

  const profileRef = useRef(null)
  useScrollToTop(profileRef)

  const usersGetProfileCached = usersServices.cachedUsersGetProfileSelf(
    usersGetProfileSelf,
    user
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
    user,
    profileRef,
    usersGetProfile: usersServices.cachedUsersGetProfileSelf(usersGetProfileSelf, user),
    usersGetProfileSelfRequest,
  })
}

export default ProfileService
