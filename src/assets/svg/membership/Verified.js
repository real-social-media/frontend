import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Verified = ({ fill = '#333' }) => (
  <Svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" transform="translate(.5 .5)">
      <Path
        d="m11 13c-2.824 0-5.329.638-6.975 1.193-1.215.411-2.025 1.556-2.025 2.839v3.968h8"
        stroke={fill}
        strokeLinecap="butt"
      />
      <Path
        d="m11 13c-2.761 0-5-3.239-5-6v-1c0-2.761 2.239-5 5-5 2.761 0 5 2.239 5 5v1c0 2.761-2.239 6-5 6z"
        stroke={fill}
      />
      <Path d="m15 20 2 2 5-5" />
    </G>
  </Svg>
)

Verified.propTypes = {
  fill: PropTypes.string,
}

export default Verified
