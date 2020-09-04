import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Polyline, Path } from 'react-native-svg'

const Photo = ({ fill = '#333' }) => (
  <Svg height={22} width={22} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
    <Polyline fill="none" points=" 5,1 2,1 2,4 "/>
		<Polyline fill="none" points=" 2,11 2,14 5,14 "/>
		<Polyline fill="none" points=" 19,14 22,14 22,11 "/>
		<Polyline fill="none" points=" 22,4 22,1 19,1 "/>
		<Path d="M12,13L12,13 c-2.761,0-5-2.239-5-5V7c0-2.761,2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C17,10.761,14.761,13,12,13z" fill="none" stroke={fill}/>
		<Path d="M22,21.805 c0-1.805-1.205-3.379-2.945-3.86C17.316,17.464,14.89,17,12,17s-5.316,0.464-7.055,0.945C3.205,18.427,2,20,2,21.805V23h20V21.805z" fill="none" stroke={fill}/>
    </G>
  </Svg>
)

Photo.propTypes = {
  fill: PropTypes.string,
}

export default Photo
