import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators, CardStyleInterpolators } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import AuthNavigationComponent from 'components/NavigationPrimary/Auth'

import AuthScreen from 'screens/AuthScreen'
import AuthForgotScreen from 'screens/AuthForgotScreen'
import AuthForgotConfirmScreen from 'screens/AuthForgotConfirmScreen'
import AuthSignupScreen from 'screens/AuthSignupScreen'
import AuthSignupConfirmScreen from 'screens/AuthSignupConfirmScreen'
import AuthOnboardScreen from 'screens/AuthOnboardScreen'

const AuthNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorProps = {
    screenOptions: {
      headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    },
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
  }

  const stackScreenProps = {
    options: (props) => ({
      ...AuthNavigationComponent({ ...props, theme }),
      cardStyle: {
        backgroundColor: theme.colors.backgroundPrimary,
      },
    }),
  }

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="AuthForgot"
        component={AuthForgotScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="AuthForgotConfirm"
        component={AuthForgotConfirmScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="AuthSignup"
        component={AuthSignupScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="AuthSignupConfirm"
        component={AuthSignupConfirmScreen}
        {...stackScreenProps}
      />

      <Stack.Screen
        name="AuthOnboard"
        component={AuthOnboardScreen}
        {...stackScreenProps}
      />
    </Stack.Navigator>
  )
}

export default withTheme(AuthNavigator)