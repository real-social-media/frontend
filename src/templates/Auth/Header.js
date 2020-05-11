import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Headline, Subheading } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Header = ({
  t,
  theme,
  title,
  subtitle,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <Headline style={styling.headline}>{title}</Headline>
      <Subheading style={styling.subtitle}>{subtitle}</Subheading>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    marginTop: theme.spacing.base * 2,
    marginBottom: theme.spacing.base * 4,
    alignItems: 'center',
  },
  headline: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 24,
    letterSpacing: 0,
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 18,
    letterSpacing: 0,
  },
})

Header.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
}

export default withTranslation()(withTheme(Header))
