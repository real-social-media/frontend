import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polyline } from 'react-native-svg'

const Right = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="7,2 17,12 7,22 " stroke={fill} transform="translate(0, 0)"/>
    </G>
  </Svg>
)

Right.propTypes = {
  fill: PropTypes.string,
}

export default Right
