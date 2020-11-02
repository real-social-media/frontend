import React from 'react'
import PropTypes from 'prop-types'
import equals from 'ramda/src/equals'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import { Caption, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Avatar from 'templates/Avatar'
import * as navigationActions from 'navigation/actions'
import * as UserService from 'services/User'

const Stories = ({
  user,
  usersGetFollowedUsersWithStories,
}) => {
  const navigation = useNavigation()
  const theme = useTheme()
  const styling = styles(theme)
  
  const handleUserStoryPress = (user) => 
    navigationActions.navigateStory(
      navigation,
      {
        user,
        usersGetFollowedUsersWithStories,
      },
      { protected: true, user },
    )

  return (
    <ScrollView
      style={styling.root}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        key={user.userId}
        onPress={navigationActions.navigateCamera(navigation, {}, { protected: true, user })}
        style={styling.story}
      >
        <Avatar
          active={UserService.hasActiveStories(user)}
          size="medium"
          thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
          imageSource={{ uri: path(['photo', 'url480p'])(user) }}
          icon={true}
        />
        <Caption style={styling.username} numberOfLines={1}>{path(['username'])(user)}</Caption>
      </TouchableOpacity>

      {(usersGetFollowedUsersWithStories.data || []).map((user, key) => (
        <TouchableOpacity
          key={key}
          onPress={handleUserStoryPress(user)}
          style={styling.story}
        >
          <Avatar
            active={UserService.hasActiveStories(user)}
            size="medium"
            thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
            imageSource={{ uri: path(['photo', 'url480p'])(user) }}
            themeCode={path(['themeCode'])(user)}
          />
          <Caption style={styling.username} numberOfLines={1}>{path(['username'])(user)}</Caption>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
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
    maxWidth: 70,
  },
})

Stories.propTypes = {
  user: PropTypes.any,
  usersGetFollowedUsersWithStories: PropTypes.any,
}

export default React.memo(Stories, equals)
