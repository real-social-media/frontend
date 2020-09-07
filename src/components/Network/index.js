import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Text } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Network = ({
  t,
  networkIsConnected,
}) => {
  const styling = styles

  if (networkIsConnected) {
    return null
  }

  return (
    <View style={styling.root}>
      <View style={styling.component}>
        <View style={styling.badge} />
        <View style={styling.content}>
          <Text style={styling.text}>{t('You are not connected to your network')}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: ifIphoneX(94, 60),
    left: 12,
    right: 12,
    zIndex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  component: {
    flexDirection: 'row',
    backgroundColor: '#222f3e',
  },
  badge: {
    width: 8,
    height: '100%',
    backgroundColor: '#ee5253',
  },
  content: {
    padding: 12,
  },
  text: {
    color: '#ffffff',
  },
})

Network.propTypes = {
  t: PropTypes.any,
  networkIsConnected: PropTypes.bool,
}

Network.defaultProps = {
  networkIsConnected: true,
}

export default withTranslation()(Network)
