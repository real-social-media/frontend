import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'

import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import CameraScreen from 'screens/CameraScreen'

const CameraNavigator = (theme) => ({ navigation }) => {
  
  /**
   * Hiding parent bottom tab coming from createBottomTabNavigator programatically
   */
  navigation.setOptions({ tabBarVisible: false })

  const Stack = createStackNavigator()
  const stackNavigatorProps = {
    screenOptions: {
      headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    },
  }

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={DefaultNavigationComponent(theme)}
      />
    </Stack.Navigator>
  )
}

export default CameraNavigator