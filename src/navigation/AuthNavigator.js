import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import * as navigationOptions from 'navigation/options'

import AuthHomeScreen from 'screens/AuthHomeScreen'
import AuthUsernameScreen from 'screens/AuthUsernameScreen'
import AuthPasswordScreen from 'screens/AuthPasswordScreen'
import AuthPhoneScreen from 'screens/AuthPhoneScreen'
import AuthPhoneConfirmScreen from 'screens/AuthPhoneConfirmScreen'
import AuthEmailScreen from 'screens/AuthEmailScreen'
import AuthEmailConfirmScreen from 'screens/AuthEmailConfirmScreen'

import AuthForgotScreen from 'screens/AuthForgotScreen'
import AuthForgotConfirmScreen from 'screens/AuthForgotConfirmScreen'
import AuthSignupScreen from 'screens/AuthSignupScreen'
import AuthSignupConfirmScreen from 'screens/AuthSignupConfirmScreen'
import OnboardNameScreen from 'screens/OnboardNameScreen'
import OnboardPhotoScreen from 'screens/OnboardPhotoScreen'
import CameraScreen from 'screens/CameraScreen'
import VerificationScreen from 'screens/VerificationScreen'

const AuthNavigator = ({ theme }) => {
  const Stack = createStackNavigator()

  const stackScreenOnboardProps = navigationOptions.stackScreenOnboardProps({ theme })
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenAuthProps = navigationOptions.stackScreenAuthProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="AuthHome"
        component={AuthHomeScreen}
        {...stackScreenAuthProps}
      />

      <Stack.Screen
        name="AuthUsername"
        component={AuthUsernameScreen}
        {...stackScreenAuthProps}
      />

      <Stack.Screen
        name="AuthPassword"
        component={AuthPasswordScreen}
        {...stackScreenAuthProps}
      />

      <Stack.Screen
        name="AuthPhone"
        component={AuthPhoneScreen}
        {...stackScreenAuthProps}
      />

      <Stack.Screen
        name="AuthPhoneConfirm"
        component={AuthPhoneConfirmScreen}
        {...stackScreenAuthProps}
      />

      <Stack.Screen
        name="AuthEmail"
        component={AuthEmailScreen}
        {...stackScreenAuthProps}
      />

      <Stack.Screen
        name="AuthEmailConfirm"
        component={AuthEmailConfirmScreen}
        {...stackScreenAuthProps}
      />

      {/*
       *
      */}
      <Stack.Screen
        name="AuthForgot"
        component={AuthForgotScreen}
        {...stackScreenAuthProps}
      />

      <Stack.Screen
        name="AuthForgotConfirm"
        component={AuthForgotConfirmScreen}
        {...stackScreenAuthProps}
      />

      <Stack.Screen
        name="AuthSignup"
        component={AuthSignupScreen}
        {...stackScreenAuthProps}
      />

      <Stack.Screen
        name="AuthSignupConfirm"
        component={AuthSignupConfirmScreen}
        {...stackScreenAuthProps}
      />

      <Stack.Screen
        name="OnboardName"
        component={OnboardNameScreen}
        {...stackScreenOnboardProps}
      />

      <Stack.Screen
        name="OnboardPhoto"
        component={OnboardPhotoScreen}
        {...stackScreenOnboardProps}
      />

      <Stack.Screen
        name="OnboardCamera"
        component={CameraScreen}
        {...stackScreenOnboardProps}
      />

      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        {...stackScreenAuthProps}
      />
    </Stack.Navigator>
  )
}

export default withTheme(AuthNavigator)