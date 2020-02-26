import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'

const VerificationService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postId = path(['params', 'post', 'postId'])(route)
  const authUser = useSelector(state => state.auth.user)
  const postsSingleGet = useSelector(state => state.posts.postsSingleGet)

  const postsSingleGetRequest = ({ postId }) =>
    dispatch(postsActions.postsSingleGetRequest({ postId }))

  useEffect(() => {
    dispatch(postsActions.postsSingleGetRequest({ postId }))
  }, [postId])

  return children({
    authUser,
    postsSingleGet: postsServices.cachedPostsSingleGet(postsSingleGet, path(['params', 'post'])(route)),
    postsSingleGetRequest,
  })
}

export default VerificationService
