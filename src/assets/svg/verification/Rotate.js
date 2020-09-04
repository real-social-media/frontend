import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Rect, Polyline, Circle, Path, Polygon } from 'react-native-svg'

const Rotate = ({ fill = '#333' }) => (
  <Svg height={28} width={28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="11,23 17,16 22,19 " stroke={fill}/>
			<Rect height="12" width="15" fill="none" stroke={fill} x="7" y="11"/>
			<Circle cx="11" cy="15" fill={fill} r="1" stroke="none" strokeLinecap="square"/>
			<Path d="M9,4H6 C3.239,4,1,6.239,1,9v3" fill="none"/>
			<Polygon fill="none" points=" 9,6 12,4 9,2 "/>
			<Polygon points="9,6 12,4 9,2 " stroke="none" strokeLinecap="square"/>
    </G>
  </Svg>
)

Rotate.propTypes = {
  fill: PropTypes.string,
}

export default Rotate
