import * as React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

function Download({ fill }) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
      <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit={10} strokeWidth={2}>
        <Path d="M2 16v6h20v-6" />
        <Path d="M12 1v15" strokeLinecap="butt" />
        <Path d="M6 10l6 6 6-6" />
      </G>
    </Svg>
  )
}

Download.propTypes = {
  fill: PropTypes.string,
}

Download.defaultProps = {
  fill: '#333',
}

export default Download
