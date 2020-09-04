import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import ContactsComponent from 'components/ChatOptions/Contacts'
import { Subheading } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const ChatOptions = ({
  t,
  theme,
  user,
  chatUsers,
  usersBlockRequest,
  usersUnblockRequest,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <ScrollView
        style={styling.list}
      >
        <Subheading style={styling.subheading}>{t('Users')}</Subheading>
        <ContactsComponent
          user={user}
          chatUsers={chatUsers}
          usersBlockRequest={usersBlockRequest}
          usersUnblockRequest={usersUnblockRequest}
        />
      </ScrollView>
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  subheading: {
    paddingTop: 6,
    paddingHorizontal: 12,
  },
})

ChatOptions.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  user: PropTypes.any,
  chatUsers: PropTypes.any,
  usersBlockRequest: PropTypes.any,
  usersUnblockRequest: PropTypes.any,
}

export default withTranslation()(withTheme(ChatOptions))
