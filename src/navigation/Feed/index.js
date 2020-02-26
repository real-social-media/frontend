import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import * as navigationOptions from 'navigation/options'

import FeedScreen from 'screens/FeedScreen'
import StoryScreen from 'screens/StoryScreen'
import PostCreateScreen from 'screens/PostCreateScreen'
import PostEditScreen from 'screens/PostEditScreen'
import PostMediaScreen from 'screens/PostMediaScreen'
import PostLikesScreen from 'screens/PostLikesScreen'
import PostViewsScreen from 'screens/PostViewsScreen'
import PostShareScreen from 'screens/PostShareScreen'
import ProfileScreen from 'screens/ProfileScreen'
import AlbumScreen from 'screens/AlbumScreen'
import AlbumsScreen from 'screens/AlbumsScreen'
import AlbumCreateScreen from 'screens/AlbumCreateScreen'
import CommentsScreen from 'screens/CommentsScreen'
import ProfileFollowedScreen from 'screens/ProfileFollowedScreen'
import ProfileFollowerScreen from 'screens/ProfileFollowerScreen'
import ProfileRequestsScreen from 'screens/ProfileRequestsScreen'
import VerificationScreen from 'screens/VerificationScreen'

const AppNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorCardProps = navigationOptions.stackNavigatorCardProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme })
  const stackScreenCardProps = navigationOptions.stackScreenCardProps({ theme })
  
  return (
    <Stack.Navigator {...stackNavigatorCardProps}>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="Story"
        component={StoryScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostCreate"
        component={PostCreateScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostEdit"
        component={PostEditScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostMedia"
        component={PostMediaScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostLikes"
        component={PostLikesScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostViews"
        component={PostViewsScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="PostShare"
        component={PostShareScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="Album"
        component={AlbumScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="Albums"
        component={AlbumsScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="AlbumCreate"
        component={AlbumCreateScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="ProfileFollowed"
        component={ProfileFollowedScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="ProfileFollower"
        component={ProfileFollowerScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="ProfileRequests"
        component={ProfileRequestsScreen}
        {...stackScreenCardProps}
      />

      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        {...stackScreenCardProps}
      />

    </Stack.Navigator>
  )
}

export default withTheme(AppNavigator)