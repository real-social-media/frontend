/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { ThemeContext } from 'services/providers/Theme'
import { AuthContext } from 'services/providers/Auth'
import SearchFeedContext from 'components/Search/Context'
import * as navigationOptions from 'navigation/options'
import * as navigationActions from 'navigation/actions'
import * as postsActions from 'store/ducks/posts/actions'
import * as UserService from 'services/User'

import FeedNavigator from 'navigation/Feed'
import SearchNavigator from 'navigation/Search'
import DatingNavigator from 'navigation/Dating'
import ProfileNavigator from 'navigation/Profile'

import HomeIcon from 'assets/svg/footer/Home'
import SearchIcon from 'assets/svg/footer/Search'
import CreateIcon from 'assets/svg/footer/Create'
import DatingIcon from 'assets/svg/footer/Dating'
import UserIcon from 'assets/svg/footer/User'
import testIDs from './test-ids'

const renderIcon = (Icon) => ({ color }) => <Icon fill={color} />
const PostType = () => null

const OPTIONS = {
  FEED: {
    tabBarLabel: 'Home',
    tabBarIcon: renderIcon(HomeIcon),
  },
  SEARCH: {
    tabBarLabel: 'Explore',
    tabBarIcon: renderIcon(SearchIcon),
  },
  POST_TYPE: {
    tabBarLabel: 'Create',
    tabBarIcon: renderIcon(CreateIcon),
  },
  DATING: {
    tabBarLabel: 'Dating',
    tabBarIcon: renderIcon(DatingIcon),
  },
  PROFILE: {
    tabBarLabel: 'Profile',
    tabBarIcon: renderIcon(UserIcon),
    tabBarTestID: testIDs.tabNavigator.profile,
  },
}

const Tab = createBottomTabNavigator()

const TabNavigator = ({ route }) => {
  const dispatch = useDispatch()
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(AuthContext)
  const searchFeedContext = useContext(SearchFeedContext)
  const tabNavigatorProps = navigationOptions.tabNavigatorProps({ theme, route })

  const searchListeners = () => ({
    tabPress: () => {
      searchFeedContext.handleFormFocus(false)

      setTimeout(() => {
        dispatch(postsActions.postsGetTrendingPostsRequest())
      }, 350)
    },
  })

  const postTypeListeners = ({ navigation }) => ({
    tabPress: (e) => {
      e.preventDefault()
      navigationActions.navigatePostType(navigation, { actionType: 'HOME' }, { protected: true, user })()
    },
  })

  const datingListeners = ({ navigation }) => ({
    tabPress: (e) => {
      e.preventDefault()
      navigationActions.navigateDating(navigation, {}, { protected: true, user })
    },
  })

  const profileListeners = ({ navigation }) => ({
    tabPress: (e) => {
      if (!UserService.isUserActive(user)) {
        e.preventDefault()
        navigationActions.navigateProfileUpgrade(navigation)
      }
    },
  })

  return (
    <Tab.Navigator {...tabNavigatorProps} initialRouteName="Feed">
      <Tab.Screen name="Feed" component={FeedNavigator} options={OPTIONS.FEED} />
      <Tab.Screen name="Search" component={SearchNavigator} options={OPTIONS.SEARCH} listeners={searchListeners} />
      <Tab.Screen name="PostType" component={PostType} options={OPTIONS.POST_TYPE} listeners={postTypeListeners} />
      <Tab.Screen name="Dating" component={DatingNavigator} options={OPTIONS.DATING} listeners={datingListeners} />
      <Tab.Screen name="Profile" component={ProfileNavigator} options={OPTIONS.PROFILE} listeners={profileListeners} />
    </Tab.Navigator>
  )
}

export default TabNavigator
