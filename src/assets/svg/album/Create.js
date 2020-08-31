import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line } from 'react-native-svg'

const Create = ({ fill = '#333' }) => (
  <Svg height={42} width={42} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="3">
      <Line fill="none" stroke={fill} x1="12" x2="12" y1="2" y2="22" />
      <Line fill="none" stroke={fill} x1="22" x2="2" y1="12" y2="12" />
    </G>
  </Svg>
)

Create.propTypes = {
  fill: PropTypes.string,
}

export default Create
