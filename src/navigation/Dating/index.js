import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import { AuthContext } from 'services/providers/Auth'
import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import DatingScreen from 'screens/DatingScreen'
import DatingAboutScreen from 'screens/DatingAboutScreen'
import DatingMatchScreen from 'screens/DatingMatchScreen'
import DatingPreviewScreen from 'screens/DatingPreviewScreen'
import DatingProfileScreen from 'screens/DatingProfileScreen'
import ProfilePhotoUploadScreen from 'screens/ProfilePhotoUploadScreen'

const Stack = createStackNavigator()

const DatingNavigator = () => {
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme, user })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Dating"
        component={DatingScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="DatingAbout"
        component={DatingAboutScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="DatingMatch"
        component={DatingMatchScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="DatingPreview"
        component={DatingPreviewScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="DatingProfile"
        component={DatingProfileScreen}
        {...stackScreenDefaultProps}
      />

      <Stack.Screen
        name="ProfilePhotoUpload"
        component={ProfilePhotoUploadScreen}
        {...stackScreenDefaultProps}
      />

      {navigationFragments.media({
        Stack,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

export default withTheme(DatingNavigator)