import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import { withTheme } from 'react-native-paper'

const Header = ({
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
}

export default withTheme(Header)
