import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Circle } from 'react-native-svg'

const More = ({ fill = '#333' }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Circle cx="12" cy="12" fill={fill} r="2" />
      <Circle cx="3" cy="12" fill={fill} r="2" />
      <Circle cx="21" cy="12" fill={fill} r="2" />
    </G>
  </Svg>
)

More.propTypes = {
  fill: PropTypes.string,
}

export default More
