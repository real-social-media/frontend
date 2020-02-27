import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import * as navigationOptions from 'navigation/options'

import ChatScreen from 'screens/ChatScreen'

const ChatNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenDefaultProps = navigationOptions.stackScreenDefaultProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        {...stackScreenDefaultProps}
      />
    </Stack.Navigator>
  )
}

export default withTheme(ChatNavigator)