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

  const stackScreenProps = {
    options: (props) => ({
      ...DefaultNavigationComponent(theme)(props),
      cardStyle: {
        backgroundColor: theme.colors.backgroundPrimary,
      },
    }),
  }

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="ProfileSelf"
        component={ProfileSelfScreen}
        {...stackScreenProps}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        {...stackScreenProps}
      />
      <Stack.Screen
        name="ProfilePhoto"
        component={ProfilePhotoScreen}
        {...stackScreenProps}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        {...stackScreenProps}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        {...stackScreenProps}
      />
      <Stack.Screen
        name="Translation"
        component={TranslationScreen}
        {...stackScreenProps}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        {...stackScreenProps}
      />
      <Stack.Screen
        name="Payout"
        component={PayoutScreen}
        {...stackScreenProps}
      />
      <Stack.Screen
        name="Membership"
        component={MembershipScreen}
        {...stackScreenProps}
      />
      <Stack.Screen
        name="Archived"
        component={ArchivedScreen}
        {...stackScreenProps}
      />
    </Stack.Navigator>
  )
}

export default ProfileNavigator