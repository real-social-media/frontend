import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native'
import ContactsComponent from 'components/Chat/Contacts'
import UsersComponent from 'components/Chat/Users'
import HeaderComponent from 'components/Search/Header'
import FormComponent from 'components/Search/Form'
import PendingRequestsComponent from 'components/Feed/PendingRequests'
import { Subheading } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Chat = ({
  t,
  theme,
  user,
  feedRef,
  formFocus,
  formChange,
  handleFormFocus,
  handleFormChange,

  chatGetChats,
  chatGetChatsRequest,
  usersSearch,
  usersSearchRequest,
  usersGetPendingFollowers,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <PendingRequestsComponent
        usersGetPendingFollowers={usersGetPendingFollowers}
      />

      <HeaderComponent>
        <FormComponent
          usersSearch={usersSearch}
          usersSearchRequest={usersSearchRequest}
          handleFormFocus={handleFormFocus}
          handleFormChange={handleFormChange}
        />
      </HeaderComponent>

      {formFocus && formChange ?
        <ScrollView
          ref={feedRef}
          style={styling.list}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.border}
              refreshing={usersSearch.status === 'loading'}
            />
          }
        >
          <Subheading style={styling.subheading}>{t('Search')}</Subheading>
          <UsersComponent
            usersSearch={usersSearch}
          />
        </ScrollView>
      :
        <ScrollView
          ref={feedRef}
          style={styling.list}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.border}
              onRefresh={chatGetChatsRequest}
              refreshing={chatGetChats.status === 'loading'}
            />
          }
        >
          <Subheading style={styling.subheading}>{t('Recent')}</Subheading>
          <ContactsComponent
            user={user}
            chatGetChats={chatGetChats}
          />
        </ScrollView>
      }
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  list: {
    flex: 1,
  },
  subheading: {
    paddingTop: 6,
    paddingHorizontal: 12,
  },
})

Chat.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  feedRef: PropTypes.any,
  formFocus: PropTypes.any,
  formChange: PropTypes.any,
  handleFormFocus: PropTypes.any,
  handleFormChange: PropTypes.any,
  chatGetChats: PropTypes.any,
  chatGetChatsRequest: PropTypes.any,
  usersSearch: PropTypes.any,
  usersSearchRequest: PropTypes.any,
  usersGetPendingFollowers: PropTypes.any,
}

export default withTranslation()(withTheme(Chat))
