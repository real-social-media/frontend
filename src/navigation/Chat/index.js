import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import ChatScreen from 'screens/ChatScreen'

const ChatNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorDefaultProps = {
    screenOptions: {
      headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    },
  }

  const stackScreenDefaultProps = {
    options: (props) => ({
      ...DefaultNavigationComponent({ ...props, theme }),
      cardStyle: {
        backgroundColor: theme.colors.backgroundPrimary,
      },
    }),
  }

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