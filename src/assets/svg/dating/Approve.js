import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Approve = ({ fill = '#333' }) => (
  <Svg height={44} width={44} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
			<Path d="M11,13 c-2.824,0-5.329,0.638-6.975,1.193C2.81,14.604,2,15.749,2,17.032V21c0,0,9.958,0,10,0" fill="none" stroke={fill}/>
			<Path d="M11,13L11,13 c-2.761,0-5-3.239-5-6V6c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C16,9.761,13.761,13,11,13z" fill="none" stroke={fill}/>
			<Path d=" M22.361,15.631c-0.973-0.961-2.597-0.804-3.361,0.333c-0.765-1.138-2.389-1.293-3.361-0.333c-0.852,0.842-0.852,2.207,0,3.048L19,22 l3.361-3.321C23.213,17.838,23.213,16.473,22.361,15.631z" fill="none"/>
    </G>
  </Svg>
)

Approve.propTypes = {
  fill: PropTypes.string,
}

export default Approve
