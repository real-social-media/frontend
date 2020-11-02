import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line, Ellipse } from 'react-native-svg'

const Support = ({ fill = '#333' }) => (
  <Svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="square" strokeWidth="1.5">
      <Line fill="none" strokeLinecap="butt" x1="19.778" x2="15.536" y1="4.222" y2="8.464"/>
      <Line fill="none" strokeLinecap="butt" x1="19.778" x2="15.536" y1="19.778" y2="15.536"/>
      <Line fill="none" strokeLinecap="butt" x1="4.222" x2="8.464" y1="19.778" y2="15.536"/>
      <Line fill="none" strokeLinecap="butt" x1="4.222" x2="8.464" y1="4.222" y2="8.464"/>
      <Ellipse cx="12" cy="12" fill="none" rx="11" ry="11" stroke={fill} transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.9706 12)"/>
      <Ellipse cx="12" cy="12" fill="none" rx="5" ry="5" stroke={fill} transform="matrix(0.7071 -0.7071 0.7071 0.7071 -4.9706 12)"/>
    </G>
  </Svg>
)

Support.propTypes = {
  fill: PropTypes.string,
}

export default Support
