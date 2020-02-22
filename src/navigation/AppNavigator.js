import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'

import AuthScreen from 'screens/AuthScreen'
import FeedScreen from 'screens/FeedScreen'
import ProfileScreen from 'screens/ProfileScreen'

const AppNavigator = ({ theme }) => {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={FeedScreen}
          options={DefaultNavigationComponent(theme)}
        />

        <Stack.Screen
          name="FeedProfile"
          component={ProfileScreen}
          options={DefaultNavigationComponent(theme)}
        />

        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={DefaultNavigationComponent(theme)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator