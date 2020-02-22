import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Button, Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const DefaultButton = ({
  theme,
  label,
  size,
  mode,
  ...props
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const contentStyle = (size === 'compact') ? styling.compactContent : styling.defaultContent
  const colorStyle = (mode === 'contained') ? { color: theme.colors.buttonText } : {}

  return (
    <View style={styling.root}>
      <Button {...props} contentStyle={contentStyle} uppercase={false} compact mode={mode} labelStyle={[styling.text, colorStyle]}>
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
  },
})

DefaultButton.propTypes = {
  theme: PropTypes.any,
  label: PropTypes.any,
}

DefaultButton.defaultProps = {
  mode: 'contained',
  size: 'default',
}

export default withTheme(DefaultButton)
