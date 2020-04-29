import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import pathOr from 'ramda/src/pathOr'
import FormComponent from 'components/ChatDirect/Form'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ChatDirect = ({
  t,
  theme,
  user,
  chatGetChat,
  chatCreateDirectRequest,
  chatAddMessage,
  chatAddMessageRequest,
  marginBottom,
  chatId,
}) => {
  const styling = styles(theme)

  const messagesAdapter = pathOr([], ['data', 'messages', 'items'])(chatGetChat)
    .map(message => ({
      _id: message.messageId,
      text: message.text,
      createdAt: message.createdAt,
      user: {
        _id: message.author.userId,
        name: message.author.username,
        avatar: message.author.photo.url64p,
      },
    }))

  const userAdapter = {
    _id: user.userId,
  }

  return (
    <View style={styling.root}>
      <GiftedChat
        messages={messagesAdapter}
        onSend={message => chatAddMessageRequest({ text: message[0].text })}
        user={userAdapter}
        renderInputToolbar={() => null}
        minInputToolbarHeight={0}
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
        <View style={{ marginBottom, paddingHorizontal: 12 }}>
          <DefaultButton label={t('Start Chat')} onPress={chatCreateDirectRequest} />
        </View>
      : null}
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
})

ChatDirect.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  chatGetChat: PropTypes.any,
  chatCreateDirectRequest: PropTypes.any,
  chatAddMessage: PropTypes.any,
  chatAddMessageRequest: PropTypes.any,
  marginBottom: PropTypes.any,
  chatId: PropTypes.any,
}

export default withTranslation()(withTheme(ChatDirect))
