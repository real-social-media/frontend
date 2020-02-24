import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'
import { withTheme } from 'react-native-paper'

import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import DatingScreen from 'screens/DatingScreen'

const DatingNavigator = ({ theme }) => {
  const Stack = createStackNavigator()
  const stackNavigatorProps = {
    screenOptions: {
      headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
    },
  }

  const stackScreenProps = {
    options: (props) => ({
      ...DefaultNavigationComponent({ ...props, theme }),
      cardStyle: {
        backgroundColor: theme.colors.backgroundPrimary,
      },
    }),
  }

  return (
    <Stack.Navigator {...stackNavigatorProps}>
      <Stack.Screen
        name="Dating"
        component={DatingScreen}
        {...stackScreenProps}
      />
    </Stack.Navigator>
  )
}

export default withTheme(DatingNavigator)