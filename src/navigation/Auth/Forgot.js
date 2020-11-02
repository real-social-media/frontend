import React, { useContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import AuthForgotPhoneScreen from 'screens/AuthForgotPhoneScreen'
import AuthForgotEmailScreen from 'screens/AuthForgotEmailScreen'

const Tab = createMaterialTopTabNavigator()

const ForgotNavigator = () => {
  const { theme } = useContext(ThemeContext)
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme })

  return (
    <Tab.Navigator {...tabNavigatorAuthProps}>
      <Tab.Screen
        name="AuthForgotPhone"
        component={AuthForgotPhoneScreen}
        options={{
          tabBarLabel: 'Phone',
          tabBarTestID: 'navigation/AuthNavigator/Forgot/phone',
        }}
      />
      <Tab.Screen
        name="AuthForgotEmail"
        component={AuthForgotEmailScreen}
        options={{
          tabBarLabel: 'Email',
          tabBarTestID: 'navigation/AuthNavigator/Forgot/email',
        }}
      />
    </Tab.Navigator>
  )
}

export default ForgotNavigator