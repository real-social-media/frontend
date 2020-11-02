import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import ProfileSelfScreen from 'screens/ProfileSelfScreen'
import ProfileEditScreen from 'screens/ProfileEditScreen'
import ProfilePhotoGridScreen from 'screens/ProfilePhotoGridScreen'
import ProfilePhotoUploadScreen from 'screens/ProfilePhotoUploadScreen'
import ProfilePhotoScreen from 'screens/ProfilePhotoScreen'
import ThemeScreen from 'screens/ThemeScreen'
import PrivacyScreen from 'screens/PrivacyScreen'
import TranslationScreen from 'screens/TranslationScreen'
import SettingsScreen from 'screens/SettingsScreen'
import PayoutScreen from 'screens/PayoutScreen'
import MembershipScreen from 'screens/MembershipScreen'
import ArchivedScreen from 'screens/ArchivedScreen'
import InviteFriendsScreen from 'screens/InviteFriendsScreen'
import DatingAboutScreen from 'screens/DatingAboutScreen'
import DatingMatchScreen from 'screens/DatingMatchScreen'
import DatingProfileScreen from 'screens/DatingProfileScreen'

const Stack = createStackNavigator()

const ProfileNavigator = () => {
  const { theme } = useContext(ThemeContext)
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
        name="ProfilePhotoGrid"
        component={ProfilePhotoGridScreen}
        {...stackScreenPageProps({ options: { title: 'Change Profile Picture' } })}
      />
      <Stack.Screen
        name="ProfilePhotoUpload"
        component={ProfilePhotoUploadScreen}
        {...stackScreenPageProps({ options: { title: 'Change Profile Picture' } })}
      />
      <Stack.Screen
        name="ProfilePhoto"
        component={ProfilePhotoScreen}
        {...stackScreenPageProps({ options: { title: 'Change Profile Picture' } })}
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
        name="InviteFriends"
        component={InviteFriendsScreen}
        {...stackScreenPageProps({ options: { title: 'Follow & Invite Friends' } })}
      />
      <Stack.Screen
        name="Archived"
        component={ArchivedScreen}
        {...stackScreenPageProps({ options: { title: 'Archived Photos' } })}
      />
      <Stack.Screen
        name="DatingAbout"
        component={DatingAboutScreen}
        {...stackScreenPageProps({ options: { title: 'Dating Profile' } })}
      />
      <Stack.Screen
        name="DatingMatch"
        component={DatingMatchScreen}
        {...stackScreenPageProps({ options: { title: 'Dating Preferences' } })}
      />
      <Stack.Screen
        name="DatingProfile"
        component={DatingProfileScreen}
        {...stackScreenPageProps({ options: { title: 'Dating Profile' } })}
      />
      {navigationFragments.media({
        Stack,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

export default ProfileNavigator