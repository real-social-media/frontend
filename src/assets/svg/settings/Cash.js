import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polyline, Path, Ellipse, Circle } from 'react-native-svg'

const Cash = ({ fill = '#333' }) => (
  <Svg height={22} width={22} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="7,13 1,13 1,1 19,1 19,9.171 " />
      <Path d="M11,12v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4" fill="none" stroke={fill} />
      <Path d="M11,16v4c0,1.657,2.686,3,6,3 s6-1.343,6-3v-4" fill="none" stroke={fill} />
      <Ellipse cx="17" cy="12" fill="none" rx="6" ry="3" stroke={fill} />
      <Circle cx="10" cy="7" fill="none" r="1" />
      <Circle cx="10" cy="7" r="1" stroke="none" strokeLinecap="square" />
    </G>
  </Svg>
)

Cash.propTypes = {
  fill: PropTypes.string,
}

export default Cash
