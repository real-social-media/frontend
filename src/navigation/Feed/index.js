import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import FeedScreen from 'screens/FeedScreen'
import PostCreateScreen from 'screens/PostCreateScreen'
import AlbumsScreen from 'screens/AlbumsScreen'
import AlbumCreateScreen from 'screens/AlbumCreateScreen'
import ProfileRequestsScreen from 'screens/ProfileRequestsScreen'

const AppNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorCardProps = navigationOptions.stackNavigatorCardProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme })
  const stackScreenCardProps = navigationOptions.stackScreenCardProps({ theme })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorCardProps}>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        {...stackScreenDefaultProps}
      />
      
      <Stack.Screen
        name="PostCreate"
        component={PostCreateScreen}
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
        name="ProfileRequests"
        component={ProfileRequestsScreen}
        {...stackScreenCardProps}
      />
      
      {navigationFragments.media({
        Stack,
        stackScreenCardProps,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

export default withTheme(AppNavigator)