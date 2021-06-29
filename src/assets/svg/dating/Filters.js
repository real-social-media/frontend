import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Circle, Path } from 'react-native-svg'

const Filters = ({ fill = '#333' }) => (
  <Svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit="10">
      <Path d="m14.5 4.5h9" stroke={fill} />
      <Path d="m1.5 4.5h3" stroke={fill} />
      <Path d="m22.5 12.5h1" />
      <Path d="m1.5 12.5h11" />
      <G stroke={fill}>
        <Path d="m14.5 20.5h9" />
        <Path d="m1.5 20.5h3" />
        <Circle cx="7.5" cy="4.5" r="3" />
      </G>
      <Circle cx="15.5" cy="12.5" r="3" />
      <Circle cx="7.5" cy="20.5" r="3" stroke={fill} />
    </G>
  </Svg>
)

Filters.propTypes = {
  fill: PropTypes.string,
}

export default Filters
