import { useEffect } from 'react'
import * as postsActions from 'store/ducks/posts/actions'
import * as usersActions from 'store/ducks/users/actions'
import * as authActions from 'store/ducks/auth/actions'
import * as navigationActions from 'navigation/actions'
import useUpload, { useUploadState } from 'services/providers/Upload'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import path from 'ramda/src/path'
import { pageHeaderLeft } from 'navigation/options'

const AuthPhotoUploadComponentService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const postsCreateQueue = useSelector(state => state.posts.postsCreateQueue)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  
  const handleProfilePhotoChangeSuccess = () => {
    dispatch(authActions.authCheckIdle({ nextRoute: 'Root' }))
  }
  const handleProfilePhotoChangeFailure = () => {
    dispatch(usersActions.usersEditProfileIdle({}))
    navigationActions.navigateAuthPhoto(navigation)()
    navigationActions.navigateVerification(navigation, { actionType: 'HIDE' })()
  }
  const handleUploadSuccess = (postsCreate) => {
    dispatch(usersActions.usersEditProfileRequest({ photoPostId: postsCreate.payload.postId }))
  }
  const handleUploadFailure = () => {
    dispatch(usersActions.usersEditProfileIdle({}))
    navigationActions.navigateAuthPhoto(navigation)()
    navigationActions.navigateVerification(navigation, { actionType: 'HIDE' })()
  }

  const { handleProfilePhotoUpload } = useUpload({})
  const { activeUpload } = useUploadState({
    handleUploadSuccess,
    handleUploadFailure,
    handleProfilePhotoChangeSuccess,
    handleProfilePhotoChangeFailure,
    handleActivePhotoSelected: handleProfilePhotoUpload,
  })

  /**
   *
   */
  const formErrorMessage = usersEditProfile.error.text

  const handleErrorClose = () => {
    if (path(['payload', 'postId'])(activeUpload)) {
      dispatch(postsActions.postsCreateIdle(activeUpload))
    }
    dispatch(usersActions.usersEditProfileIdle({}))
    navigationActions.navigateAuthPhoto(navigation)()
  }

  /**
   *
   */
  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => pageHeaderLeft({ ...props, onPress: handleErrorClose }),
    })
  }, [])

  return children({
    formErrorMessage,
    activeUpload,
    postsCreateQueue,
    handleErrorClose,
  })
}

export default AuthPhotoUploadComponentService
