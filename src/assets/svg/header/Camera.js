import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Circle, Path } from 'react-native-svg'

const Camera = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Circle cx="12" cy="13" fill="none" r="4"/>
      <Path d="M21,22H3a2,2,0,0,1-2-2V7A2,2,0,0,1,3,5H7L9,2h6l2,3h4a2,2,0,0,1,2,2V20A2,2,0,0,1,21,22Z" fill="none" stroke={fill}/>
    </G>
  </Svg>
)

Camera.propTypes = {
  fill: PropTypes.string,
}

export default Camera
