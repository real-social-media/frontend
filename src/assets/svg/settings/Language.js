import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polyline, Line } from 'react-native-svg'

const Language = ({ fill = '#333' }) => (
  <Svg height={22} width={22} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="3,1 21,1 21,13 3,13 " stroke={fill}/>
      <Line fill="none" x1="3" x2="3" y1="1" y2="23"/>
    </G>
  </Svg>
)

Language.propTypes = {
  fill: PropTypes.string,
}

export default Language
