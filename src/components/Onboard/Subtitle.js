import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Subtitle = ({
  theme,
  actions,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  
  return (
    <View style={styling.root}>
      <View style={styling.action}>
        {actions.map((action, key) => (
          <View style={styling.actionItem} key={key}>
            <TouchableOpacity onPress={action.onPress} disabled={!action.onPress}>
              <Text style={styling.text}>{action.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  )
}

Subtitle.propTypes = {
  theme: PropTypes.any,
  actions: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  action: {
    marginVertical: 18,
  },
  actionItem: {
    padding: 12,
  },
  text: {
    textAlign: 'center',
  },
})

export default withTheme(Subtitle)
