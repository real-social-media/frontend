import React from 'react'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { getActiveChildNavigationOptions } from 'react-navigation'
import { createStackNavigator, CardStyleInterpolators } from 'react-navigation-stack'
import { BottomTabBar } from 'react-navigation-tabs'
import FeedScreen from 'screens/FeedScreen'
import SearchScreen from 'screens/SearchScreen'
import CameraScreen from 'screens/CameraScreen'
import PostMediaScreen from 'screens/PostMediaScreen'
import PostCreateScreen from 'screens/PostCreateScreen'
import PostEditScreen from 'screens/PostEditScreen'
import StoryScreen from 'screens/StoryScreen'
import PostShareScreen from 'screens/PostShareScreen'
import NotificationsScreen from 'screens/NotificationsScreen'
import DatingScreen from 'screens/DatingScreen'
import ChatScreen from 'screens/ChatScreen'
import ProfileScreen from 'screens/ProfileScreen'
import ProfileSelfScreen from 'screens/ProfileSelfScreen'
import ProfilePhotoScreen from 'screens/ProfilePhotoScreen'
import ProfileEditScreen from 'screens/ProfileEditScreen'
import ProfileFollowedScreen from 'screens/ProfileFollowedScreen'
import ProfileFollowerScreen from 'screens/ProfileFollowerScreen'
import ProfileRequestsScreen from 'screens/ProfileRequestsScreen'
import SettingsScreen from 'screens/SettingsScreen'
import PrivacyScreen from 'screens/PrivacyScreen'
import ThemeScreen from 'screens/ThemeScreen'
import TranslationScreen from 'screens/TranslationScreen'
import ModalScreen from 'screens/ModalScreen'
import PayoutScreen from 'screens/PayoutScreen'
import VerificationScreen from 'screens/VerificationScreen'
import MembershipScreen from 'screens/MembershipScreen'
import ProfileArchivedPhotoScreen from 'screens/ProfileArchivedPhotoScreen'
import { TabBarItem } from 'components/NavigationTab'
import Layout from 'constants/Layout'

/**
 * Navigation icons
 */
import HeartIcon from 'assets/svg/footer/Heart'
import CreateIcon from 'assets/svg/footer/Create'
import HomeIcon from 'assets/svg/footer/Home'
import SearchIcon from 'assets/svg/footer/Search'
import UserIcon from 'assets/svg/footer/User'

import path from 'ramda/src/path'

/**
 *
 */
const HomeStack = (screenProps) => {
  const Stack = createMaterialTopTabNavigator({
    CameraStack: createStackNavigator({
      Camera: CameraScreen,
    }, {
      initialRouteName: 'Camera',
      headerMode: 'none',
      navigationOptions: {
        cardStyle: {
          backgroundColor: screenProps.theme.colors.backgroundPrimary,
        },
      },
    }),
    FeedStack: createStackNavigator({
      Feed: FeedScreen,
    }, {
      navigationOptions: {
        cardStyle: {
          backgroundColor: screenProps.theme.colors.backgroundPrimary,
        },
      },
    }),
    ChatStack: createStackNavigator({
      Chat: ChatScreen,
    }, {
      navigationOptions: {
        cardStyle: {
          backgroundColor: screenProps.theme.colors.backgroundPrimary,
        },
      },
    }),
  }, {
    initialRouteName: 'FeedStack',
    tabBarComponent: () => null,
    navigationOptions: ({ navigation, screenProps }) => ({
      ...getActiveChildNavigationOptions(navigation, screenProps),
    }),
  })

  Stack.navigationOptions = ({ navigation, screenProps }) => ({
    tabBarIcon: ({ focused }) => (
      <TabBarItem focused={focused}>
        <HomeIcon fill={screenProps.theme.colors.primaryIcon} />
      </TabBarItem>
    ),
    tabBarVisible: navigation.state.routes[navigation.state.index].routeName !== 'CameraStack',
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      const stackIndex = path(['state', 'index'])(navigation)
      const stackRoutes = path(['state', 'routes', stackIndex])(navigation)
      
      const currentIndex = path(['index'])(stackRoutes)
      const currentKey = path(['key'])(stackRoutes)
      const scrollToTop = path(['routes', currentIndex, 'params', 'scrollToTop'])(stackRoutes)

      if (navigation.isFocused() && currentIndex !== 0) {
        navigation.navigate('Feed')
      }

      if (navigation.isFocused() && currentKey !== 'FeedStack') {
        navigation.navigate('Feed')
      }

      if (navigation.isFocused() && typeof scrollToTop === 'function') {
        scrollToTop()
      }

      defaultHandler()
    },
  })
  
  return Stack
}

/**
 *
 */
