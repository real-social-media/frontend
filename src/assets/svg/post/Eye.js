import * as React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

function Eye({ fill = '#333', style }) {
  return (
    <Svg height={48} viewBox="0 0 48 48" width={48} xmlns="http://www.w3.org/2000/svg" style={style}>
      <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit={10} strokeWidth={2}>
        <Path
          d="M40.971 30.769a43.013 43.013 0 004.629-5.506 2.215 2.215 0 00.006-2.53C43.083 19.115 35.056 9 24 9 12.85 9 4.878 19.13 2.391 22.74a2.219 2.219 0 00.009 2.515C4.9 28.861 12.937 39 24 39a19.627 19.627 0 008.559-2.057"
          strokeLinecap="butt"
        />
        <Path d="M32.488 21.023a9 9 0 10-9.279 11.937M4 44L44 4M45.143 33.932l-9.122-6.916a5 5 0 00-6.042 7.969L41.871 44" />
      </G>
    </Svg>
  )
}

Eye.propTypes = {
  style: PropTypes.any,
  fill: PropTypes.string,
}

export default Eye
