import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import { Text } from 'react-native-paper'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import Avatar from 'templates/Avatar'
import * as navigationActions from 'navigation/actions'
import DefaultButton from 'components/Formik/Button/DefaultButton'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Contacts = ({
  t,
  theme,
  chatUsers,
  usersBlockRequest,
  usersUnblockRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <ScrollView
      style={styling.root}
    >
      <RowsComponent items={chatUsers}>
        {(chat) => (
          <RowsItemComponent>
            <UserRowComponent
              avatar={
                <TouchableOpacity onPress={navigationActions.navigateProfile(navigation, { userId: path(['userId'])(chat) })}>
                  <Avatar
                    active={path(['stories', 'items', 'length'])(chat) || false}
                    thumbnailSource={{ uri: path(['photo', 'url64p'])(chat) }}
                    imageSource={{ uri: path(['photo', 'url64p'])(chat) }}
                    themeCode={path(['themeCode'])(chat)}
                  />
                </TouchableOpacity>
              }
              content={
                <TouchableOpacity onPress={navigationActions.navigateProfile(navigation, { userId: path(['userId'])(chat) })} style={styling.user}>
                  <Text style={styling.username}>{path(['username'])(chat)}</Text>
                </TouchableOpacity>
              }
              action={(
                path(['blockedStatus'])(chat) === 'BLOCKING' ?
                  <DefaultButton label={t('Unblock')} onPress={() => usersUnblockRequest({ userId: path(['userId'])(chat) })} loading={false} mode="outlined" size="compact" /> :
                  <DefaultButton label={t('Block')} onPress={() => usersBlockRequest({ userId: path(['userId'])(chat) })} loading={false} mode="outlined" size="compact" />
              )}
            />
          </RowsItemComponent>
        )}
      </RowsComponent>
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    padding: theme.spacing.base,
  },
  user: {
    paddingHorizontal: 8,
  },
  username: {
  },
})

Contacts.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  chatUsers: PropTypes.any,
  usersBlockRequest: PropTypes.any,
  usersUnblockRequest: PropTypes.any,
}

export default withTranslation()(withTheme(Contacts))
