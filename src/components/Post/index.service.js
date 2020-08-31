import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import { useNavigation } from '@react-navigation/native'
import * as navigationActions from 'navigation/actions'
import * as authSelector from 'store/ducks/auth/selectors'

const PostsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const postsDelete = useSelector((state) => state.posts.postsDelete)
  const postsArchive = useSelector((state) => state.posts.postsArchive)
  const postsRestoreArchived = useSelector((state) => state.posts.postsRestoreArchived)
  const postsAnonymouslyLike = useSelector((state) => state.posts.postsAnonymouslyLike)
  const postsOnymouslyLike = useSelector((state) => state.posts.postsOnymouslyLike)
  const postsDislike = useSelector((state) => state.posts.postsDislike)
  const postsFlag = useSelector((state) => state.posts.postsFlag)

  const postsShareRequest = (payload) => dispatch(postsActions.postsShareRequest(payload))

  const postsOnymouslyLikeRequest = (payload) => dispatch(postsActions.postsOnymouslyLikeRequest(payload))

  const postsDislikeRequest = (payload) => dispatch(postsActions.postsDislikeRequest(payload))

  const postsArchiveRequest = (payload) => dispatch(postsActions.postsArchiveRequest(payload))

  const postsRestoreArchivedRequest = (payload) => dispatch(postsActions.postsRestoreArchivedRequest(payload))

  const postsFlagRequest = (payload) => dispatch(postsActions.postsFlagRequest(payload))

  const postsDeleteRequest = (payload) => dispatch(postsActions.postsDeleteRequest(payload))

  const handleEditPress = (post) => navigationActions.navigatePostEdit(navigation, { post })()

  return children({
    user,
    postsShareRequest,
    postsAnonymouslyLike,
    postsOnymouslyLike,
    postsOnymouslyLikeRequest,
    postsDislike,
    postsDislikeRequest,
    handleEditPress,
    postsArchive,
    postsArchiveRequest,
    postsRestoreArchived,
    postsRestoreArchivedRequest,
    postsFlag,
    postsFlagRequest,
    postsDelete,
    postsDeleteRequest,
  })
}

export default PostsService
