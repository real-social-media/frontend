import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import FeedNavigator from 'navigation/Feed/Feed'
import ChatNavigator from 'navigation/Feed/Chat'

import CameraScreen from 'screens/CameraScreen'

const HomeNavigator = (theme) => ({ navigation, route }) => {
  const Tab = createMaterialTopTabNavigator()

  /**
   * Hiding parent bottom tab coming from createBottomTabNavigator programatically
   */
  if (route.state) {
    const activeRouteName = route.state.routes[route.state.index].name
    navigation.setOptions({ tabBarVisible: activeRouteName !== 'Camera' })
  }

  return (
    <Tab.Navigator initialRouteName="Feed" tabBar={() => null}>
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