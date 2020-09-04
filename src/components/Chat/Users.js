import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import path from 'ramda/src/path'
import { Text } from 'react-native-paper'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import Avatar from 'templates/Avatar'
import * as navigationActions from 'navigation/actions'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as UserService from 'services/User'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Users = ({
  t,
  theme,
  usersSearch,
  loading = false,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <ScrollView
      style={styling.root}
      refreshControl={
        <RefreshControl
          tintColor={theme.colors.border}
          refreshing={loading}
        />
      }
    >
      <RowsComponent items={path(['data'])(usersSearch)}>
        {(user) => (
          <RowsItemComponent>
            <UserRowComponent
              avatar={
                <TouchableOpacity onPress={navigationActions.navigateChatDirect(navigation, { userId: user.userId, chatId: path(['user', 'directChat', 'chatId'])(user) })}>
                  <Avatar
                    active={UserService.hasActiveStories(user)}
                    thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
                    imageSource={{ uri: path(['photo', 'url64p'])(user) }}
                    themeCode={path(['themeCode'])(user)}
                  />
                </TouchableOpacity>
              }
              content={
                <TouchableOpacity onPress={navigationActions.navigateChatDirect(navigation, { userId: user.userId, chatId: path(['user', 'directChat', 'chatId'])(user) })} style={styling.user}>
                  <Text style={styling.username}>{path(['username'])(user)}</Text>
                  <Text style={styling.fullname}>{path(['fullName'])(user)}</Text>
                </TouchableOpacity>
              }
              action={(
                <DefaultButton label={t('Chat')} onPress={navigationActions.navigateChatDirect(navigation, { userId: user.userId, chatId: path(['user', 'directChat', 'chatId'])(user) })} loading={false} mode="outlined" size="compact" />
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
  fullname: {
  },
})

Users.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  usersSearch: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(withTheme(Users))
