import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { withTheme } from 'react-native-paper'

import * as navigationOptions from 'navigation/options'
import * as navigationActions from 'navigation/actions'

import FeedNavigator from 'navigation/Feed'
import SearchNavigator from 'navigation/Search'
import CameraNavigator from 'navigation/Camera'
import DatingNavigator from 'navigation/Dating'
import ProfileNavigator from 'navigation/Profile'

import HomeIcon from 'assets/svg/footer/Home'
import SearchIcon from 'assets/svg/footer/Search'
import CreateIcon from 'assets/svg/footer/Create'
import HeartIcon from 'assets/svg/footer/Heart'
import UserIcon from 'assets/svg/footer/User'

const TabNavigator = ({ navigation, route, theme }) => {
  const tabNavigatorProps = navigationOptions.tabNavigatorProps({ theme, route })

  const FeedTabIconComponent = ({ color }) => <HomeIcon fill={color} />
  const feedTabScreenPropsCard = {
    options: {
      tabBarIcon: FeedTabIconComponent,
      tabBarVisible: !navigationOptions.activeRouteIs(route, 'Camera'),
    },
  }
  
  const SearchTabIconComponent = ({ color }) => <SearchIcon fill={color} />
  const searchTabScreenPropsCard = {
    options: {
      tabBarIcon: SearchTabIconComponent,
    },
  }

  const CameraTabIconComponent = ({ color }) => <CreateIcon fill={color} />
  const CameraTabButtonComponent = (props) => <TouchableOpacity {...props} onPress={navigationActions.navigatePostType(navigation)} />
  const cameraTabScreenPropsCard = {
    options: {
      tabBarIcon: CameraTabIconComponent,
      tabBarButton: CameraTabButtonComponent,
    },
  }

  const DatingTabIconComponent = ({ color }) => <HeartIcon fill={color} />
  const datingTabScreenPropsCard = {
    options: {
      tabBarIcon: DatingTabIconComponent,
    },
  }

  const ProfileTabIconComponent = ({ color }) => <UserIcon fill={color} />
  const profileTabScreenPropsCard = {
    options: {
      tabBarIcon: ProfileTabIconComponent,
    },
  }

  const Tab = createBottomTabNavigator()
  
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
        name="Camera"
        component={CameraNavigator}
        {...cameraTabScreenPropsCard}
      />
      <Tab.Screen
        name="Dating"
        component={DatingNavigator}
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