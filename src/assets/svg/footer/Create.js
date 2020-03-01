import React from 'react'
import Svg, { G, Circle, Line } from 'react-native-svg'

const Create = ({ fill = '#333', style = {} }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Line fill="none" x1="12" x2="12" y1="7" y2="17"/>
      <Line fill="none" x1="17" x2="7" y1="12" y2="12"/>
      <Circle cx="12" cy="12" fill="none" r="11" stroke={fill}/>
    </G>
  </Svg>
)

export default Create
