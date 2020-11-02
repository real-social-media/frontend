import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Dating = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
			<Path d="M17,1c-2.1,0-3.9,1.1-5,2.7 C10.9,2.1,9.1,1,7,1C3.7,1,1,3.7,1,7c0,6,11,15,11,15s11-9,11-15C23,3.7,20.3,1,17,1z" fill="none" stroke={fill}/>
    </G>
  </Svg>
)

Dating.propTypes = {
  fill: PropTypes.string,
}

export default Dating
