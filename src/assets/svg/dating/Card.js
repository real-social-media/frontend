import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Circle } from 'react-native-svg'

const Card = ({ fill = '#333' }) => (
  <Svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <G stroke={fill} strokeLinecap="square" transform="translate(.5 .5)">
      <Path
        d="m12.992 9.737 2.208 1.663c.504.378.8.97.8 1.6v1h-8v-1c0-.63.296-1.222.8-1.6l2.208-1.663"
        fill="none"
        strokeLinecap="butt"
        strokeMiterlimit="10"
      />
      <Circle cx="12" cy="19" r="1" stroke="none" />
      <G fill="none" strokeMiterlimit="10">
        <Path d="m12 10c-1.105 0-2-.895-2-2v-1c0-1.105.895-2 2-2 1.105 0 2 .895 2 2v1c0 1.105-.895 2-2 2z" />
        <Path
          d="m18 23h-12c-1.105 0-2-.895-2-2v-18c0-1.105.895-2 2-2h12c1.105 0 2 .895 2 2v18c0 1.105-.895 2-2 2z"
          stroke={fill}
        />
      </G>
    </G>
  </Svg>
)

Card.propTypes = {
  fill: PropTypes.string,
}

export default Card
