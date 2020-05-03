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
      <Headline>{title}</Headline>
      <Subheading>{subtitle}</Subheading>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    alignItems: 'center',
  },
})

Header.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
}

export default withTranslation()(withTheme(Header))
