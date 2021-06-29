import * as React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Circle } from 'react-native-svg'

function Coupon({ fill }) {
  return (
    <Svg height={48} viewBox="0 0 48 48" width={48} xmlns="http://www.w3.org/2000/svg">
      <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit={10} strokeWidth={2}>
        <Path d="M40 24c0-3.4 2.6-6 6-6V8H2v10c3.4 0 6 2.6 6 6s-2.6 6-6 6v10h44V30c-3.4 0-6-2.6-6-6zM30 18L18 30" />
        <Circle cx={18} cy={18} r={3} />
        <Circle cx={30} cy={30} r={3} />
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
