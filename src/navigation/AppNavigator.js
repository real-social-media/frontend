import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import * as navigationOptions from 'navigation/options'

import TabNavigator from 'navigation/TabNavigator'
import PostTypeScreen from 'screens/PostTypeScreen'

const AppNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorCardProps = navigationOptions.stackNavigatorCardProps({ theme })
  const stackScreenBlankProps = navigationOptions.stackScreenBlankProps({ theme })
  const stackScreenModalProps = navigationOptions.stackScreenModalProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorCardProps}>
      <Stack.Screen
        name="Feed"
        component={TabNavigator}
        {...stackScreenBlankProps}
      />
      <Stack.Screen
        name="PostType"
        component={PostTypeScreen}
        {...stackScreenModalProps}
      />
    </Stack.Navigator>
  )
}

export default withTheme(AppNavigator)