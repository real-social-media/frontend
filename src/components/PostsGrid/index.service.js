import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as postsServices from 'store/ducks/posts/services'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import path from 'ramda/src/path'

const PostsGridService = ({ children, postsGetRequestOnMount }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const postsGet = useSelector(state => state.posts.postsGet)
  const postsGetCache = useSelector(state => state.posts.postsGetCache)
  const themeFetch = useSelector(state => state.theme.themeFetch)
  const themes = useSelector(state => state.theme.themeFetch.data)
  const user = path(['params', 'user'])(route) || useSelector(state => state.auth.user)
  const userId = user.userId

  const postsGetRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetRequest({ userId, nextToken }))

  const postsGetMoreRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetMoreRequest({ userId, nextToken }))

  useFocusEffect(
    useCallback(() => {
      if (postsGetRequestOnMount) {
        dispatch(postsActions.postsGetRequest({ userId }))
      }

      return () => {
        dispatch(postsActions.postsGetIdle({ payload: { userId } }))
      }
    }, [userId])
  )

  return children({
    themes,
    themeFetch,
    user: route.params,
    postsGet: postsServices.cachedPostsGet(postsGet, postsGetCache, userId),
    postsGetRequest,
    postsGetMoreRequest,
  })
}

export default PostsGridService
