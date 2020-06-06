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
import { withTranslation } from 'react-i18next'

const Subtitle = ({
  t,
  theme,
  actions,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.action}>
        {actions.map((action, key) => (
          <View style={styling.actionItem} key={key}>
            <TouchableOpacity onPress={action.onPress} disabled={!action.onPress}>
              {!action.active ?
                <Text style={styling.text}>{action.title}</Text>
              : null}

              {action.active ?
                <Text style={[styling.active, styling.text]}>{action.title}</Text>
              : null}
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
  active: {
    color: theme.colors.primary,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  text: {
    textAlign: 'center',
  },
})

export default withTranslation()(withTheme(Subtitle))
