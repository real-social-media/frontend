import React from 'react'
import Svg, { G, Line, Polygon } from 'react-native-svg'

const Text = ({ fill = '#333', style = {} }) => (
  <Svg height={36} width={36} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Line fill="none" x1="19" x2="15" y1="9" y2="5"/>
      <Polygon fill="none" points="7,21 2,22 3,17 18,2 22,6 " stroke={fill}/>
    </G>
  </Svg>
)

export default Text
