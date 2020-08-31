import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import path from 'ramda/src/path'
import { Text, Caption } from 'react-native-paper'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import Avatar from 'templates/Avatar'
import * as navigationActions from 'navigation/actions'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as UserService from 'services/User'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Contacts = ({ t, theme, user, chatGetChats, loading = false }) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const items = (path(['data'])(chatGetChats) || []).map((chat) => ({
    ...chat,
    users: {
      ...chat.users,
      items: chat.users.items.filter((chatUser) => path(['userId'])(chatUser) !== path(['userId'])(user)),
    },
  }))

  return (
    <ScrollView
      style={styling.root}
      refreshControl={<RefreshControl tintColor={theme.colors.border} refreshing={loading} />}
    >
      <RowsComponent items={items}>
        {(chat) => (
          <RowsItemComponent>
            <UserRowComponent
              avatar={
                <TouchableOpacity
                  onPress={navigationActions.navigateChatDirect(navigation, {
                    userId: path(['users', 'items', '0', 'userId'])(chat),
                    chatId: chat.chatId,
                  })}
                >
                  <Avatar
                    active={UserService.hasActiveStories(path(['users', 'items', '0'])(chat))}
                    thumbnailSource={{ uri: path(['users', 'items', '0', 'photo', 'url64p'])(chat) }}
                    imageSource={{ uri: path(['users', 'items', '0', 'photo', 'url64p'])(chat) }}
                    themeCode={path(['users', 'items', '0', 'themeCode'])(chat)}
                  />
                </TouchableOpacity>
              }
              content={
                <TouchableOpacity
                  onPress={navigationActions.navigateChatDirect(navigation, {
                    userId: path(['users', 'items', '0', 'userId'])(chat),
                    chatId: chat.chatId,
                  })}
                  style={styling.user}
                >
                  <Text style={styling.username}>{path(['users', 'items', '0', 'username'])(chat)}</Text>

                  {path(['messages', 'items', '0', 'author', 'userId'])(chat) === user.userId ? (
                    <Caption style={styling.viewed}>
                      {t('Sent')} {dayjs(path(['messages', 'items', '0', 'createdAt'])(chat)).from(dayjs())}
                    </Caption>
                  ) : (
                    <React.Fragment>
                      {path(['messages', 'items', '0', 'viewedStatus'])(chat) === 'NOT_VIEWED' ? (
                        <Caption style={styling.notViewed}>{path(['messages', 'items', '0', 'text'])(chat)}</Caption>
                      ) : null}

                      {path(['messages', 'items', '0', 'viewedStatus'])(chat) === 'VIEWED' ? (
                        <Caption style={styling.viewed}>{path(['messages', 'items', '0', 'text'])(chat)}</Caption>
                      ) : null}
                    </React.Fragment>
                  )}
                </TouchableOpacity>
              }
              action={
                <DefaultButton
                  label={t('Chat')}
                  onPress={navigationActions.navigateChatDirect(navigation, {
                    userId: path(['users', 'items', '0', 'userId'])(chat),
                    chatId: chat.chatId,
                  })}
                  loading={false}
                  mode="outlined"
                  size="compact"
                />
              }
            />
          </RowsItemComponent>
        )}
      </RowsComponent>
    </ScrollView>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: theme.spacing.base,
    },
    user: {
      paddingHorizontal: 8,
    },
    username: {},
    viewed: {},
    notViewed: {
      color: theme.colors.text,
      fontWeight: '600',
    },
  })

Contacts.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  chatGetChats: PropTypes.any,
  loading: PropTypes.any,
}

export default withTranslation()(withTheme(Contacts))
