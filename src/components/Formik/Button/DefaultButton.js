import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Button } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const DefaultButton = ({
  t,
  theme,
  label,
  size,
  mode,
  labelStyle,
  ...props
}) => {
  const styling = styles(theme)
  

  const contentStyle = (size === 'compact') ? styling.compactContent : styling.defaultContent
  const colorStyle = (mode === 'contained') ? { color: theme.colors.buttonText } : {}

  return (
    <View style={styling.root}>
      <Button {...props} contentStyle={contentStyle} uppercase={false} compact mode={mode} labelStyle={[styling.text, colorStyle, labelStyle]}>
        {label}
      </Button>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  compactContent: {
    height: 34,
  },
  defaultContent: {
    height: 42,
  },
  text: {
    fontWeight: '500',
    letterSpacing: 0.25,
    fontSize: 15,
  },
})

DefaultButton.propTypes = {
  theme: PropTypes.any,
  label: PropTypes.any,
  t: PropTypes.any,
  size: PropTypes.any,
  mode: PropTypes.any,
}

DefaultButton.defaultProps = {
  mode: 'contained',
  size: 'default',
  labelStyle: {},
}

export default withTranslation()(withTheme(DefaultButton))
