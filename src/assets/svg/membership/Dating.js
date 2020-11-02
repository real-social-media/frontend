import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Circle } from 'react-native-svg'

const Dating = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
			<Path d="M10,21.836 c0-0.604-0.265-1.179-0.738-1.554C8.539,19.708,7.285,19,5.5,19s-3.039,0.708-3.762,1.282C1.265,20.657,1,21.232,1,21.836V23h9 V21.836z" fill="none" stroke={fill}/>
			<Circle cx="5.5" cy="13.5" fill="none" r="2.5" stroke={fill}/>
			<Path d="M23,21.836 c0-0.604-0.265-1.179-0.738-1.554C21.539,19.708,20.285,19,18.5,19s-3.039,0.708-3.762,1.282C14.265,20.657,14,21.232,14,21.836V23 h9V21.836z" fill="none" stroke={fill}/>
			<Circle cx="18.5" cy="13.5" fill="none" r="2.5" stroke={fill}/>
			<Path d=" M15.361,1.631C14.388,0.67,12.764,0.827,12,1.964c-0.765-1.138-2.389-1.293-3.361-0.333c-0.852,0.842-0.852,2.207,0,3.048L12,8 l3.361-3.321C16.213,3.838,16.213,2.473,15.361,1.631z" fill="none"/>
    </G>
  </Svg>
)

Dating.propTypes = {
  fill: PropTypes.string,
}

export default Dating
