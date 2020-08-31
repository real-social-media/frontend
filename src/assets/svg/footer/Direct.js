import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Heart = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Path
        d="M7.799,16.601 C9.092,18.61,11.826,20,15,20c0.59,0,1.163-0.051,1.716-0.142L21,22v-4.04c1.241-1.057,2-2.44,2-3.96 c0-1.552-0.792-2.961-2.081-4.027"
        fill="none"
      />
      <Path
        d="M11,1C5.477,1,1,4.582,1,9 c0,1.797,0.75,3.45,2,4.785V19l4.833-2.416C8.829,16.85,9.892,17,11,17c5.523,0,10-3.582,10-8S16.523,1,11,1z"
        fill="none"
        stroke={fill}
      />
    </G>
  </Svg>
)

Heart.propTypes = {
  fill: PropTypes.string,
}

export default Heart
