import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import * as navigationOptions from 'navigation/options'
import DatingScreen from 'screens/DatingScreen'

const DatingNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Dating"
        component={DatingScreen}
        {...stackScreenDefaultProps}
      />
    </Stack.Navigator>
  )
}

export default withTheme(DatingNavigator)