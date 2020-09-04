import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Circle } from 'react-native-svg'

const Theme = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Path d="M1,12c0-3.7,1.8-7,4.7-9 c1-0.7,2.7-0.9,3.3,0c1,1.2-0.8,3,0,4c2,2.4,6.1-2.3,11,0c3.5,1.8,3,6.3,2.6,8c-1.3,4.6-5.6,8-10.6,8C5.9,23,1,18.1,1,12z" fill="none" stroke={fill}/>
      <Circle cx="17" cy="12" fill="none" r="2"/>
      <Circle cx="5" cy="12" fill="none" r="1"/>
      <Circle cx="7.5" cy="17" fill="none" r="1"/>
      <Circle cx="13" cy="19" fill="none" r="1"/>
    </G>
  </Svg>
)

Theme.propTypes = {
  fill: PropTypes.string,
}

export default Theme
