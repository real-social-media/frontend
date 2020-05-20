import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsActions from 'store/ducks/posts/actions'
import * as cameraActions from 'store/ducks/camera/actions'
import * as albumsActions from 'store/ducks/albums/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute} from '@react-navigation/native'
import dayjs from 'dayjs'
import * as navigationActions from 'navigation/actions'
import path from 'ramda/src/path'

const PostCreateService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const user = useSelector(authSelector.authUserSelector)
  const postsCreate = useSelector(state => state.posts.postsCreate)
  const cameraCapture = useSelector(state => state.camera.cameraCapture)
  const albumsGet = useSelector(state => state.albums.albumsGet)
  const albumsGetCache = useSelector(state => state.albums.albumsGetCache)
  const type = route.params.type

  const cameraCaptureLength = path(['data', 'length'])(cameraCapture)

  useEffect(() => {
    dispatch(albumsActions.albumsGetRequest({ userId: user.userId }))
  }, [])

  const postsCreateRequest = ({
    albumId = null,
    postType = 'IMAGE',
    text = '',
    images = [],
    lifetime = '',
    commentsDisabled = false,
    likesDisabled = true,
    sharingDisabled = false,
    verificationHidden = false,
    takenInReal = false,
    originalFormat = 'jpg',
    originalMetadata = '',
  }) => {
    const postId = uuid()
    const mediaId = uuid()

    dispatch(postsActions.postsCreateRequest({
      postId,
      postType,
      albumId,
      lifetime,
      mediaId,
      text,
      images,
      commentsDisabled,
      likesDisabled,
      sharingDisabled,
      verificationHidden,
      takenInReal,
      originalFormat,
      originalMetadata,
      createdAt: dayjs().toJSON(),
      attempt: 0,
    }))

    /**
     * 
     */
    if (postType === 'TEXT_ONLY') {
      navigationActions.navigateHome(navigation)()
    }

    /**
     * 
     */
    if (postType === 'IMAGE' && cameraCaptureLength === 1) {
      navigationActions.navigateHome(navigation)()
    }

    if (postType === 'IMAGE') {
      dispatch(cameraActions.cameraCaptureIdle({ payload: { uri: images[0] } }))
    }
  }

  return children({
    type,
    albumsGet: postsServices.cachedPostsGet(albumsGet, albumsGetCache, user.userId),
    user,
    postsCreate,
    postsCreateRequest,
    cameraCapture: path(['data', 0])(cameraCapture),
    cameraCaptureLength,
  })
}

export default PostCreateService
