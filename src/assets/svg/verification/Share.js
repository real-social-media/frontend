import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line, Path } from 'react-native-svg'

const Share = ({ fill = '#333' }) => (
  <Svg height={28} width={28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="square" strokeWidth="1.5">
      <Path d="M11.5,5.5l2.075-2.075a5.011,5.011,0,0,1,7,0h0a5.011,5.011,0,0,1,0,7L18.5,12.5" fill="none" stroke={fill}/>
			<Path d="M12.5,18.5l-2.075,2.075a5.011,5.011,0,0,1-7,0h0a5.011,5.011,0,0,1,0-7L5.5,11.5" fill="none" stroke={fill}/>
			<Line fill="none" x1="8" x2="9" y1="16" y2="15"/>
			<Line fill="none" x1="15" x2="16" y1="9" y2="8"/>
			<Line fill="none" x1="2" x2="22" y1="2" y2="22"/>
    </G>
  </Svg>
)

Share.propTypes = {
  fill: PropTypes.string,
}

export default Share
