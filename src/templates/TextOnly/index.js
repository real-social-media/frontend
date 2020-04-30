import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import Layout from 'constants/Layout'
import LinearGradient from 'react-native-linear-gradient'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const TextComponent = ({
  t,
  theme,
  themes,
  children,
  text,
  themeCode,
}) => {
  const styling = styles(theme)

  const themeSelector = (activeThemeCode) =>
    ((themes || []).find(theme => theme.key === activeThemeCode) || {}).theme
  const activeTheme = themeSelector(themeCode) || theme

  return (
    <View style={styling.root}>
      <LinearGradient
        colors={[`${activeTheme.colors.primary}`, `${activeTheme.colors.primary}90`]}
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
  post: PropTypes.any,
}

export default withTranslation()(withTheme(TextComponent))
