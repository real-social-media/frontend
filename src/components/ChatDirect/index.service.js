import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as chatActions from 'store/ducks/chat/actions'
import * as postsServices from 'store/ducks/posts/services'
import * as authSelector from 'store/ducks/auth/selectors'
import { v4 as uuid } from 'uuid'
import { useNavigation, useRoute } from '@react-navigation/native'
import path from 'ramda/src/path'
import { ifIphoneX } from 'react-native-iphone-x-helper'

const ChatDirectService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const user = useSelector(authSelector.authUserSelector)
  const usersGetTrendingUsers = useSelector(state => state.users.usersGetTrendingUsers)
  const chatCreateDirect = useSelector(state => state.chat.chatCreateDirect)
  const chatAddMessage = useSelector(state => state.chat.chatAddMessage)
  const chatGetChat = useSelector(state => state.chat.chatGetChat)
  const chatGetChatCache = useSelector(state => state.chat.chatGetChatCache)
  const chatId = (
    path(['params', 'chat', 'chatId'])(route) ||
    path(['params', 'user', 'directChat', 'chatId'])(route)
  )
  const userId = path(['params', 'user', 'userId'])(route)

  useEffect(() => {
    dispatch(chatActions.chatGetChatRequest({ chatId }))
  }, [])

  useEffect(() => {
    dispatch(chatActions.chatGetChatRequest({ chatId }))
  }, [chatAddMessage.status])

  useEffect(() => {
    if (chatCreateDirect.status === 'success') {
      navigation.setParams({
        chat: chatCreateDirect.data,
      })
      dispatch(chatActions.chatCreateDirectIdle())
    }
  }, [chatCreateDirect.status])

  const chatCreateDirectRequest = () => {
    const chatId = uuid()
    const messageId = uuid()
    dispatch(chatActions.chatCreateDirectRequest({
      chatId,
      userId,
      messageId,
      messageText: '👋',
    }))
  }

  const chatAddMessageRequest = (payload) => {
    const messageId = uuid()
    dispatch(chatActions.chatAddMessageRequest({
      chatId,
      messageId,
      text: payload.text,
    }))
  }

  /**
   * Keyboard movement calculator 
   */
  const [offset, setOffset] = useState(0)

  const keyboardWillShow = (event) => {
    setOffset(event.endCoordinates.height - ifIphoneX(40, 0) + 12)
  }

  const keyboardWillHide = (event) => {
    setOffset(0)
  }

  useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', keyboardWillShow)
    const keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', keyboardWillHide)

    return () => {
      keyboardWillShowSub.remove()
      keyboardWillHideSub.remove()
    }
  }, [])

  const marginBottom = offset + ifIphoneX(40, 0)

  return children({
    user,
    chatId,
    chatCreateDirect,
    chatAddMessage,
    chatAddMessageRequest,
    chatCreateDirectRequest,
    usersGetTrendingUsers,
    chatGetChat: postsServices.cachedPostsGet(chatGetChat, chatGetChatCache, chatId),
    marginBottom,
  })
}

export default ChatDirectService
