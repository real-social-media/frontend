import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Circle } from 'react-native-svg'

const Unchecked = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Circle cx="12" cy="12" fill="none" r="11" stroke={fill} />
    </G>
  </Svg>
)

Unchecked.propTypes = {
  fill: PropTypes.string,
}

export default Unchecked
