import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'

import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import ChatScreen from 'screens/ChatScreen'

const MainNavigator = (theme) => () => {
  const Stack = createStackNavigator()
  const stackNavigatorProps = {
    screenOptions: {
      headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    },
  }

  const stackScreenProps = {
    options: (props) => ({
      ...DefaultNavigationComponent(theme)(props),
      cardStyle: {
        backgroundColor: theme.colors.backgroundPrimary,
      },
    }),
  }

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        {...stackScreenProps}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator