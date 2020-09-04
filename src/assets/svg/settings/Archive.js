import React from 'react'
import PropTypes from 'prop-types'
import Svg, { Rect, Line, Polyline, G } from 'react-native-svg'

const User = ({ fill = '#333' }) => (
  <Svg height={22} width={22} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Rect height="14" width="20" fill="none" stroke={fill} x="2" y="9"/>
      <Line fill="none" x1="5" x2="19" y1="5" y2="5" stroke={fill}/>
      <Line fill="none" x1="8" x2="16" y1="1" y2="1" stroke={fill}/>
      <Polyline fill="none" points="16 14 16 16 8 16 8 14" stroke={fill}/>
    </G>
  </Svg>
)

User.propTypes = {
  fill: PropTypes.string,
}

export default User
