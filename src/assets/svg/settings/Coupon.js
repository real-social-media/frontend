import * as React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Circle } from 'react-native-svg'

function Coupon({ fill }) {
  return (
    <Svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
      <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit={10}>
        <Path d="M20.5 12.5c0-1.7 1.3-3 3-3v-5h-22v5c1.7 0 3 1.3 3 3s-1.3 3-3 3v5h22v-5c-1.7 0-3-1.3-3-3zM15.5 9.5l-6 6" />
        <G fill={fill} stroke="none" transform="translate(.5 .5)">
          <Circle cx={9.5} cy={8.5} r={1.5} />
          <Circle cx={14.5} cy={15.5} r={1.5} />
        </G>
      </G>
    </Svg>
  )
}

Coupon.propTypes = {
  fill: PropTypes.string,
}

Coupon.defaultProps = {
  fill: '#333',
}

export default Coupon
