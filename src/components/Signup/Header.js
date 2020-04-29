import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import LogoIcon from 'assets/svg/header/Logo'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Header = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.header}>
        <LogoIcon
          height="28"
          fill={theme.colors.primaryIcon}
        />
      </View>

      <View style={styling.subheader}>
        <Text style={styling.text}>{t('Signup to see photos and videos from your friends')}</Text>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  header: {
    alignItems: 'center',
  },
  subheader: {
    marginTop: 24,
    alignItems: 'center',
  },
  logo: {
  },
  text: {
    color: '#333333',
  },
})

Header.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Header))