const SearchStack = (screenProps) => {
  const Stack = createStackNavigator({
    Search: SearchScreen,
  }, {
    defaultNavigationOptions: {
      gestureEnabled: true,
      gestureResponseDistance: {
        horizontal: Layout.window.width,
      },
      cardStyle: {
        backgroundColor: screenProps.theme.colors.backgroundPrimary,
      },
    },
  })

  Stack.navigationOptions = ({ screenProps }) => ({
    tabBarIcon: ({ focused }) => (
      <TabBarItem focused={focused}>
        <SearchIcon fill={screenProps.theme.colors.primaryIcon} />
      </TabBarItem>
    ),
  })

  return Stack
}

/**
 *
 */
const NotificationsStack = (screenProps) => {
  const Stack = createStackNavigator({
    Notifications: NotificationsScreen,
  }, {
    defaultNavigationOptions: {
      gestureEnabled: true,
      gestureResponseDistance: {
        horizontal: Layout.window.width,
      },
      cardStyle: {
        backgroundColor: screenProps.theme.colors.backgroundPrimary,
      },
    },
  })
  
  Stack.navigationOptions = ({ navigation, screenProps }) => ({
    tabBarIcon: ({ focused }) => (
      <TabBarItem focused={focused}>
        <CreateIcon fill={screenProps.theme.colors.primaryIcon} />
      </TabBarItem>
    ),
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      navigation.navigate('Camera')
    },
  })

  return Stack
}

/**
 *
 */
const DatingStack = (screenProps) => {
  const Stack = createStackNavigator({
    Dating: DatingScreen,
  }, {
    defaultNavigationOptions: {
      gestureEnabled: true,
      gestureResponseDistance: {
        horizontal: Layout.window.width,
      },
      cardStyle: {
        backgroundColor: screenProps.theme.colors.backgroundPrimary,
      },
    },
  })
  
  Stack.navigationOptions = ({ navigation, screenProps }) => ({
    tabBarIcon: ({ focused }) => (
      <TabBarItem focused={focused}>
        <HeartIcon fill={screenProps.theme.colors.primaryIcon} />
      </TabBarItem>
    ),
  })

  return Stack
}

/**
 *
 */
const ProfileStack = (screenProps) => {
  const Stack = createStackNavigator({
    ProfileSelf: ProfileSelfScreen,
    ProfileEdit: ProfileEditScreen,
    ProfilePhoto: ProfilePhotoScreen,
    Theme: ThemeScreen,
    Privacy: PrivacyScreen,
    Translation: TranslationScreen,
    Settings: SettingsScreen,
    Payout: PayoutScreen,
    Membership: MembershipScreen,
    ProfileArchivedPhoto: ProfileArchivedPhotoScreen,
  }, {
    defaultNavigationOptions: {
      gestureEnabled: true,
      gestureResponseDistance: {
        horizontal: Layout.window.width,
      },
      cardStyle: {
        backgroundColor: screenProps.theme.colors.backgroundPrimary,
      },
    },
  })
  
  Stack.navigationOptions = ({ screenProps }) => ({
    tabBarIcon: ({ focused }) => (
      <TabBarItem focused={focused}>
        <UserIcon fill={screenProps.theme.colors.primaryIcon} />
      </TabBarItem>
    ),
  })

  return Stack
}

/**
 *
 */
const tabNavigator = (screenProps) => createBottomTabNavigator({
  HomeStack: HomeStack(screenProps),
  SearchStack: SearchStack(screenProps),
  NotificationsStack: NotificationsStack(screenProps),
  DatingStack: DatingStack(screenProps),
  ProfileStack: ProfileStack(screenProps),
}, {
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: '#F9F9F9',
    },
  },
  tabBarComponent: props => (
    <BottomTabBar
      {...props}
      style={{
        backgroundColor: props.screenProps.theme.colors.backgroundPrimary,
      }}
    />
  ),
})

export default (screenProps) => createStackNavigator({
  Content: tabNavigator(screenProps),
  Modal: ModalScreen,
  Story: StoryScreen,

  PostCreate: PostCreateScreen,
  PostEdit: PostEditScreen,
  PostMedia: PostMediaScreen,
  PostShare: PostShareScreen,
  FeedProfile: ProfileScreen,
  ProfileFollowed: ProfileFollowedScreen,
  ProfileFollower: ProfileFollowerScreen,
  ProfileRequests: ProfileRequestsScreen,
  Verification: VerificationScreen,
}, {
  mode: 'modal',
  headerMode: 'none',
  defaultNavigationOptions: {
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    gestureEnabled: true,
    gestureResponseDistance: {
      horizontal: Layout.window.width,
    },
    cardStyle: {
      backgroundColor: screenProps.theme.colors.backgroundPrimary,
    },
  },
})
