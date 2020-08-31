import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Circle, Line, Path } from 'react-native-svg'

const Search = ({ fill = '#F9F9F9' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="square" strokeWidth="2">
      <Line fill="none" x1="22" x2="18" y1="22" y2="18" />
      <Circle cx="10" cy="10" fill="none" r="8" stroke={fill} />
      <Path d="M6,10a4,4,0,0,1,4-4" fill="none" strokeLinecap="butt" />
    </G>
  </Svg>
)

Search.propTypes = {
  fill: PropTypes.string,
}

export default Search
