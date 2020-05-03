import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'

const ProfileArchivedService = ({ children }) => {
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

export default ProfileArchivedService
