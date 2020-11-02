import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as authSelector from 'store/ducks/auth/selectors'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import * as chatSelector from 'store/ducks/chat/selectors'
import * as usersActions from 'store/ducks/users/actions'
import * as navigationActions from 'navigation/actions'

const ChatOptionsService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()

  const chatId = route.params.chatId

  const user = useSelector(authSelector.authUserSelector)
  const chatGetChat = useSelector(chatSelector.chatGetChatSelector(chatId))
  const usersBlock = useSelector(state => state.users.usersBlock)
  const usersUnblock = useSelector(state => state.users.usersUnblock)

  const usersBlockRequest = ({ userId }) =>
    dispatch(usersActions.usersBlockRequest({ userId }))

  const usersUnblockRequest = ({ userId }) =>
    dispatch(usersActions.usersUnblockRequest({ userId }))

  useEffect(() => {
    if (usersBlock.status === 'success') {
      dispatch(usersActions.usersBlockIdle({}))
      navigationActions.navigateChat(navigation, {}, { protected: true, user })()
    }

    if (usersUnblock.status === 'success') {
      dispatch(usersActions.usersUnblockIdle({}))
      navigationActions.navigateChat(navigation, {}, { protected: true, user })()
    }
  }, [
    usersBlock.status,
    usersUnblock.status,
  ])

  const chatUsers = path(['data', 'users', 'items'])(chatGetChat)
    .filter(chat => chat.username !== user.username)

  return children({
    user,
    chatUsers,
    usersBlockRequest,
    usersUnblockRequest,
  })
}

export default ChatOptionsService
