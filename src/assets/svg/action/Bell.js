import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Bell = ({ fill = '#333' }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Path
        d="M19,11V8A7,7,0,0,0,5,8v3c0,3.3-3,4.1-3,6,0,1.7,3.9,3,10,3s10-1.3,10-3C22,15.1,19,14.3,19,11Z"
        fill="none"
        stroke={fill}
      />
      <Path
        d="M12,22c-1.011,0-1.961-.034-2.855-.1a2.992,2.992,0,0,0,5.71,0C13.961,21.966,13.011,22,12,22Z"
        stroke="none"
      />
    </G>
  </Svg>
)

Bell.propTypes = {
  fill: PropTypes.string,
}

export default Bell
