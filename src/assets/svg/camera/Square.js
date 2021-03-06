import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Rect } from 'react-native-svg'

const Square = ({ fill = '#ffffff' }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="2">
      <Rect height="14" width="14" fill="none" x="5" y="5"/>
    </G>
  </Svg>
)

Square.propTypes = {
  fill: PropTypes.string,
}

export default Square
