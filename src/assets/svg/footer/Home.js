import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Rect, Line } from 'react-native-svg'

const Home = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="square" strokeWidth="2">
      <Rect height="6" width="22" fill="none" stroke={fill} x="1" y="3" />
      <Line fill="none" x1="1" x2="23" y1="15" y2="15" />
      <Line fill="none" x1="1" x2="23" y1="21" y2="21" />
    </G>
  </Svg>
)

Home.propTypes = {
  fill: PropTypes.string,
}

export default Home
