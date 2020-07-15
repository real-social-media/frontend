import React from 'react'
import Svg, { G, Polyline } from 'react-native-svg'

const Back = ({ fill = '#333', style = {} }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="17,2 7,12 17,22 " stroke={fill} transform="translate(0, 0)"/>
    </G>
  </Svg>
)

export default Back
