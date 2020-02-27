import { HeaderStyleInterpolators, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack'
import DefaultNavigationComponent from 'components/NavigationPrimary/Default'
import path from 'ramda/src/path'

/**
 * Recursive search for the latest active screen in the stack
 * useful for getting active users theme object
 */
export const getActiveRouteName = (item) => {
  const index = path(['state', 'index'])(item)
  const nextRoute = path(['state', 'routes', index])(item)

  if (nextRoute && nextRoute.state) {
    return getActiveRouteName(nextRoute)
  } else if (nextRoute) {
    return nextRoute
  } else {
    return item
  }
}

export const activeRouteIs = (route, name) => {
  return path(['name'])(getActiveRouteName(route)) === name
}

const getActiveTheme = ({ theme, themes, route }) => {
  const themeSelector = (themeCode) =>
    ((themes || []).find(theme => theme.key === themeCode) || {}).theme

  if (!['Profile', 'ProfileFollower', 'ProfileFollowed', 'PostMedia'].includes(route.name)) {
    return theme
  }

  const userTheme = path(['params', 'user', 'themeCode'])(route)
  if (userTheme) {
    return themeSelector(userTheme)
  }

  const postTheme = path(['params', 'post', 'postedBy', 'themeCode'])(route)
  if (postTheme) {
    return themeSelector(postTheme)
  }

  return theme
}

export const stackNavigatorDefaultProps = ({ theme }) => ({
  screenOptions: {
    headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  },
  cardStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
  },
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
    ...DefaultNavigationComponent({ ...props, theme }),
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
  }),
})

/**
 * Used for Camera without header
 */
export const stackScreenBlankProps = ({ theme }) => ({
  options: (props) => ({
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
    cardStyle: {
      backgroundColor: 'transparent',
    },
    headerShown: false,
  }),
})

/**
 * Used for Profile Screens without application logo but text
 */
export const stackScreenPageProps = ({ theme, themes }) => ({ options } = {}) => ({
  options: (props) => {
    const active = getActiveRouteName(props.route)
    const activeTheme = getActiveTheme({ theme, themes, route: active })

    const backgroundColor = (
      path(['colors', 'backgroundPrimary'])(activeTheme) ||
      path(['colors', 'backgroundPrimary'])(theme)
    )

    const color = (
      path(['colors', 'text'])(activeTheme) ||
      path(['colors', 'text'])(theme)
    )

    return ({
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      gestureDirection: 'horizontal',
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
      headerLeft: () => null,
      headerRight: () => null,
      ...options,
    })
  },
})

/**
 * Used for Card Screens without application logo but text
 */
export const stackScreenCardProps = ({ theme }) => ({
  options: (props) => ({
    cardStyle: {
      backgroundColor: theme.colors.backgroundPrimary,
    },
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    header: () => null,
  }),
})

export const tabNavigatorProps = ({ theme, themes, route }) => {
  const active = getActiveRouteName(route)
  const activeTheme = getActiveTheme({ theme, themes, route: active })

  const activeTintColor =  (
    path(['colors', 'primaryIcon'])(activeTheme) ||
    path(['colors', 'primaryIcon'])(theme)
  )

  const inactiveTintColor = (
    path(['colors', 'disabled'])(activeTheme) ||
    path(['colors', 'disabled'])(theme)
  )

  const backgroundColor = (
    path(['colors', 'backgroundPrimary'])(activeTheme) ||
    path(['colors', 'backgroundPrimary'])(theme)
  )

  return ({
    tabBarOptions: {
      showLabel: false,
      activeTintColor,
      inactiveTintColor,
      style: {
        backgroundColor,
        borderTopWidth: 0,
      },
    },
  })
}