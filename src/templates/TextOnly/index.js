import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'

import { withTheme } from 'react-native-paper'

const TextComponent = ({
  theme,
  children,
  text,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <LinearGradient
        colors={[`${theme.colors.primary}`, `${theme.colors.primary}90`]}
        style={styling.gradient}
      />
      <Text style={styling.text}>{text}</Text>
      {children}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    minHeight: 240,
    padding: theme.spacing.base * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
})

TextComponent.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  text: PropTypes.any,
}

export default withTheme(TextComponent)
