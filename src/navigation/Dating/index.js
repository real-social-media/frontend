import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import { AuthContext } from 'services/providers/Auth'
import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import DatingScreen from 'screens/DatingScreen'
import DatingAboutScreen from 'screens/DatingAboutScreen'
import DatingMatchScreen from 'screens/DatingMatchScreen'
import DatingProfileScreen from 'screens/DatingProfileScreen'
import ProfilePhotoUploadScreen from 'screens/ProfilePhotoUploadScreen'
import ProfilePhotoGridScreen from 'screens/ProfilePhotoGridScreen'
import DatingWizardNavigator from 'components/DatingWizard'
import { useFocusEffect } from '@react-navigation/native'
import * as UserService from 'services/User'

const Stack = createStackNavigator()

const DatingNavigator = ({ navigation }) => {
  const { theme } = useContext(ThemeContext)
  const { user, setSwipeDisabled } = useContext(AuthContext)
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme })
  const datingEnabled = UserService.isUserEnableDating(user)
  const initialRouteName = datingEnabled ? 'Dating' : 'DatingWizard'
  const datingHeaderLeft = datingEnabled ?
    navigationOptions.datingHeaderLeft :
    navigationOptions.homeHeaderLeft

  useFocusEffect(() => {
    setSwipeDisabled(true)

    return () => setSwipeDisabled(false)
  })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps} initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Dating"
        component={DatingScreen}
        {...stackScreenPageProps({ options: {
          headerTitle: navigationOptions.homeHeaderTitle({ theme, navigation }),
          headerLeft: datingHeaderLeft({ navigation, theme }),
          headerRight: navigationOptions.homeHeaderRight({ navigation, theme, user }),
        } })}
      />

      <Stack.Screen
        name="DatingWizard"
        component={DatingWizardNavigator}
        {...stackScreenPageProps({ options: { title: 'Dating Onboarding', headerLeft: null } })}
      />

      <Stack.Screen
        name="DatingAbout"
        component={DatingAboutScreen}
        {...stackScreenPageProps({ options: { title: 'Dating Profile' } })}
      />

      <Stack.Screen
        name="DatingMatch"
        component={DatingMatchScreen}
        {...stackScreenPageProps({ options: { title: 'Dating Match' } })}
      />

      <Stack.Screen
        name="DatingProfile"
        component={DatingProfileScreen}
        {...stackScreenPageProps({ options: { title: 'Dating Preview' } })}
      />

      <Stack.Screen
        name="ProfilePhotoUpload"
        component={ProfilePhotoUploadScreen}
        {...stackScreenPageProps({ options: { title: 'Change Profile Picture' } })}
      />

      <Stack.Screen
        name="ProfilePhotoGrid"
        component={ProfilePhotoGridScreen}
        {...stackScreenPageProps({ options: { title: 'Change Profile Picture' } })}
      />

      {navigationFragments.media({
        Stack,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

DatingNavigator.propTypes = {
  navigation: PropTypes.any,
}

export default withTheme(DatingNavigator)
