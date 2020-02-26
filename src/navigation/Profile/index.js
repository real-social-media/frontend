import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import * as navigationOptions from 'navigation/options'
import ProfileSelfScreen from 'screens/ProfileSelfScreen'
import ProfileEditScreen from 'screens/ProfileEditScreen'
import ProfilePhotoScreen from 'screens/ProfilePhotoScreen'
import ThemeScreen from 'screens/ThemeScreen'
import PrivacyScreen from 'screens/PrivacyScreen'
import TranslationScreen from 'screens/TranslationScreen'
import SettingsScreen from 'screens/SettingsScreen'
import PayoutScreen from 'screens/PayoutScreen'
import MembershipScreen from 'screens/MembershipScreen'
import ArchivedScreen from 'screens/ArchivedScreen'

const ProfileNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="ProfileSelf"
        component={ProfileSelfScreen}
        {...stackScreenDefaultProps}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        {...stackScreenDefaultProps}
      />
      <Stack.Screen
        name="ProfilePhoto"
        component={ProfilePhotoScreen}
        {...stackScreenDefaultProps}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        {...stackScreenDefaultProps}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        {...stackScreenDefaultProps}
      />
      <Stack.Screen
        name="Translation"
        component={TranslationScreen}
        {...stackScreenDefaultProps}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        {...stackScreenDefaultProps}
      />
      <Stack.Screen
        name="Payout"
        component={PayoutScreen}
        {...stackScreenDefaultProps}
      />
      <Stack.Screen
        name="Membership"
        component={MembershipScreen}
        {...stackScreenDefaultProps}
      />
      <Stack.Screen
        name="Archived"
        component={ArchivedScreen}
        {...stackScreenDefaultProps}
      />
    </Stack.Navigator>
  )
}

export default withTheme(ProfileNavigator)