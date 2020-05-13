import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withTheme } from 'react-native-paper'

import { ThemesContext } from 'navigation/context'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import TabNavigator from 'navigation/TabNavigator'
import StoryScreen from 'screens/StoryScreen'
import PostTypeScreen from 'screens/PostTypeScreen'
import CommentsScreen from 'screens/CommentsScreen'
import CameraScreen from 'screens/CameraScreen'
import ChatScreen from 'screens/ChatScreen'
import ChatDirectScreen from 'screens/ChatDirectScreen'

const ChatNavigator = ({ navigation }) => {
  const { theme, themes } = useContext(ThemesContext)
  const Stack = createStackNavigator()
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme, themes })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        {...stackScreenPageProps({ options: { title: 'Chat', headerLeft: navigationOptions.chatHeaderLeft({ navigation, theme }) } })}
      />
      <Stack.Screen
        name="ChatDirect"
        component={ChatDirectScreen}
        {...stackScreenPageProps({ options: { title: 'Chat' } })}
      />
    </Stack.Navigator>
  )
}

const RootNavigator = () => {
  const Stack = createStackNavigator()
  const { theme, themes } = useContext(ThemesContext)
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme, themes })
  const stackScreenBlankProps = navigationOptions.stackScreenBlankProps({ theme, themes })
  const stackScreenModalProps = navigationOptions.stackScreenModalProps({ theme, themes })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme, themes })
  const stackScreenCardProps = navigationOptions.stackScreenCardProps({ theme, themes })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        {...stackScreenBlankProps}
      />

      <Stack.Screen
        name="PostType"
        component={PostTypeScreen}
        {...stackScreenModalProps}
      />

      <Stack.Screen
        name="Story"
        component={StoryScreen}
        {...stackScreenModalProps}
      />

      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        {...stackScreenPageProps({ options: { title: 'Comments' } })}
      />

      {navigationFragments.media({
        Stack,
        stackScreenCardProps,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}


const AppNavigator = withTheme(({ theme }) => {
  const Tab = createMaterialTopTabNavigator()
  const tabNavigatorDefaultProps = navigationOptions.tabNavigatorDefaultProps()
  return (
    <Tab.Navigator {...tabNavigatorDefaultProps}>
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
      />
      <Tab.Screen
        name="Root"
        component={RootNavigator}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
      />
    </Tab.Navigator>
  )
})

export default AppNavigator