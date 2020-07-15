import React from 'react'
import Svg, { G, Line, Circle } from 'react-native-svg'

const Info = ({ fill = '#333', style = {} }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="3">
      <Line fill="none" stroke="#111111" x1="19.8" x2="4.2" y1="4.2" y2="19.8" />
			<Circle cx="12" cy="12" fill="none" r="11" stroke="#111111" />
    </G>
  </Svg>
)

export default Info
