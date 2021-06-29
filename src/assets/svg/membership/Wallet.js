import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Wallet = ({ fill = '#333' }) => (
  <Svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" transform="translate(.5 .5)">
      <Path d="m21 12v-7h-18c-1.105 0-2-.895-2-2v17c0 1.657 1.343 3 3 3h17v-7" stroke={fill} />
      <Path d="m17 2v-1h-14c-1.105 0-2 .895-2 2 0 1.105.895 2 2 2" stroke={fill} />
      <Path d="m23 16h-5c-1.105 0-2-.895-2-2 0-1.105.895-2 2-2h5z" />
    </G>
  </Svg>
)

Wallet.propTypes = {
  fill: PropTypes.string,
}

export default Wallet
