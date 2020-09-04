import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line, Polyline } from 'react-native-svg'

const Next = ({ fill = '#ffffff' }) => (
  <Svg height={14} width={14} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="3">
      <Line fill="none" x1="2" x2="22" y1="12" y2="12"/>
      <Polyline fill="none" points="15,5 22,12 15,19 " stroke={fill}/>
    </G>
  </Svg>
)

Next.propTypes = {
  fill: PropTypes.string,
}

export default Next
