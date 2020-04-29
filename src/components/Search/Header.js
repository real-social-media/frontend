import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Header = ({
  t,
  theme,
  children,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      {children}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
})

Header.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Header))
