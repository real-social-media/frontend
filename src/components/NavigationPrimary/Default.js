import React from 'react'
import { TouchableOpacity } from 'react-native'
import LogoIcon from 'assets/svg/header/Logo'
import CameraIcon from 'assets/svg/header/Camera'
import DirectIcon from 'assets/svg/header/Direct'

const headerLeft = ({ theme, navigation }) => () => (
  <TouchableOpacity style={{ padding: 12 }} onPress={() => navigation.push('Camera')}>
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
  <TouchableOpacity style={{ padding: 12 }} onPress={() => navigation.push('Chat')}>
    <DirectIcon
      fill={theme.colors.primaryIcon}
    />
  </TouchableOpacity>
)

export default (theme) => ({ navigation }) => ({
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