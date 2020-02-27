import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ThemesContext } from 'navigation/context'
import * as navigationOptions from 'navigation/options'

import TabNavigator from 'navigation/TabNavigator'
import PostTypeScreen from 'screens/PostTypeScreen'

const AppNavigator = () => {
  const Stack = createStackNavigator()
  const { theme, themes } = useContext(ThemesContext)
  const stackNavigatorCardProps = navigationOptions.stackNavigatorCardProps({ theme, themes })
  const stackScreenBlankProps = navigationOptions.stackScreenBlankProps({ theme, themes })
  const stackScreenModalProps = navigationOptions.stackScreenModalProps({ theme, themes })

  return (
    <Stack.Navigator {...stackNavigatorCardProps}>
      <Stack.Screen
        name="Tab"
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

export default AppNavigator