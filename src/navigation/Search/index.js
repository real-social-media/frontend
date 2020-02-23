import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'

import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import SearchScreen from 'screens/SearchScreen'

const SearchNavigator = (theme) => () => {
  const Stack = createStackNavigator()
  const stackNavigatorProps = {
    screenOptions: {
      headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    },
  }

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={DefaultNavigationComponent(theme)}
      />
    </Stack.Navigator>
  )
}

export default SearchNavigator