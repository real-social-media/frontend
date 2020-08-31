import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Polyline } from 'react-native-svg'

const Like = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Polyline fill="none" points="6 23 1 23 1 12 6 12" />
      <Path
        d="M6,12,9,1H9a3,3,0,0,1,3,3v6h7.5a3,3,0,0,1,2.965,3.456l-1.077,7A3,3,0,0,1,18.426,23H6Z"
        fill="none"
        stroke={fill}
      />
    </G>
  </Svg>
)

Like.propTypes = {
  fill: PropTypes.string,
}

export default Like
