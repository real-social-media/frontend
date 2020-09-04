import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Text } from 'react-native-paper'
import CloseIcon from 'assets/svg/post/Close'

const Error = ({
  text,
  onClose,
}) => {
  const styling = styles

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

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'red',
    padding: 12,
    flexDirection: 'row',
    zIndex: 2,
    minHeight: 90,

  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  action: {
    justifyContent: 'flex-end',
  },
  text: {
    fontWeight: '500',
    color: '#ffffff',
  },
})

Error.propTypes = {
  text: PropTypes.any,
  onClose: PropTypes.any,
}

export default Error
