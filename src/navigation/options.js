import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { HeaderStyleInterpolators, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter'
import UIContextComponent from 'components/UI/Context'

import * as navigationActions from 'navigation/actions'
import path from 'ramda/src/path'
import Layout from 'constants/Layout'

import LogoIcon from 'assets/svg/header/Logo'
import CameraIcon from 'assets/svg/header/Camera'
import DirectIcon from 'assets/svg/header/Direct'
import BackIcon from 'assets/svg/header/Back'

export const pageHeaderLeft = ({ onPress, label, labelStyle }) => {
  if (!onPress) { return null }
  return (
    <TouchableOpacity style={{ paddingHorizontal: 12 }} onPress={onPress}>
      <BackIcon fill="#fff" />
    </TouchableOpacity>
  )
}

export const chatHeaderLeft = ({ theme, navigation }) => () => (
  <TouchableOpacity style={{ paddingHorizontal: 12 }} onPress={navigationActions.navigateHome(navigation)}>
    <BackIcon fill="#fff" />
  </TouchableOpacity>
)

const homeHeaderLeft = ({ theme, navigation }) => () => (
  <TouchableOpacity style={{ paddingHorizontal: 12 }} onPress={navigationActions.navigateCamera(navigation)}>
    <CameraIcon
      fill={theme.colors.primaryIcon}
    />
  </TouchableOpacity>
)

const homeHeaderTitle = ({ theme }) => () => (
  <LogoIcon
    height="28"
    fill={theme.colors.primaryIcon}
  />
)

const homeHeaderRight = ({ theme, navigation }) => () => (
  <UIContextComponent.Consumer>
    {(props) => (
      <TouchableOpacity style={{ paddingHorizontal: 12, height: 24 }} onPress={navigationActions.navigateChat(navigation)}>
        <DirectIcon
          fill={theme.colors.primaryIcon}
          user={props.user}
        />
      </TouchableOpacity>
    )}
  </UIContextComponent.Consumer>
)

const AuthNavigationComponent = ({ navigation, theme }) => ({
  headerStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerTitleStyle: {
    color: theme.colors.text,
  },
})

const HomeNavigationComponent = ({ navigation, theme }) => ({
  headerStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerLeft: homeHeaderLeft({ navigation, theme }),
  headerTitle: homeHeaderTitle({ navigation, theme }),
  headerRight: homeHeaderRight({ navigation, theme }),
})

const pager = props => {
  const currentIndex = path(['navigationState', 'index'])(props)
  const nextIndex = path(['navigationState', 'routes', currentIndex, 'state', 'index'])(props)
  const swipeEnabled = !nextIndex || nextIndex === 0
  return (
    <ViewPagerAdapter {...props} swipeEnabled={swipeEnabled} />
  )
}

export const tabNavigatorDefaultProps = () => ({
  initialRouteName: 'Root',
  tabBar: () => null,
  lazy: true,
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
  pager,
})

export const tabNavigatorAuthProps = ({ theme }) => ({
  initialRouteName: 'Root',
  sceneContainerStyle: {
    backgroundColor: 'white',
  },
  tabBarOptions: {
    activeTintColor: theme.colors.primary,
    inactiveTintColor: theme.colors.primary,
  },
  pager,
})

export const stackNavigatorDefaultProps = ({ theme }) => ({
  screenOptions: {
    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  },
  cardStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  gestureEnabled: 'vertical',
})

export const stackNavigatorCardProps = ({ theme }) => ({
  screenOptions: {
    gestureEnabled: true,
    cardOverlayEnabled: true,
    ...TransitionPresets.ModalPresentationIOS,
  },
  cardStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
  mode: 'modal',
})

/**
 * Used for Main Screens with application logo
 */
export const stackScreenDefaultProps = ({ theme }) => ({
  options: (props) => ({
    ...HomeNavigationComponent({ ...props, theme }),
    gestureResponseDistance: {
      horizontal: Layout.window.width,
      vertical: Layout.window.height,
    },
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
  }),
})

/**
 * Used for Main Screens with application logo
 */
export const stackScreenAuthProps = ({ theme }) => ({ options } = {}) => ({
  options: (props) => ({
    ...AuthNavigationComponent({ ...props, theme }),
    gestureEnabled: false,
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
    headerStyle: {
      backgroundColor: theme.colors.primary,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
      },
      borderBottomWidth: 0,
      shadowColor: 'transparent',
    },
    headerTitleStyle: {
      color: '#ffffff',
    },
    ...options,
  }),
})

/**
 * Used for Onboard Screens
 */
export const stackScreenOnboardProps = ({ theme }) => ({
  options: (props) => ({
    ...AuthNavigationComponent({ ...props, theme }),
    gestureEnabled: false,
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
    headerTitleStyle: {
      color: theme.colors.backgroundPrimary,
    },
  }),
})

/**
 * Used for Camera without header
 */
export const stackScreenBlankProps = ({ theme }) => ({
  options: (props) => ({
    gestureResponseDistance: {
      horizontal: Layout.window.width,
      vertical: Layout.window.height,
    },
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
    headerShown: false,
  }),
})

/**
 * Used for Camera without header
 */
export const stackScreenModalProps = ({ theme }) => ({
  options: (props) => ({
    gestureDirection: 'vertical',
    gestureResponseDistance: {
      horizontal: Layout.window.width,
      vertical: Layout.window.height,
    },
    cardStyle: {
      backgroundColor: 'transparent',
      gestureDirection: 'vertical',
    },
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  }),
})

/**
 * Used for Profile Screens without application logo but text
 */
export const stackScreenPageProps = ({ theme, themes }) => ({ options } = {}) => ({
  options: (props) => {
    const backgroundColor = path(['colors', 'backgroundPrimary'])(theme)
    const color = path(['colors', 'text'])(theme)

    return ({
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      gestureDirection: 'horizontal',
      gestureResponseDistance: {
        horizontal: Layout.window.width,
        vertical: Layout.window.height,
      },
      cardStyle: {
        backgroundColor,
      },
      headerTitleStyle: {
        color,
      },
      headerStyle: {
        backgroundColor,
        shadowRadius: 0,
        shadowOffset: {
          height: 0,
        },
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      },
      headerLeft: pageHeaderLeft,
      headerRight: () => null,
      headerTintColor: 'red',
      ...options,
    })
  },
})

/**
 * Used for Card Screens without application logo but text
 */
export const stackScreenCardProps = ({ theme }) => ({
  options: (props) => ({
    gestureResponseDistance: {
      horizontal: Layout.window.width,
      vertical: Layout.window.height,
    },
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    header: () => null,
  }),
})

export const tabNavigatorProps = ({ theme, themes, route }) => {
  const activeTintColor = path(['colors', 'primaryIcon'])(theme)
  const inactiveTintColor = `${activeTintColor}90`
  const backgroundColor = path(['colors', 'backgroundPrimary'])(theme)

  return ({
    tabBarOptions: {
      activeTintColor,
      inactiveTintColor,
      labelStyle: {
        fontSize: 10,
        paddingTop: 0,
      },
      style: {
        backgroundColor,
        borderTopWidth: 0,
      },
    },
  })
}