/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Caption } from 'react-native-paper'
import Layout from 'constants/Layout'

import PropTypes from 'prop-types'
import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const trackerWidth = Layout.window.width - 24 - 28

const LifetimeIndicator = ({ t, theme, onValueChange }) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <TouchableOpacity style={[{ left: '0%' }, styling.indicator]} onPress={() => onValueChange(1)}>
        <Caption style={[styling.caption, styling.captionStart]}>{t('Day')}</Caption>
      </TouchableOpacity>
      <TouchableOpacity style={[{ left: '25%' }, styling.indicator]} onPress={() => onValueChange(2)}>
        <Caption style={styling.caption}>{t('Week')}</Caption>
      </TouchableOpacity>
      <TouchableOpacity style={[{ left: '50%' }, styling.indicator]} onPress={() => onValueChange(3)}>
        <Caption style={styling.caption}>{t('Month')}</Caption>
      </TouchableOpacity>
      <TouchableOpacity style={[{ left: '75%' }, styling.indicator]} onPress={() => onValueChange(4)}>
        <Caption style={styling.caption}>{t('Year')}</Caption>
      </TouchableOpacity>
      <TouchableOpacity style={[{ left: '100%' }, styling.indicator]} onPress={() => onValueChange(5)}>
        <Caption style={[styling.caption, styling.captionEnd]}>{t('Forever')}</Caption>
      </TouchableOpacity>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      width: trackerWidth,
      height: 20,
      marginBottom: 6,
    },
    indicator: {
      width: 24,
      height: 24,
      position: 'absolute',
      alignItems: 'center',
    },
    caption: {
      position: 'absolute',
      width: 70,
      paddingTop: 2,
      textAlign: 'center',
      color: theme.colors.border,
      marginLeft: 2,
    },
    captionStart: {
      textAlign: 'left',
      left: 0,
    },
    captionEnd: {
      textAlign: 'right',
      right: 0,
    },
  })

LifetimeIndicator.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  onValueChange: PropTypes.any,
}

export default withTranslation()(withTheme(LifetimeIndicator))
