import React, { useContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import AuthSigninPhoneScreen from 'screens/AuthSigninPhoneScreen'
import AuthSigninEmailScreen from 'screens/AuthSigninEmailScreen'
import testIDs from '../test-ids'

const Tab = createMaterialTopTabNavigator()

const SigninNavigator = () => {
  const { theme } = useContext(ThemeContext)
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme })

  return (
    <Tab.Navigator {...tabNavigatorAuthProps}>
      <Tab.Screen
        name="AuthSigninPhone"
        component={AuthSigninPhoneScreen}
        options={{
          tabBarLabel: 'Phone',
          tabBarTestID: testIDs.authNavigator.signIn.phone,
        }}
      />
      <Tab.Screen
        name="AuthSigninEmail"
        component={AuthSigninEmailScreen}
        options={{
          tabBarLabel: 'Email',
          tabBarTestID: testIDs.authNavigator.signIn.email,
        }}
      />
    </Tab.Navigator>
  )
}

export default SigninNavigator