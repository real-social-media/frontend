import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Line, Circle } from 'react-native-svg'

const Report = ({ fill = '#333' }) => (
  <Svg height={18} width={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Circle cx="12" cy="12" fill="none" r="11" stroke={fill}/>
			<Line fill="none" x1="12" x2="12" y1="7" y2="13"/>
			<Circle cx="12" cy="17" r="1" stroke="none"/>
    </G>
  </Svg>
)

Report.propTypes = {
  fill: PropTypes.string,
}

export default Report
