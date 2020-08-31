import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line, Polyline } from 'react-native-svg'

const Direct = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Line fill="none" x1="12" x2="12" y1="2" y2="16" />
      <Polyline fill="none" points="8 6 12 2 16 6" />
      <Polyline fill="none" points="17 10 21 10 21 23 3 23 3 10 7 10" stroke={fill} />
    </G>
  </Svg>
)

Direct.propTypes = {
  fill: PropTypes.string,
}

export default Direct
