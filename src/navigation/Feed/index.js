import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withTheme } from 'react-native-paper'

import { ThemesContext } from 'navigation/context'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import CameraScreen from 'screens/CameraScreen'
import ChatScreen from 'screens/ChatScreen'
import FeedScreen from 'screens/FeedScreen'
import AlbumsScreen from 'screens/AlbumsScreen'
import AlbumCreateScreen from 'screens/AlbumCreateScreen'
import ProfileRequestsScreen from 'screens/ProfileRequestsScreen'

const ChatNavigator = withTheme(({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        {...stackScreenDefaultProps}
      />
    </Stack.Navigator>
  )
})

const FeedNavigator = withTheme(({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        {...stackScreenDefaultProps}
      />
    </Stack.Navigator>
  )
})

const HomeNavigator = withTheme(({ theme }) => {
  const Tab = createMaterialTopTabNavigator()

  const tabNavigatorProps = {
    initialRouteName: 'Feed',
    tabBar: () => null,
    sceneContainerStyle: {
      backgroundColor: 'transparent',
    },
  }

  return (
    <Tab.Navigator {...tabNavigatorProps}>
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
      />
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
      />
    </Tab.Navigator>
  )
})

const AppNavigator = () => {
  const { theme, themes } = useContext(ThemesContext)
  const Stack = createStackNavigator()
  const stackNavigatorCardProps = navigationOptions.stackNavigatorCardProps({ theme, themes })
  const stackScreenBlankProps = navigationOptions.stackScreenBlankProps({ theme, themes })
  const stackScreenCardProps = navigationOptions.stackScreenCardProps({ theme, themes })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme, themes })

  return (
    <Stack.Navigator {...stackNavigatorCardProps}>
      <Stack.Screen
        name="Feed"
        component={HomeNavigator}
        {...stackScreenBlankProps}
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