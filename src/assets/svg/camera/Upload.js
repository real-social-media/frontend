import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Rect, Polygon, Circle } from 'react-native-svg'

const Upload = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Rect height="20" width="20" fill="none" stroke={fill} x="2" y="2" />
      <Polygon points="5 17 8 12 11 15 15 9 19 17 5 17" stroke="none" />
      <Circle cx="9.5" cy="7.5" r="1.5" stroke="none" />
    </G>
  </Svg>
)

Upload.propTypes = {
  fill: PropTypes.string,
}

export default Upload
