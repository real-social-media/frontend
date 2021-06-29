import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'

const UploadingService = ({ children }) => {
  const dispatch = useDispatch()
  const postsCreateQueue = useSelector((state) => state.posts.postsCreateQueue)

  const postsCreateRequest = (payload) => dispatch(postsActions.postsCreateRequest(payload))
  const postsCreateIdle = (payload) => dispatch(postsActions.postsCreateIdle(payload))

  return children({
    postsCreateQueue,
    postsCreateRequest,
    postsCreateIdle,
  })
}

export default UploadingService
