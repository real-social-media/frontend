import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line, Circle, Polyline } from 'react-native-svg'

const FlashOff = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Line fill="none" x1="16.172" x2="21.828" y1="16.172" y2="21.828" />
      <Circle cx="19" cy="19" fill="none" r="4" />
      <Polyline fill="none" points="18 12.2 20 10 11 10 12 3 2 14 11 14 10 21 12 18.8" stroke={fill} />
    </G>
  </Svg>
)

FlashOff.propTypes = {
  fill: PropTypes.string,
}

export default FlashOff
