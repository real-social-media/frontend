import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withTheme } from 'react-native-paper'

import FeedNavigator from 'navigation/Feed/Feed'
import ChatNavigator from 'navigation/Feed/Chat'
import CameraNavigator from 'navigation/Feed/Camera'

const HomeNavigator = ({ navigation, route, theme }) => {
  const Tab = createMaterialTopTabNavigator()

  const tabNavigatorProps = {
    initialRouteName: 'Feed',
    tabBar: () => null,
    sceneContainerStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
  }

  /**
   * Hiding parent bottom tab coming from createBottomTabNavigator programatically
   */
  if (route.state) {
    const activeRouteName = route.state.routes[route.state.index].name
    navigation.setOptions({ tabBarVisible: activeRouteName !== 'Camera' })
  }

  return (
    <Tab.Navigator {...tabNavigatorProps}>
      <Tab.Screen
        name="Camera"
        component={CameraNavigator}
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
}

export default withTheme(HomeNavigator)