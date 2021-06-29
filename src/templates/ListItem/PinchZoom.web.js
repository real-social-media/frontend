import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

const PinchZoom = ({ children, style }) => <View style={style}>{children}</View>

PinchZoom.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
}

export default PinchZoom
