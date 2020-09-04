import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Circle, Line } from 'react-native-svg'

const Refresh = ({ fill = '#333' }) => (
  <Svg height={9} width={9} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="3">
      <Circle cx="12" cy="12" fill="none" r="11" stroke={fill}/>
      <Line fill="none" x1="12" x2="12" y1="11" y2="17"/>
      <Circle cx="12" cy="7" r="1" stroke="none"/>
    </G>
  </Svg>
)

Refresh.propTypes = {
  fill: PropTypes.string,
}

export default Refresh
