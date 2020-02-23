import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute } from '@react-navigation/native'

const PostsGridService = ({ children, }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postsGet = useSelector(state => state.posts.postsGet)
  const postsGetCache = useSelector(state => state.posts.postsGetCache)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const userId = route.params.user.userId || useSelector(state => state.auth.user.userId)

  const postsGetRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetRequest({ userId, nextToken }))

  const postsGetMoreRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetMoreRequest({ userId, nextToken }))

  useEffect(() => {
    dispatch(postsActions.postsGetRequest({ userId }))
  }, [userId])

  return children({
    themeFetch,
    postsGet: postsServices.cachedPostsGet(postsGet, postsGetCache, userId),
    postsGetRequest,
    postsGetMoreRequest,
  })
}

export default PostsGridService
