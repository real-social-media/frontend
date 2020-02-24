import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import CameraScreen from 'screens/CameraScreen'

const MainNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorProps = {
    screenOptions: {
      headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    },
  }

  const stackScreenProps = {
    options: (props) => ({
      headerShown: false,
      cardStyle: {
        backgroundColor: theme.colors.backgroundPrimary,
      },
    }),
  }

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        {...stackScreenProps}
      />
    </Stack.Navigator>
  )
}

export default withTheme(MainNavigator)