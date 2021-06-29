import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Circle } from 'react-native-svg'

const Password = ({ fill = '#333' }) => (
  <Svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" transform="translate(.5 .5)">
      <Path d="m3 11h18v12h-18z" stroke={fill} />
      <Circle cx="12" cy="17" r="2" />
      <Path
        d="m17 11v-5a4.951 4.951 0 0 0 -4.9-5h-.1a4.951 4.951 0 0 0 -5 4.9v5.1"
        stroke={fill}
        strokeLinecap="butt"
      />
    </G>
  </Svg>
)

Password.propTypes = {
  fill: PropTypes.string,
}

export default Password
