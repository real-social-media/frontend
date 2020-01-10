import React from 'react'
import Svg, { G, Line } from 'react-native-svg'

const Close = ({ fill = '#333', style = {} }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Line fill="none" stroke={fill} x1="19" x2="5" y1="5" y2="19"/>
      <Line fill="none" stroke={fill} x1="19" x2="5" y1="19" y2="5"/>
    </G>
  </Svg>
)

export default Close
