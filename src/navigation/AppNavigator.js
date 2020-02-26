import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withTheme } from 'react-native-paper'
import Layout from 'constants/Layout'

import TabNavigator from 'navigation/TabNavigator'
import CameraNavigator from 'navigation/Camera'
import ChatNavigator from 'navigation/Chat'

const HomeNavigator = ({ theme }) => {
  const Tab = createMaterialTopTabNavigator()

  const tabNavigatorProps = {
    initialRouteName: 'Feed',
    tabBar: () => null,
    sceneContainerStyle: {
      backgroundColor: 'transparent',
      width: Layout.window.width,
    },
  }

  return (
    <Tab.Navigator {...tabNavigatorProps}>
      <Tab.Screen
        name="Camera"
        component={CameraNavigator}
      />
      <Tab.Screen
        name="Feed"
        component={TabNavigator}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
      />
    </Tab.Navigator>
  )
}

export default withTheme(HomeNavigator)