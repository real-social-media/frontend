import React from 'react'
import Svg, { G, Polyline } from 'react-native-svg'

const Close = ({ fill = '#333' }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="3">
      <Polyline fill="none" points="2,7 12,17 22,7 " stroke={fill} transform="translate(0, 0)"/>
    </G>
  </Svg>
)

export default Close
