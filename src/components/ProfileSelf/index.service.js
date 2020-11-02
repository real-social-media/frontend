import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'

const ProfileSelfService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersGetProfile = useSelector(usersSelector.usersGetProfileSelfSelector())
  const userId = user.userId

  const profileRef = useRef(null)
  useScrollToTop(profileRef)

  useEffect(() => {
    navigation.setOptions({
      title: path(['data', 'username'])(usersGetProfile),
    })
  }, [])

  const usersGetProfileSelfRequest = ({ userId }) => 
    dispatch(usersActions.usersGetProfileSelfRequest({ userId }))

  useEffect(() => {
    if(!userId) return

    usersGetProfileSelfRequest({ userId })
  }, [userId])

  return children({
    user,
    profileRef,
    usersGetProfile,
    usersGetProfileSelfRequest,
  })
}

export default ProfileSelfService
