import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Wallet = ({ fill = '#333' }) => (
  <Svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" transform="translate(.5 .5)">
      <Path d="m42 23.999v-11.999h-36c-2.209 0-4-1.791-4-4v30c0 3.314 2.686 6 6 6h34v-12" stroke={fill} />
      <Path d="m34 7v-3h-28c-2.209 0-4 1.791-4 4 0 2.209 1.791 4 4 4" stroke={fill} />
      <Path d="m46 32h-9c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4h9z" />
    </G>
  </Svg>
)

Wallet.propTypes = {
  fill: PropTypes.string,
}

export default Wallet
