import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as navigationActions from 'navigation/actions'
import useUpload, { useUploadState } from 'services/providers/Upload'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import path from 'ramda/src/path'

const ProfilePhotoUploadComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const postsCreateQueue = useSelector((state) => state.posts.postsCreateQueue)
  const usersEditProfile = useSelector((state) => state.users.usersEditProfile)

  const handleProfilePhotoChangeSuccess = () => {
    navigationActions.navigateProfileSelf(navigation)()
  }
  const handleProfilePhotoChangeFailure = () => {
    navigationActions.navigateSettings(navigation)()
    navigationActions.navigateVerification(navigation, { actionType: 'BACK' })()
  }
  const handleUploadSuccess = (postsCreate) => {
    dispatch(usersActions.usersEditProfileRequest({ photoPostId: postsCreate.payload.postId }))
  }
  const handleUploadFailure = () => {
    navigationActions.navigateSettings(navigation)()
    navigationActions.navigateVerification(navigation, { actionType: 'BACK' })()
  }

  /**
   *
   */
  const { handleProfilePhotoUpload } = useUpload({})
  const { activeUpload } = useUploadState({
    handleUploadSuccess,
    handleUploadFailure,
    handleProfilePhotoChangeSuccess,
    handleProfilePhotoChangeFailure,
    handleActivePhotoSelected: handleProfilePhotoUpload,
  })

  const formErrorMessage = usersEditProfile.error.text

  const handleErrorClose = () => {
    if (path(['payload', 'postId'])(activeUpload)) {
      dispatch(postsActions.postsCreateIdle(activeUpload))
    }
    dispatch(usersActions.usersEditProfileIdle({}))
    navigationActions.navigateSettings(navigation)()
  }

  return children({
    formErrorMessage,
    activeUpload,
    postsCreateQueue,
    handleErrorClose,
  })
}

export default ProfilePhotoUploadComponentService
