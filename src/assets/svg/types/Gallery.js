import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line, Rect, Polygon, Circle } from 'react-native-svg'

const Gallery = ({ fill = '#333' }) => (
  <Svg height={36} width={36} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Rect height="18" width="22" fill="none" stroke={fill} x="1" y="5" />
      <Line fill="none" x1="6" x2="18" y1="1" y2="1" />
      <Polygon fill="none" points="6 19 15 11 19 19 6 19" />
      <Circle cx="7" cy="10" r="2" stroke="none" />
    </G>
  </Svg>
)

Gallery.propTypes = {
  fill: PropTypes.string,
}

export default Gallery
