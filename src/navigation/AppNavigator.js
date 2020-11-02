import React, { useContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { AuthContext } from 'services/providers/Auth'
import * as navigationOptions from 'navigation/options'
import CameraScreen from 'screens/CameraScreen'
import RootNavigator from 'navigation/RootNavigator'
import ChatNavigator from 'navigation/ChatNavigator'

const Tab = createMaterialTopTabNavigator()

const AppNavigator = () => {
  const { isUserActive } = useContext(AuthContext)
  const tabNavigatorDefaultProps = navigationOptions.tabNavigatorDefaultProps({ isUserActive })

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
}

export default AppNavigator