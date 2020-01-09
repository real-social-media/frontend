import { useSelector, useDispatch } from 'react-redux'
import uuid from 'uuid/v4'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsActions from 'store/ducks/posts/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import { withNavigation } from 'react-navigation'
import path from 'ramda/src/path'
import dayjs from 'dayjs'

const PostCreateService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const postsCreate = useSelector(state => state.posts.postsCreate)
  const cameraCapture = useSelector(state => state.camera.cameraCapture)

  const postsCreateRequest = ({ text = '', lifetime = '', commentsDisabled = false, likesDisabled = false }) => {
    const postId = uuid()
    const mediaId = uuid()

    dispatch(postsActions.postsCreateRequest({
      postId,
      lifetime,
      mediaId,
      text,
      images: [path(['data', 'uri'])(cameraCapture)],
      commentsDisabled,
      likesDisabled,
      takenInReal: path(['data', 'takenInReal'])(cameraCapture),
      originalFormat: path(['data', 'originalFormat'])(cameraCapture),
      createdAt: dayjs().toJSON(),
      attempt: 0,
    }))
    dispatch(cameraActions.cameraCaptureIdle())
    navigation.navigate('Feed')
  }

  const handleClosePress = () => {
    navigation.navigate('Feed')
  }

  return children({
    user,
    postsCreate,
    postsCreateRequest,
    handleClosePress,
    cameraCapture,
  })
}

export default withNavigation(PostCreateService)
