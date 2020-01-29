import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { withNavigation } from 'react-navigation'
import useToggle from 'react-use/lib/useToggle'
import path from 'ramda/src/path'

const ShareService = ({ children, navigation }) => {
  const dispatch = useDispatch()
  const postId = path(['postId'])(navigation.getParam('post'))
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
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, navigation.getParam('post')),
    postsSingleGetRequest,
    postsShare,
    postsShareRequest,
    watermark,
    handleWatermark,
  })
}

export default withNavigation(ShareService)
