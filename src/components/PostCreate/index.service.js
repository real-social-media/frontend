import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsSelector from 'store/ducks/posts/selectors'
import * as albumsSelector from 'store/ducks/albums/selectors'
import * as albumsActions from 'store/ducks/albums/actions'
import * as navigationActions from 'navigation/actions'
import { useNavigation, useRoute } from '@react-navigation/native'
import useUpload from 'services/providers/Upload'
import path from 'ramda/src/path'
import { VERIFICATION_TYPE } from 'components/Verification'

const PostCreateService = ({
  children,
}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const user = useSelector(authSelector.authUser)
  const postsCreate = useSelector(postsSelector.postsCreate)
  const cameraCapture = useSelector(state => state.camera.cameraCapture)
  const albumsGet = useSelector(albumsSelector.albumsGetSelector(user.userId))
  const type = route.params.type
  const cameraCaptureLength = path(['data', 'length'])(cameraCapture)

  /**
   * Navigate to home page once upload is complete
   */
  const handlePostUploadStarted = (post) => {
    if (post.postType === 'TEXT_ONLY') {
      navigationActions.navigateHome(navigation)
    }
    if (post.postType === 'IMAGE' && cameraCaptureLength === 1) {
      navigationActions.navigateHome(navigation)
    }
  }

  /**
   *
   */
  const { handlePostUpload } = useUpload()

  useEffect(() => {
    if(!user.userId) return

    dispatch(albumsActions.albumsGetRequest({ userId: user.userId }))
  }, [])

  const postsCreateRequest = (post) => {
    handlePostUpload(post)
    handlePostUploadStarted(post)
  }

  const handleOpenVerification = navigationActions.navigateVerification(navigation, {
    actionType: VERIFICATION_TYPE.BACK,
    showHeader: true,
  })

  return children({
    type,
    albumsGet,
    user,
    postsCreate,
    postsCreateRequest,
    cameraCapture: path(['data', 0])(cameraCapture),
    cameraCaptureLength,
    handleOpenVerification,
  })
}

export default PostCreateService
