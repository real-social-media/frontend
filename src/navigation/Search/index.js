import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import * as navigationOptions from 'navigation/options'
import * as navigationFragments from 'navigation/fragments'

import SearchScreen from 'screens/SearchScreen'

const SearchNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme })
  const stackScreenCardProps = navigationOptions.stackScreenCardProps({ theme })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        {...stackScreenDefaultProps}
      />

      {navigationFragments.media({
        Stack,
        stackScreenCardProps,
        stackScreenPageProps,
      })}
    </Stack.Navigator>
  )
}

export default withTheme(SearchNavigator)