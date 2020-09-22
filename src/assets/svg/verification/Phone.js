import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Circle, Path } from 'react-native-svg'

const Phone = ({ fill = '#333' }) => (
  <Svg height={28} width={28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Circle cx="12" cy="5" r="1" stroke="none"/>
			<Path d="M18,23H6a2,2,0,0,1-2-2V3A2,2,0,0,1,6,1H18a2,2,0,0,1,2,2V21A2,2,0,0,1,18,23Z" fill="none" stroke={fill}/>
    </G>
  </Svg>
)

Phone.propTypes = {
  fill: PropTypes.string,
}

export default Phone
