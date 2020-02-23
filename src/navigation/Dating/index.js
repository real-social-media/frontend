import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'

import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import DatingScreen from 'screens/DatingScreen'

const DatingNavigator = (theme) => () => {
  const Stack = createStackNavigator()
  const stackNavigatorProps = {
    screenOptions: {
      headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    },
  }

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="Dating"
        component={DatingScreen}
        options={DefaultNavigationComponent(theme)}
      />
    </Stack.Navigator>
  )
}

export default DatingNavigator