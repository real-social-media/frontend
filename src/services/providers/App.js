import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as postsActions from 'store/ducks/posts/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as Logger from 'services/Logger'
import { usePushNotification } from 'services/providers/Push'

/**
 * 
 */
export const AppProvider = ({
  children,
}) => {
  const dispatch = useDispatch()
  
  const user = useSelector(authSelector.authUserSelector)
  const postsDelete = useSelector(state => state.posts.postsDelete)
  const postsArchive = useSelector(state => state.posts.postsArchive)
  const postsRestoreArchived = useSelector(state => state.posts.postsRestoreArchived)
  const postsFlag = useSelector(state => state.posts.postsFlag)

  /**
   * Sentry specific logger to map partial user data to error log
   */
  useEffect(() => {
    if (user && user.userId) {
      Logger.setUser({
        id: user.userId,
        username: user.username,
        email: user.email,
      })
    }
  }, [user.userId])

  /**
   * Push notifications event listeners initialization
   * - handles permissions check
   * - handles setting apns token
   * - handles received push notifications
   */
  usePushNotification()

  useEffect(() => {
    if (postsDelete.status === 'success') {
      dispatch(postsActions.postsDeleteIdle({}))
      dispatch(postsActions.postsGetRequest({ userId: user.userId }))
    }

    if (postsArchive.status === 'success') {
      dispatch(postsActions.postsArchiveIdle({}))
      dispatch(postsActions.postsGetRequest({ userId: user.userId }))
    }

    if (postsRestoreArchived.status === 'success') {
      dispatch(postsActions.postsRestoreArchivedIdle({}))
      dispatch(postsActions.postsGetRequest({ userId: user.userId }))
    }

    if (postsFlag.status === 'success') {
      dispatch(postsActions.postsFlagIdle({}))
    }
  }, [
    postsDelete.status,
    postsArchive.status,
    postsRestoreArchived.status,
    postsFlag.status,
  ])

  return children({
    user,
  })
}