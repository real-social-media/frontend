import React, { useEffect, useCallback } from 'react'
import path from 'ramda/src/path'
import HeaderRight from 'navigation/HeaderRight'
import InfoIcon from 'assets/svg/chat/Info'
import * as navigationActions from 'navigation/actions'

import { useNavigation } from '@react-navigation/native'

export const useHeader = ({ user, chatGetChat }) => {
  const navigation = useNavigation()
  const chatId = path(['data', 'chatId'])(chatGetChat)

  /**
   *
   */
  const headerRight = useCallback(
    () => (
      <HeaderRight onPress={navigationActions.navigateChatOptions(navigation, { chatId })}>
        <InfoIcon fill="#ffffff" />
      </HeaderRight>
    ),
    [chatId],
  )

  /**
   *
   */
  useEffect(() => {
    if (!path(['data', 'users', 'items', 'length'])(chatGetChat)) {
      return
    }

    const title = path(['data', 'users', 'items'])(chatGetChat)
      .filter((chat) => chat.username !== user.username)
      .map((chat) => chat.username)
      .join(', ')

    navigation.setOptions({
      title,
      headerRight,
    })
  }, [path(['data', 'users', 'items'])(chatGetChat)])
}
