import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Polyline } from 'react-native-svg'

const Refresh = ({ fill = '#333' }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Path d="M2,12C2,6.5,6.5,2,12,2 c3.9,0,7.3,2.2,8.9,5.5" fill="none" stroke={fill} />
      <Path d="M22,12c0,5.5-4.5,10-10,10 c-3.9,0-7.3-2.2-8.9-5.5" fill="none" />
      <Polyline points="21.8,1.7 21,7.6 15,6.8 " fill="none" stroke={fill} />
      <Polyline points=" 2.2,22.3 3,16.4 9,17.2 " fill="none" />
    </G>
  </Svg>
)

Refresh.propTypes = {
  fill: PropTypes.string,
}

export default Refresh
