import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Diamond = ({ fill = '#333' }) => (
  <Svg height="22" viewBox="0 0 24 22" width="24" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fill-rule="evenodd" stroke={fill} transform="translate(1 1)">
      <Path d="m0 6.44827586h22" />
      <Path d="m11 20.862069 3.7931034-14.41379314-3.7931034-6.44827586" />
      <Path d="m11 0-3.79310345 6.44827586 3.79310345 14.41379314" />
      <Path d="m3.79310345 0 3.4137931 6.44827586" />
      <Path d="m18.2068966 0-3.4137932 6.44827586" />
      <Path d="m22 6.44827586-11 14.41379314-11-14.41379314 3.79310345-6.44827586h14.41379315z" />
    </G>
  </Svg>
)

Diamond.propTypes = {
  fill: PropTypes.string,
}

export default Diamond
