import React from 'react'
import PropTypes from 'prop-types'
import LogoIcon from 'assets/svg/header/Logo'

export default ({ screenProps }) => ({
  headerStyle: {
    backgroundColor: screenProps.theme.colors.backgroundPrimary,
    height: 70,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerLeftContainerStyle: {
    padding: screenProps.theme.spacing.base,
  },
  headerLeft: () => null,
  headerTitle: () => (
    <LogoIcon
      height="28"
      fill={screenProps.theme.colors.primaryIcon}
    />
  ),
  headerRightContainerStyle: {
    padding: screenProps.theme.spacing.base,
  },
  headerRight: () => null,
})