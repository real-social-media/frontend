import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'
import { useEffectWhenFocused } from 'services/hooks'

const PrivacyService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUser)
  const usersEditProfile = useSelector(usersSelector.usersEditProfile)

  const togglePrivacyStatus = () =>
    dispatch(usersActions.usersEditProfileRequest({
      privacyStatus: user.privacyStatus === 'PRIVATE' ? 'PUBLIC' : 'PRIVATE',
    }))

  const toggleFollowCountsHidden = () =>
    dispatch(usersActions.usersEditProfileRequest({
      followCountsHidden: !user.followCountsHidden,
    }))

  const toggleLikesDisabled = () =>
    dispatch(usersActions.usersEditProfileRequest({
      likesDisabled: !user.likesDisabled,
    }))

  const toggleCommentsDisabled = () =>
    dispatch(usersActions.usersEditProfileRequest({
      commentsDisabled: !user.commentsDisabled,
    }))

  const toggleSharingDisabled = () =>
    dispatch(usersActions.usersEditProfileRequest({
      sharingDisabled: !user.sharingDisabled,
    }))

  useEffectWhenFocused(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle())
    }
  }, [usersEditProfile.status])

  return children({
    user,
    togglePrivacyStatus,
    toggleFollowCountsHidden,
    toggleLikesDisabled,
    toggleCommentsDisabled,
    toggleSharingDisabled,
  })
}

export default PrivacyService
