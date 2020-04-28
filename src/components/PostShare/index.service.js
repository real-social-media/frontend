import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute } from '@react-navigation/native'
import useToggle from 'react-use/lib/useToggle'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import * as authSelector from 'store/ducks/auth/selectors'

const ShareService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postId = path(['postId'])(route.params.post)
  const postUserId = path(['params', 'post', 'postedBy', 'userId'])(route)
  const user = useSelector(authSelector.authUserSelector)
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)
  const postsShare = useSelector(state => state.posts.postsShare)
  const cameraCapture = useSelector(state => state.camera.cameraCapture)

  const [watermark, handleWatermark] = useToggle(true)
  
  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))

  const postsShareRequest = (payload) =>
    dispatch(postsActions.postsShareRequest(payload))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
  }, [postId])

  useEffect(() => {
    if (postsShare.status === 'success' && cameraCapture.status === 'success') {
      navigationActions.navigatePostCreate(navigation, { type: 'IMAGE', photos: [] })()
    }

    if (postsShare.status === 'success') {
      dispatch(postsActions.postsShareIdle())
      navigationActions.navigateBack(navigation)()
    }
  }, [
    postsShare.status,
    cameraCapture.status,
  ])

  return children({
    user,
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, route.params.post),
    postsSingleGetRequest,
    postsShare,
    postsShareRequest,
    watermark,
    handleWatermark,
  })
}

export default ShareService
