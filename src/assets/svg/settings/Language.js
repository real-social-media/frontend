import React from 'react'
import Svg, { G, Path, Circle } from 'react-native-svg'

const Language = ({ fill = '#333', style = {} }) => (
  <Svg height={22} width={22} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Path d="M10.542,2.481A6,6,0,0,0,16,6a5.985,5.985,0,0,0,4.243-1.757" fill="none" stroke={fill}/>
      <Path d="M3,8S5,6,7,6c2.481,0,4,1,4,3,0,2.209-2.791,4-5,4H7a4.854,4.854,0,0,1,5,5c0,2.209-2,4-5,4s-6-3-6-7" fill="none" stroke={fill}/>
      <Path d="M15,16c0,2,1,4,3.479,4s4.5-2.462,4.5-5.5S21.485,9,19,9c-4.479,0-2,5-9,4" fill="none" stroke={fill}/>
      <Circle cx="14.5" cy="1.5" fill={fill} r="1.5" stroke="none"/>
    </G>
  </Svg>
)

export default Language
