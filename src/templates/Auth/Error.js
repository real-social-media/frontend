import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'
import CloseIcon from 'assets/svg/post/Close'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Error = ({
  t,
  theme,
  text,
  onClose,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.content}>
        <Text style={styling.text}>{text}</Text>
      </View>
      <TouchableOpacity style={styling.action} onPress={onClose}>
        <CloseIcon fill="#ffffff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'red',
    padding: theme.spacing.base,
    flexDirection: 'row',
    zIndex: 2,
  },
  content: {
    flex: 1,
  },
  text: {
    fontWeight: '500',
    color: '#ffffff',
  },
})

Error.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  text: PropTypes.any,
  onClose: PropTypes.any,
}

export default withTranslation()(withTheme(Error))
