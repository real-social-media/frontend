import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import * as navigationOptions from 'navigation/options'

import AuthScreen from 'screens/AuthScreen'
import AuthForgotScreen from 'screens/AuthForgotScreen'
import AuthForgotConfirmScreen from 'screens/AuthForgotConfirmScreen'
import AuthSignupScreen from 'screens/AuthSignupScreen'
import AuthSignupConfirmScreen from 'screens/AuthSignupConfirmScreen'
import AuthOnboardScreen from 'screens/AuthOnboardScreen'

const AuthNavigator = ({ theme }) => {
  const Stack = createStackNavigator()

  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="AuthForgot"
        component={AuthForgotScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="AuthForgotConfirm"
        component={AuthForgotConfirmScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="AuthSignup"
        component={AuthSignupScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="AuthSignupConfirm"
        component={AuthSignupConfirmScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="AuthOnboard"
        component={AuthOnboardScreen}
        {...stackScreenDefaultProps}
      />
    </Stack.Navigator>
  )
}

export default withTheme(AuthNavigator)