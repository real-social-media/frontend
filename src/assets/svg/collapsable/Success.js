import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polyline } from 'react-native-svg'

const Success = ({ fill = '#333' }) => (
  <Svg height={26} width={26} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2.5">
      <Polyline fill="none" points=" 8,14 12,18 20,10 "/>
    </G>
  </Svg>
)

Success.propTypes = {
  fill: PropTypes.string,
}

export default Success
