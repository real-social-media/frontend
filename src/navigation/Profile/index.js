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
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="ProfileSelf"
        component={ProfileSelfScreen}
        {...stackScreenPageProps({ options: { title: 'Profile' } })}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        {...stackScreenPageProps({ options: { title: 'Edit Profile' } })}
      />
      <Stack.Screen
        name="ProfilePhoto"
        component={ProfilePhotoScreen}
        {...stackScreenPageProps({ options: { title: 'Change Profile Photo' } })}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        {...stackScreenPageProps({ options: { title: 'Choose Theme' } })}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        {...stackScreenPageProps({ options: { title: 'Mental Health & Privacy Settings' } })}
      />
      <Stack.Screen
        name="Translation"
        component={TranslationScreen}
        {...stackScreenPageProps({ options: { title: 'Change Language' } })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        {...stackScreenPageProps({ options: { title: 'Settings' } })}
      />
      <Stack.Screen
        name="Payout"
        component={PayoutScreen}
        {...stackScreenPageProps({ options: { title: 'Diamond Payout' } })}
      />
      <Stack.Screen
        name="Membership"
        component={MembershipScreen}
        {...stackScreenPageProps({ options: { title: 'Join Diamond' } })}
      />
      <Stack.Screen
        name="Archived"
        component={ArchivedScreen}
        {...stackScreenPageProps({ options: { title: 'Archived Photos' } })}
      />
    </Stack.Navigator>
  )
}

export default withTheme(ProfileNavigator)