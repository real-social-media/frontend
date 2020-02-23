import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import FeedNavigator from 'navigation/Feed/Feed'
import ChatNavigator from 'navigation/Feed/Chat'

import CameraScreen from 'screens/CameraScreen'

const HomeNavigator = (theme) => ({ navigation, route }) => {
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
        component={CameraScreen}
      />
      <Tab.Screen
        name="Feed"
        component={FeedNavigator(theme)}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator(theme)}
      />
    </Tab.Navigator>
  )
}

export default HomeNavigator