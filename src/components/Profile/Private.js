import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Caption, Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Private = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <Text>{t('This account is private')} </Text>
      <Caption>{t('Follow this account to see their photos')}</Caption>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    padding: theme.spacing.base,
    marginVertical: theme.spacing.base,
    alignItems: 'center',
  },
  link: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
})

Private.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Private))
