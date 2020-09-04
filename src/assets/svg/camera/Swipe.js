import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Polyline } from 'react-native-svg'

const Swipe = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Path d="M6,22V7 c0-2.76142,2.23857-5,5-5h0" fill="none"/>
      <Polyline fill="none" points=" 2,18 6,22 10,18 "/>
      <Path d="M22.55594,0.99996L12.38564,8.71078 c-1.54033,1.16784-1.8423,3.36324-0.67447,4.90357l0,0.00001c1.16784,1.54033,3.36324,1.8423,4.90357,0.67447l6.38567-4.84142" fill="none" stroke={fill}/>
    </G>
  </Svg>
)

Swipe.propTypes = {
  fill: PropTypes.string,
}

export default Swipe
