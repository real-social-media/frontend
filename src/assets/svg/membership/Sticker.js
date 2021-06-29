import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Sticker = ({ fill = '#333' }) => (
  <Svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" transform="translate(.5 .5)">
      <Path d="m22.835 10.165a10.994 10.994 0 1 0 -12.67 12.67z" />
      <Path d="m22.835 10.165a10.941 10.941 0 0 0 -12.67 12.67" strokeLinecap="butt" />
    </G>
  </Svg>
)

Sticker.propTypes = {
  fill: PropTypes.string,
}

export default Sticker
