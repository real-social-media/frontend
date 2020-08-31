import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Line } from 'react-native-svg'

const Delete = ({ fill = '#333' }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Path d="M20,9l-.867,12.142A2,2,0,0,1,17.138,23H6.862a2,2,0,0,1-1.995-1.858L4,9" fill="none" stroke={fill} />
      <Line fill="none" x1="1" x2="23" y1="5" y2="5" />
      <Path d="M8,5V2A1,1,0,0,1,9,1h6a1,1,0,0,1,1,1V5" fill="none" />
    </G>
  </Svg>
)

Delete.propTypes = {
  fill: PropTypes.string,
}

export default Delete
