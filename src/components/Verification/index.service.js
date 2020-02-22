import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute } from '@react-navigation/native'

const VerificationService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postId = route.params.post.postId
  const authUser = useSelector(state => state.auth.user)
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)

  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId }))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId }))
  }, [postId])

  return children({
    authUser,
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, route.params.post),
    postsSingleGetRequest,
  })
}

export default VerificationService
