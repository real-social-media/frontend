import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import { useNavigation } from '@react-navigation/native'

const PostsService = ({ children, }) => {
  const dispatch = useDispatch()
  const postsGetArchived = useSelector(state => state.posts.postsGetArchived)

  const postsGetArchivedRequest = () =>
    dispatch(postsActions.postsGetArchivedRequest())

  useEffect(() => {
    postsGetArchivedRequest()
  }, [])

  return children({
    postsGetArchived,
    postsGetArchivedRequest,
  })
}

export default PostsService
