import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { GiftedChat, MessageText, Bubble } from 'react-native-gifted-chat'
import pathOr from 'ramda/src/pathOr'
import FormComponent from 'components/ChatDirect/Form'
import { useHeader } from 'components/ChatDirect/header'
import * as navigationActions from 'navigation/actions'
import ActionSheet from 'react-native-actionsheet'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ChatDirect = ({
  t,
  theme,
  user,
  chatGetChat,
  chatCreateDirect,
  chatCreateDirectRequest,
  chatAddMessage,
  chatAddMessageRequest,
  marginBottom,
  chatId,
  chatDeleteMessageRequest,
  chatFlagMessageRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const actionSheetRef = useRef(null)
  const [selectedMessage, setSelectedMessage] = useState(null)

  const messagesAdapter = pathOr([], ['data', 'messages', 'items'])(chatGetChat)
    .map(message => ({
      _id: message.messageId,
      text: message.text,
      createdAt: message.createdAt,
      user: {
        _id: pathOr(null, ['author', 'userId'])(message),
        name: pathOr(null, ['author', 'username'])(message),
        avatar: pathOr(null, ['author', 'photo', 'url64p'])(message),
      },
      system: !pathOr(null, ['author', 'userId'])(message),
    }))

  const userAdapter = {
    _id: user.userId,
  }

  useHeader({
    user,
    chatGetChat,
  })

  return (
    <View style={styling.root}>
      <GiftedChat
        messages={messagesAdapter}
        onSend={message => chatAddMessageRequest({ text: message[0].text })}
        renderBubble={(bubbleProps) => (
          <Bubble
            {...bubbleProps}
            renderMessageText={(messageProps) => (
              <MessageText
                {...messageProps}
                customTextStyle={styling.customTextStyle}
              />
            )}
            wrapperStyle={{ left: styling.receivedMessage, right: styling.sentMessage }}
          />
        )}
        user={userAdapter}
        renderInputToolbar={() => null}
        minInputToolbarHeight={0}
        onPressAvatar={({ _id }) => navigationActions.navigateProfile(navigation, { userId: _id })}
        isKeyboardInternallyHandled={false}
        onLongPress={(_, message) => {
          setSelectedMessage(message)
          actionSheetRef.current && actionSheetRef.current.show()
        }}
      />
      
      {chatId ?
        <View style={{ marginBottom }}>
          <FormComponent
            chatAddMessage={chatAddMessage}
            chatAddMessageRequest={chatAddMessageRequest}
          />
        </View>
      : null}

      {!chatId ?
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ marginBottom, paddingHorizontal: 12 }}>
          <FormComponent
            chatAddMessage={chatCreateDirect}
            chatAddMessageRequest={chatCreateDirectRequest}
          />
        </View>
      : null}

      {selectedMessage && (selectedMessage.user._id === user.userId) ?
        <ActionSheet
          ref={actionSheetRef}
          options={[t('Delete Message'), t('Cancel')]}
          cancelButtonIndex={1}
          onPress={(index) => {
            if (index === 0) {
              chatDeleteMessageRequest({ messageId: selectedMessage._id })
            }
          }}
        />
      : null}

      {selectedMessage && (selectedMessage.user._id !== user.userId) ?
        <ActionSheet
          ref={actionSheetRef}
          options={[t('Delete Message'), t('Report Message'), t('Cancel')]}
          cancelButtonIndex={2}
          onPress={(index) => {
            if (index === 0) {
              chatDeleteMessageRequest({ messageId: selectedMessage._id })
            }
            if (index === 1) {
              chatFlagMessageRequest({ messageId: selectedMessage._id })
            }
          }}
        />
      : null}

    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  receivedMessage: {
    backgroundColor: '#2f3542',
  },
  sentMessage: {
  },
  customTextStyle: {
    color: '#ffffff',
  },
})

ChatDirect.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  user: PropTypes.any,
  chatGetChat: PropTypes.any,
  chatCreateDirect: PropTypes.any,
  chatCreateDirectRequest: PropTypes.any,
  chatAddMessage: PropTypes.any,
  chatAddMessageRequest: PropTypes.any,
  marginBottom: PropTypes.any,
  chatId: PropTypes.any,
  chatDeleteMessageRequest: PropTypes.any,
  chatFlagMessageRequest: PropTypes.any,
}

export default withTranslation()(withTheme(ChatDirect))
