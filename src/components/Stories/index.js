import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import path from 'ramda/src/path'
import Avatar from 'templates/Avatar'
import { Caption } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'
import * as UserService from 'services/User'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Stories = ({ theme, user, usersGetFollowedUsersWithStories }) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const handleUserStoryPress = (user) =>
    navigationActions.navigateStory(navigation, {
      user,
      usersGetFollowedUsersWithStories,
    })

  return (
    <ScrollView style={styling.root} horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity key={user.userId} onPress={navigationActions.navigateCamera(navigation)} style={styling.story}>
        <Avatar
          active={UserService.hasActiveStories(user)}
          size="medium"
          thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
          imageSource={{ uri: path(['photo', 'url480p'])(user) }}
          icon={true}
        />
        <Caption style={styling.username}>{path(['username'])(user)}</Caption>
      </TouchableOpacity>

      {(usersGetFollowedUsersWithStories.data || []).map((user, key) => (
        <TouchableOpacity key={key} onPress={handleUserStoryPress(user)} style={styling.story}>
          <Avatar
            active={UserService.hasActiveStories(user)}
            size="medium"
            thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
            imageSource={{ uri: path(['photo', 'url480p'])(user) }}
            themeCode={path(['themeCode'])(user)}
          />
          <Caption style={styling.username}>{path(['username'])(user)}</Caption>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      height: 115,
      padding: theme.spacing.base,
      backgroundColor: theme.colors.backgroundPrimary,
    },
    story: {
      alignItems: 'center',
      marginRight: 10,
    },
    username: {
      marginTop: 6,
      color: theme.colors.text,
    },
  })

Stories.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  usersGetFollowedUsersWithStories: PropTypes.any,
}

export default withTheme(Stories)
