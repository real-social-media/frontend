import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Bubble = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Path
        d="M20.4,16.8 C22,15.2,23,13.2,23,11c0-5-4.9-9-11-9S1,6,1,11c0,5,4.9,9,11,9c1.1,0,2.1-0.1,3.1-0.4L21,22L20.4,16.8z"
        fill="none"
        stroke={fill}
      />
    </G>
  </Svg>
)

Bubble.propTypes = {
  fill: PropTypes.string,
}

export default Bubble
