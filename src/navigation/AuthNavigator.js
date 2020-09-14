import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withTheme } from 'react-native-paper'

import { ThemesContext } from 'navigation/context'
import * as navigationOptions from 'navigation/options'

import AuthHomeScreen from 'screens/AuthHomeScreen'
import AuthSigninPhoneScreen from 'screens/AuthSigninPhoneScreen'
import AuthSigninEmailScreen from 'screens/AuthSigninEmailScreen'
import AuthUsernameScreen from 'screens/AuthUsernameScreen'
import AuthPhoneScreen from 'screens/AuthPhoneScreen'
import AuthPasswordScreen from 'screens/AuthPasswordScreen'
import AuthPhoneConfirmScreen from 'screens/AuthPhoneConfirmScreen'
import AuthEmailScreen from 'screens/AuthEmailScreen'
import AuthEmailConfirmScreen from 'screens/AuthEmailConfirmScreen'
import VerificationScreen from 'screens/VerificationScreen'
import CameraScreen from 'screens/CameraScreen'
import AuthForgotPhoneScreen from 'screens/AuthForgotPhoneScreen'
import AuthForgotEmailScreen from 'screens/AuthForgotEmailScreen'
import AuthForgotConfirmScreen from 'screens/AuthForgotConfirmScreen'
import AuthCognitoScreen from 'screens/AuthCognitoScreen'
import testIDs from './test-ids'

const SignupNavigator = (props) => {
  const Tab = createMaterialTopTabNavigator()
  const { theme } = useContext(ThemesContext)
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme, props })
  return (
    <Tab.Navigator {...tabNavigatorAuthProps}>
      <Tab.Screen
        name="AuthPhone"
        component={AuthPhoneScreen}
        options={{
          tabBarLabel: 'Phone',
          tabBarTestID: testIDs.authNavigator.signUp.phone,
        }}
      />
      <Tab.Screen
        name="AuthEmail"
        component={AuthEmailScreen}
        options={{
          tabBarLabel: 'Email',
          tabBarTestID: testIDs.authNavigator.signUp.email,
        }}
      />
    </Tab.Navigator>
  )
}

const SigninNavigator = (props) => {
  const Tab = createMaterialTopTabNavigator()
  const { theme } = useContext(ThemesContext)
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme, props })
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

const ForgotNavigator = (props) => {
  const Tab = createMaterialTopTabNavigator()
  const { theme } = useContext(ThemesContext)
  const tabNavigatorAuthProps = navigationOptions.tabNavigatorAuthProps({ theme, props })

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

const AuthNavigator = ({ theme }) => {
  const Stack = createStackNavigator()

  const stackScreenOnboardProps = navigationOptions.stackScreenOnboardProps({ theme })
  const stackScreenBlankProps = navigationOptions.stackScreenBlankProps({ theme })
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenAuthProps = navigationOptions.stackScreenAuthProps({ theme })
  const stackScreenAuthModalProps = navigationOptions.stackScreenAuthModalProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="AuthHome"
        component={AuthHomeScreen}
        {...stackScreenOnboardProps}
      />

      <Stack.Screen
        name="Signup"
        component={SignupNavigator}
        {...stackScreenAuthProps({ options: { title: 'Signup', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true } })}
      />

      <Stack.Screen
        name="Signin"
        component={SigninNavigator}
        {...stackScreenAuthProps({ options: { title: 'Log In', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true } })}
      />

      <Stack.Screen
        name="Forgot"
        component={ForgotNavigator}
        {...stackScreenAuthProps({ options: { title: 'Forgot', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true } })}
      />

      <Stack.Screen
        name="AuthUsername"
        component={AuthUsernameScreen}
        {...stackScreenAuthProps({ options: { title: 'Signup', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true } })}
      />

      <Stack.Screen
        name="AuthPassword"
        component={AuthPasswordScreen}
        {...stackScreenAuthProps({ options: { title: 'Signup', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true } })}
      />

      <Stack.Screen
        name="AuthEmailConfirm"
        component={AuthEmailConfirmScreen}
        {...stackScreenAuthProps({ options: { title: 'Enter 6-digit code', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true } })}
      />

      <Stack.Screen
        name="AuthPhoneConfirm"
        component={AuthPhoneConfirmScreen}
        {...stackScreenAuthProps({ options: { title: 'Enter 6-digit code', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true } })}
      />

      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        {...stackScreenAuthModalProps}
      />

      <Stack.Screen
        name="AuthCamera"
        component={CameraScreen}
        {...stackScreenBlankProps}
      />

      <Stack.Screen
        name="AuthForgotConfirm"
        component={AuthForgotConfirmScreen}
        {...stackScreenAuthProps({ options: { title: 'Forgot Confirm', headerLeft: navigationOptions.pageHeaderLeft, gestureEnabled: true } })}
      />

      <Stack.Screen
        name="AuthCognito"
        component={AuthCognitoScreen}
        {...stackScreenAuthProps({ options: { title: 'Signup', headerLeft: null } })}
      />
    </Stack.Navigator>
  )
}

AuthNavigator.propTypes = {
  theme: PropTypes.any,
}

export default withTheme(AuthNavigator)