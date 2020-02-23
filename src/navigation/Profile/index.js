import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'

import DefaultNavigationComponent from 'components/NavigationPrimary/Default'

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

const ProfileNavigator = (theme) => () => {
  const Stack = createStackNavigator()
  const stackNavigatorProps = {
    screenOptions: {
      headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    },
  }

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="ProfileSelf"
        component={ProfileSelfScreen}
        options={DefaultNavigationComponent(theme)}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={DefaultNavigationComponent(theme)}
      />
      <Stack.Screen
        name="ProfilePhoto"
        component={ProfilePhotoScreen}
        options={DefaultNavigationComponent(theme)}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        options={DefaultNavigationComponent(theme)}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={DefaultNavigationComponent(theme)}
      />
      <Stack.Screen
        name="Translation"
        component={TranslationScreen}
        options={DefaultNavigationComponent(theme)}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={DefaultNavigationComponent(theme)}
      />
      <Stack.Screen
        name="Payout"
        component={PayoutScreen}
        options={DefaultNavigationComponent(theme)}
      />
      <Stack.Screen
        name="Membership"
        component={MembershipScreen}
        options={DefaultNavigationComponent(theme)}
      />
      <Stack.Screen
        name="Archived"
        component={ArchivedScreen}
        options={DefaultNavigationComponent(theme)}
      />
    </Stack.Navigator>
  )
}

export default ProfileNavigator