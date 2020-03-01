import React from 'react'
import { TouchableOpacity } from 'react-native'
import LogoIcon from 'assets/svg/header/Logo'
import CameraIcon from 'assets/svg/header/Camera'
import DirectIcon from 'assets/svg/header/Direct'
import * as navigationActions from 'navigation/actions'

const headerLeft = ({ theme, navigation }) => () => (
  <TouchableOpacity style={{ padding: 12 }} onPress={navigationActions.navigateCamera(navigation)}>
    <CameraIcon
      fill={theme.colors.primaryIcon}
    />
  </TouchableOpacity>
)

const headerTitle = ({ theme }) => () => (
  <LogoIcon
    height="28"
    fill={theme.colors.primaryIcon}
  />
)

const headerRight = ({ theme, navigation }) => () => (
  <TouchableOpacity style={{ padding: 12 }} onPress={navigationActions.navigateChat(navigation)}>
    <DirectIcon
      fill={theme.colors.primaryIcon}
    />
  </TouchableOpacity>
)

const DefaultNavigationHeader = ({ navigation, theme }) => ({
  headerStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerLeft: headerLeft({ navigation, theme }),
  headerTitle: headerTitle({ navigation, theme }),
  headerRight: headerRight({ navigation, theme }),
})

export default DefaultNavigationHeader