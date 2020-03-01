import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Empty = ({
  theme,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <Text style={styling.text}>{t('seems to be empty')}</Text>
    </View>
  )
}

Empty.propTypes = {
  theme: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    opacity: 0.4,
    color: theme.colors.text,
    textAlign: 'center',
  },
})

export default withTheme(Empty)
