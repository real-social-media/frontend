import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import LogoIcon from 'assets/svg/header/Logo'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Header = ({
  theme,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <View style={styling.header}>
        <LogoIcon
          height="28"
          fill={theme.colors.primaryIcon}
        />
      </View>
    </View>
  )
}

Header.propTypes = {
  theme: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
  },
  header: {
    alignItems: 'center',
  },
  logo: {
  },
})

export default withTheme(Header)
