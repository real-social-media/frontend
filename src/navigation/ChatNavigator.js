import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeContext } from 'services/providers/Theme'
import * as navigationOptions from 'navigation/options'
import CommentsScreen from 'screens/CommentsScreen'
import ChatScreen from 'screens/ChatScreen'
import ChatDirectScreen from 'screens/ChatDirectScreen'
import ChatOptionsScreen from 'screens/ChatOptionsScreen'
import ProfileScreen from 'screens/ProfileScreen'
import ProfileRequestsScreen from 'screens/ProfileRequestsScreen'

const Stack = createStackNavigator()

const ChatNavigator = ({ navigation }) => {
  const { theme } = useContext(ThemeContext)
  const stackNavigatorDefaultProps = navigationOptions.stackNavigatorDefaultProps({ theme })
  const stackScreenPageProps = navigationOptions.stackScreenPageProps({ theme })

  return (
    <Stack.Navigator {...stackNavigatorDefaultProps}>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        {...stackScreenPageProps({ options: { title: 'Chat', headerLeft: navigationOptions.chatHeaderLeft({ navigation, theme }) } })}
      />
      <Stack.Screen
        name="ChatDirect"
        component={ChatDirectScreen}
        {...stackScreenPageProps({ options: { title: 'Chat' } })}
      />
      <Stack.Screen
        name="ChatOptions"
        component={ChatOptionsScreen}
        {...stackScreenPageProps({ options: { title: 'Chat' } })}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        {...stackScreenPageProps({ options: { title: 'Comments' } })}
      />
      <Stack.Screen
        name="ProfileRequests"
        component={ProfileRequestsScreen}
        {...stackScreenPageProps({ options: { title: 'Follower Requests' } })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        {...stackScreenPageProps({ options: { title: 'Profile' } })}
      />
    </Stack.Navigator>
  )
}

ChatNavigator.propTypes = {
  navigation: PropTypes.any,
}

export default ChatNavigator
