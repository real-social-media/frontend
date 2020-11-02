import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import useUpload from 'services/providers/Upload'

const UploadingService = ({ children }) => {
  const dispatch = useDispatch()
  const postsCreateQueue = useSelector((state) => state.posts.postsCreateQueue)

  const { handlePostUpload } = useUpload({
    handlePostUploadStarted: () => {},
  })

  const postsCreateRequest = handlePostUpload
  const postsCreateIdle = (payload) => dispatch(postsActions.postsCreateIdle(payload))

  return children({
    postsCreateQueue,
    postsCreateRequest,
    postsCreateIdle,
  })
}

export default UploadingService
