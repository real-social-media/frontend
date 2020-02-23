import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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


const AppNavigator = ({ theme, ...props }) => {
  const tabNavigatorProps = {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: theme.colors.primaryIcon,
      style: {
        backgroundColor: theme.colors.backgroundPrimary,
        borderTopWidth: 0,
      },
    },
  }

  const FeedTabIconComponent = ({ color }) => <HomeIcon fill={color} />
  const feedTabScreenPropsCard = {
    options: {
      tabBarIcon: FeedTabIconComponent,
    },
  }
  
  const SearchTabIconComponent = ({ color }) => <SearchIcon fill={color} />
  const searchTabScreenPropsCard = {
    options: {
      tabBarIcon: SearchTabIconComponent,
    },
  }

  const CameraTabIconComponent = ({ color }) => <CreateIcon fill={color} />
  const cameraTabScreenPropsCard = {
    options: {
      tabBarIcon: CameraTabIconComponent,
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
  
  const Feed = FeedNavigator(theme)
  const Search = SearchNavigator(theme)
  const Camera = CameraNavigator(theme)
  const Dating = DatingNavigator(theme)
  const Profile = ProfileNavigator(theme)
  
  return (
    <Tab.Navigator {...tabNavigatorProps}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        {...feedTabScreenPropsCard}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        {...searchTabScreenPropsCard}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        {...cameraTabScreenPropsCard}
      />
      <Tab.Screen
        name="Dating"
        component={Dating}
        {...datingTabScreenPropsCard}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        {...profileTabScreenPropsCard}
      />
    </Tab.Navigator>
  )
}

export default AppNavigator