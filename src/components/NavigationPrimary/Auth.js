import React from 'react'
import LogoIcon from 'assets/svg/header/Logo'

const headerLeft = () => null

const headerTitle = ({ theme }) => () => (
  <LogoIcon
    height="28"
    fill={theme.colors.primaryIcon}
  />
)

const headerRight = () => null

const DefaultNavigationHeader = ({ navigation, theme }) => ({
  headerStyle: {
    backgroundColor: theme.colors.backgroundPrimary,
    height: 170,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerLeftContainerStyle: {
    padding: theme.spacing.base,
  },
  headerLeft: headerLeft({ navigation, theme }),
  headerTitle: headerTitle({ navigation, theme }),
  headerRight: headerRight({ navigation, theme }),
})

export default DefaultNavigationHeader