import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Line } from 'react-native-svg'

const Reject = ({ fill = '#333' }) => (
  <Svg height={44} width={44} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
			<Path d="M11,13 c-2.824,0-5.329,0.638-6.975,1.193C2.81,14.604,2,15.749,2,17.032V21c0,0,9.958,0,10,0" fill="none" stroke={fill}/>
			<Path d="M11,13L11,13 c-2.761,0-5-3.239-5-6V6c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C16,9.761,13.761,13,11,13z" fill="none" stroke={fill}/>
			<Line fill="none" x1="22" x2="16" y1="16" y2="22"/>
			<Line fill="none" x1="16" x2="22" y1="16" y2="22"/>
    </G>
  </Svg>
)

Reject.propTypes = {
  fill: PropTypes.string,
}

export default Reject
