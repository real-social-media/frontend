import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line, Polygon } from 'react-native-svg'

const Diamond = ({ fill = '#333' }) => (
  <Svg height={22} width={22} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Line fill="none" x1="7" x2="17" y1="7" y2="7"/>
      <Polygon fill="none" points="22,7 12,21 2,7 6,2 18,2 " stroke={fill}/>
    </G>
  </Svg>
)

Diamond.propTypes = {
  fill: PropTypes.string,
}

export default Diamond
