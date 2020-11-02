import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polygon, Line, Polyline } from 'react-native-svg'

const Diamond = ({ fill = '#333' }) => (
  <Svg height="64" width="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
		<G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
			<Line fill="none" x1="3" x2="61" y1="22" y2="22" />
			<Polyline fill="none" points="32,60 42,22 32,5 " />
			<Polyline fill="none" points="32,5 22,22 32,60 " />
			<Line fill="none" x1="13" x2="22" y1="5" y2="22" />
			<Line fill="none" x1="51" x2="42" y1="5" y2="22" />
			<Polygon fill="none" points="61,22 32,60 3,22 13,5 51,5 " stroke={fill} />
		</G>
	</Svg>
)

Diamond.propTypes = {
  fill: PropTypes.string,
}

export default Diamond
