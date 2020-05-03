import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import * as authSelector from 'store/ducks/auth/selectors'

const VerificationService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postId = path(['params', 'post', 'postId'])(route)
  const postUserId = path(['params', 'post', 'postedBy', 'userId'])(route)
  const user = useSelector(authSelector.authUserSelector)
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)
  const postsEdit = useSelector(state => state.posts.postsEdit)

  const postsSingleGetCached = postsServices.cachedPostsSingleGet(postsSingleGet, path(['params', 'post'])(route))

  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))

  const postsEditRequest = () =>
    dispatch(postsActions.postsEditRequest({ ...postsSingleGetCached.data, postId, userId: postUserId, verificationHidden: true }))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId, userId: postUserId }))
  }, [postId])

  useEffect(() => {
    if (postsEdit.status === 'success') {
      dispatch(postsActions.postsEditIdle())
      navigationActions.navigateBack(navigation)()
    }
  }, [postsEdit.status])

  return children({
    user,
    postsSingleGet: postsSingleGetCached,
    postsSingleGetRequest,
    postsEditRequest,
  })
}

export default VerificationService
