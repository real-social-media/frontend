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

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={DefaultNavigationComponent(theme)}
      />
    </Stack.Navigator>
  )
}

export default FeedNavigator