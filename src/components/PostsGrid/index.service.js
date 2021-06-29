import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import { useRoute } from '@react-navigation/native'
import * as authSelector from 'store/ducks/auth/selectors'
import * as postsSelector from 'store/ducks/posts/selectors'
import pathOr from 'ramda/src/pathOr'

const PostsGridService = ({ children }) => {
  const dispatch = useDispatch()
  const route = useRoute()
  const authUserId = useSelector(authSelector.authUserId)
  const userId = pathOr(authUserId, ['params', 'userId'], route)
  const postsGet = useSelector(postsSelector.postsGetSelector(userId))

  const postsGetRequest = ({ userId, nextToken }) => {
    dispatch(postsActions.postsGetRequest({ userId, nextToken }))
  }

  const postsGetMoreRequest = ({ nextToken }) =>
    dispatch(postsActions.postsGetMoreRequest({ userId, nextToken }))

  useEffect(() => {
    if(!userId) return

    dispatch(postsActions.postsGetRequest({ userId }))
  }, [userId])

  return children({
    postsGet,
    postsGetRequest,
    postsGetMoreRequest,
  })
}

export default PostsGridService
