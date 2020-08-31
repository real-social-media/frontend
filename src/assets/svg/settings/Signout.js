import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polyline, Line } from 'react-native-svg'

const Signout = ({ fill = '#333' }) => (
  <Svg height={22} width={22} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Line fill="none" x1="11" x2="22" y1="10" y2="10" />
      <Polyline fill="none" points="18 6 22 10 18 14" />
      <Polyline fill="none" points="13 13 13 17 8 17" stroke={fill} />
      <Polyline fill="none" points="1 2 8 7.016 8 22 1 17 1 2 13 2 13 7" stroke={fill} />
    </G>
  </Svg>
)

Signout.propTypes = {
  fill: PropTypes.string,
}

export default Signout
