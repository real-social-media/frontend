import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Circle, Polygon, Polyline, Path } from 'react-native-svg'

const User = ({ fill = '#333' }) => (
  <Svg height={22} width={22} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Circle cx="17.5" cy="18.5" fill="none" r="3.5"/>
      <Circle cx="6.5" cy="18.5" fill="none" r="3.5"/>
      <Polygon fill="none" points="3 12 21 12 18 8 6 8 3 12" stroke={fill}/>
      <Polyline fill="none" points="6 8 7 2 17 2 18 8" stroke={fill}/>
      <Path d="M14.1,17.713a3.437,3.437,0,0,0-4.192,0" fill="none"/>
    </G>
  </Svg>
)

User.propTypes = {
  fill: PropTypes.string,
}

export default User
