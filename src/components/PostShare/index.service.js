import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute } from '@react-navigation/native'
import useToggle from 'react-use/lib/useToggle'
import path from 'ramda/src/path'

const ShareService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postId = path(['postId'])(route.params.post)
  const authUser = useSelector(state => state.auth.user)
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)
  const postsShare = useSelector(state => state.posts.postsShare)

  const [watermark, handleWatermark] = useToggle(true)
  
  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId }))

  const postsShareRequest = (payload) =>
    dispatch(postsActions.postsShareRequest(payload))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId }))
  }, [postId])

  useEffect(() => {
    if (postsShare.status === 'success') {
      dispatch(postsActions.postsShareIdle())
      navigation.goBack()
    }
  }, [postsShare.status])

  return children({
    authUser,
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, route.params.post),
    postsSingleGetRequest,
    postsShare,
    postsShareRequest,
    watermark,
    handleWatermark,
  })
}

export default ShareService
