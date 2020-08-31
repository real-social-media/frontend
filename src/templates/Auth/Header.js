import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Headline, Subheading } from 'react-native-paper'

import { withTheme } from 'react-native-paper'

const Header = ({ theme, title, subtitle }) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <Headline style={styling.headline}>{title}</Headline>
      <Subheading style={styling.subtitle}>{subtitle}</Subheading>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      marginTop: theme.spacing.base * 2,
      marginBottom: theme.spacing.base * 4,
      alignItems: 'center',
    },
    headline: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 21,
      letterSpacing: 0,
    },
    subtitle: {
      textAlign: 'center',
      fontWeight: '500',
      fontSize: 15,
      letterSpacing: 0,
      color: '#7f8c8d',
    },
  })

Header.propTypes = {
  theme: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
}

export default withTheme(Header)
