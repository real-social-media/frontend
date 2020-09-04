import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Circle, Line } from 'react-native-svg'

const Lock = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="3">
      <Path d="M7,11.1V6c0-2.8,2.2-5,5-5h0 c2.8,0,5,2.2,5,5v5.1" fill="none" stroke={fill}/>
      <Circle cx="12" cy="16" fill="none" r="7" stroke={fill}/>
      <Circle cx="12" cy="15" fill="none" r="2"/>
      <Line fill="none" x1="12" x2="12" y1="17" y2="19"/>
    </G>
  </Svg>
)

Lock.propTypes = {
  fill: PropTypes.string,
}

export default Lock
