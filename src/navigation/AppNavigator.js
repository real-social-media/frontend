import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import TabNavigator from 'navigation/TabNavigator'
import Layout from 'constants/Layout'

import ModalScreen from 'screens/ModalScreen'
import StoryScreen from 'screens/StoryScreen'
import PostCreateScreen from 'screens/PostCreateScreen'
import PostEditScreen from 'screens/PostEditScreen'
import PostMediaScreen from 'screens/PostMediaScreen'
import PostMediaLikesScreen from 'screens/PostMediaLikesScreen'
import PostMediaViewsScreen from 'screens/PostMediaViewsScreen'
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
  const stackNavigatorProps = {
    screenOptions: {
      headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    },
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
  }

  const stackScreenProps = {
    options: {
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      gestureEnabled: true,
      gestureResponseDistance: {
        horizontal: Layout.window.width,
        vertical: Layout.window.height,
      },
      gestureDirection: 'vertical',
      cardStyle: {
        backgroundColor: theme.colors.backgroundPrimary,
      },
    },
  }

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="App"
        component={TabNavigator}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="Modal"
        component={ModalScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="Story"
        component={StoryScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="PostCreate"
        component={PostCreateScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="PostEdit"
        component={PostEditScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="PostMedia"
        component={PostMediaScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="PostMediaLikes"
        component={PostMediaLikesScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="PostMediaViews"
        component={PostMediaViewsScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="PostShare"
        component={PostShareScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="Album"
        component={AlbumScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="Albums"
        component={AlbumsScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="AlbumCreate"
        component={AlbumCreateScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="ProfileFollowed"
        component={ProfileFollowedScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="ProfileFollower"
        component={ProfileFollowerScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="ProfileRequests"
        component={ProfileRequestsScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        {...stackScreenProps}
      />

    </Stack.Navigator>
  )
}

export default withTheme(AppNavigator)