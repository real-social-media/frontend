import React from 'react'
import Svg, { G, Path, Line } from 'react-native-svg'

const Pending = ({ fill = '#333', style = {} }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1">
      <Path d="M15,11L15,11 c-2.209,0-4-1.791-4-4V5c0-2.209,1.791-4,4-4h0c2.209,0,4,1.791,4,4v2C19,9.209,17.209,11,15,11z" fill="none" stroke={fill}/>
      <Line fill="none" x1="4" x2="4" y1="7" y2="13"/>
      <Line fill="none" x1="1" x2="7" y1="10" y2="10"/>
      <Path d="M23,23H7v-4.114 c0-1.247,0.765-2.363,1.931-2.805C10.318,15.555,12.399,15,15,15s4.682,0.555,6.069,1.081C22.235,16.522,23,17.639,23,18.886V23z" fill="none" stroke={fill}/>
    </G>
  </Svg>
)

export default Pending