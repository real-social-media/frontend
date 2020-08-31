import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polyline } from 'react-native-svg'

const Left = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="17,2 7,12 17,22 " stroke={fill} transform="translate(0, 0)" />
    </G>
  </Svg>
)

Left.propTypes = {
  fill: PropTypes.string,
}

export default Left
