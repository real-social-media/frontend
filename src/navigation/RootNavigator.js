import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'
import TabNavigator from 'navigation/TabNavigator'
import StoryScreen from 'screens/StoryScreen'
import PostTypeScreen from 'screens/PostTypeScreen'
import CommentsScreen from 'screens/CommentsScreen'
import VerificationScreen from 'screens/VerificationScreen'
import ProfileUpgradeScreen from 'screens/ProfileUpgradeScreen'

const Stack = createStackNavigator()

const RootNavigator = () => {
  const { theme } = useContext(ThemeContext)
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenBlankProps = navigationOptions.stackScreenBlankProps({ theme })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme })
  const stackScreenCardProps = navigationOptions.stackScreenCardProps({ theme })
  const stackScreenModalProps = navigationOptions.stackScreenModalProps

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        {...stackScreenBlankProps}
      />

      <Stack.Screen
        name="ProfileUpgrade"
        component={ProfileUpgradeScreen}
        {...stackScreenModalProps}
      />

      <Stack.Screen
        name="PostType"
        component={PostTypeScreen}
        {...stackScreenModalProps}
      />

      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        {...stackScreenModalProps}
      />

      <Stack.Screen
        name="Story"
        component={StoryScreen}
        {...stackScreenModalProps}
      />

      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        {...stackScreenPageProps({ options: { title: 'Comments' } })}
      />

      {navigationFragments.media({
        Stack,
        stackScreenCardProps,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

export default RootNavigator