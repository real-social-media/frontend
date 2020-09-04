import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Circle, Path } from 'react-native-svg'

const Camera = ({ fill = '#333' }) => (
  <Svg height={28} width={28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Circle cx="10" cy="9" r="2" stroke="none"/>
			<Path d="M10,12a4,4,0,0,0-4,4h8A4,4,0,0,0,10,12Z" stroke="none"/>
			<Path d="M9.5,16H2a1,1,0,0,1-1-1V5A1,1,0,0,1,2,4h9.5" fill="none" stroke={fill}/>
			<Path d="M22,3,17,1H11.5a1.5,1.5,0,0,0,0,3H15l4,2v8a2,2,0,0,1-2,2H9.5a1.5,1.5,0,0,0-.26,2.974L15,20l3,2" fill="none" stroke={fill}/>
    </G>
  </Svg>
)

Camera.propTypes = {
  fill: PropTypes.string,
}

export default Camera
