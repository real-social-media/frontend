import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line, Polyline } from 'react-native-svg'

const Text = ({ fill = '#333' }) => (
  <Svg height={36} width={36} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="2,4 2,1 22,1 22,4 " stroke={fill} />
      <Line fill="none" stroke={fill} x1="12" x2="12" y1="1" y2="23" />
      <Line fill="none" stroke={fill} x1="7" x2="17" y1="23" y2="23" />
    </G>
  </Svg>
)

Text.propTypes = {
  fill: PropTypes.string,
}

export default Text
