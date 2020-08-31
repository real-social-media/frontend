import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polyline } from 'react-native-svg'

const Up = ({ fill = '#333' }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="3">
      <Polyline fill="none" points="22,17 12,7 2,17 " stroke={fill} transform="translate(0, 0)" />
    </G>
  </Svg>
)

Up.propTypes = {
  fill: PropTypes.string,
}

export default Up
