/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { withTheme } from 'react-native-paper'

import { ThemesContext } from 'navigation/context'
import * as navigationOptions from 'navigation/options'
import * as navigationActions from 'navigation/actions'

import FeedNavigator from 'navigation/Feed'
import SearchNavigator from 'navigation/Search'
import ChatNavigator from 'navigation/Chat'
import ProfileNavigator from 'navigation/Profile'

import HomeIcon from 'assets/svg/footer/Home'
import SearchIcon from 'assets/svg/footer/Search'
import CreateIcon from 'assets/svg/footer/Create'
import DirectIcon from 'assets/svg/footer/Direct'
import UserIcon from 'assets/svg/footer/User'
import testIDs from './test-ids'

const TabNavigator = ({ navigation, route }) => {
  const { theme, themes } = useContext(ThemesContext)
  const tabNavigatorProps = navigationOptions.tabNavigatorProps({ theme, themes, route })

  const FeedTabIconComponent = ({ color }) => <HomeIcon fill={color} />
  const feedTabScreenPropsCard = {
    options: {
      tabBarIcon: FeedTabIconComponent,
      tabBarLabel: 'Home',
    },
  }
  
  const SearchTabIconComponent = ({ color }) => <SearchIcon fill={color} />
  const searchTabScreenPropsCard = {
    options: {
      tabBarIcon: SearchTabIconComponent,
      tabBarLabel: 'Explore',
    },
  }

  const CameraTabIconComponent = ({ color }) => <CreateIcon fill={color} />
  const CameraTabButtonComponent = (props) => <TouchableOpacity {...props} onPress={navigationActions.navigatePostType(navigation, { actionType: 'HOME' })} />
  const cameraTabScreenPropsCard = {
    options: {
      tabBarIcon: CameraTabIconComponent,
      tabBarLabel: 'Create',
      tabBarButton: CameraTabButtonComponent,
    },
  }

  const ChatTabIconComponent = ({ color }) => <DirectIcon fill={color} />
  const datingTabScreenPropsCard = {
    options: {
      tabBarIcon: ChatTabIconComponent,
      tabBarLabel: 'Chat',
    },
  }

  const ProfileTabIconComponent = ({ color }) => <UserIcon fill={color} />
  const profileTabScreenPropsCard = {
    options: {
      tabBarTestID: testIDs.tabNavigator.profile,
      tabBarIcon: ProfileTabIconComponent,
      tabBarLabel: 'Profile',
    },
  }

  const Tab = createBottomTabNavigator()

  const PostType = () => null

  return (
    <Tab.Navigator {...tabNavigatorProps}>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        {...feedTabScreenPropsCard}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        {...searchTabScreenPropsCard}
      />
      <Tab.Screen
        name="PostType"
        component={PostType}
        {...cameraTabScreenPropsCard}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNavigator}
        {...datingTabScreenPropsCard}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        {...profileTabScreenPropsCard}
      />
    </Tab.Navigator>
  )
}

export default withTheme(TabNavigator)