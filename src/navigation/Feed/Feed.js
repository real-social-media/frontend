import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'

import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import FeedScreen from 'screens/FeedScreen'

const FeedNavigator = (theme) => () => {
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
        name="Feed"
        component={FeedScreen}
        {...stackScreenProps}
      />
    </Stack.Navigator>
  )
}

export default FeedNavigator