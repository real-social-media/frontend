import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polyline } from 'react-native-svg'

const Tick = ({ fill = '#333' }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="2,12 9,19 22,6 " stroke={fill}/>
    </G>
  </Svg>
)

Tick.propTypes = {
  fill: PropTypes.string,
}

export default Tick
