import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line, Polyline } from 'react-native-svg'

const Crop = ({ fill = '#333' }) => (
  <Svg height={28} width={28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Line fill="none" x1="6" x2="6" y1="1" y2="7" />
      <Line fill="none" stroke={fill} x1="18" x2="18" y1="21" y2="23" />
      <Polyline fill="none" points="1,7 18,7 18,17 " stroke={fill} />
      <Polyline fill="none" points=" 6,11 6,17 23,17 " />
    </G>
  </Svg>
)

Crop.propTypes = {
  fill: PropTypes.string,
}

export default Crop
