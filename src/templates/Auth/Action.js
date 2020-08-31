import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Subheading } from 'react-native-paper'

import { withTheme } from 'react-native-paper'

const BottomAction = ({ theme, children, onPress, testID }) => {
  const styling = styles(theme)

  return (
    <TouchableOpacity testID={testID} style={styling.root} onPress={onPress}>
      <Subheading style={styling.action}>{children}</Subheading>
    </TouchableOpacity>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundSecondary,
      height: 80,
    },
    action: {
      fontWeight: '500',
      letterSpacing: 0,
      color: theme.colors.primary,
    },
  })

BottomAction.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  onPress: PropTypes.any,
  testID: PropTypes.string,
}

BottomAction.defaultProps = {
  testID: null,
}

export default withTheme(BottomAction)
