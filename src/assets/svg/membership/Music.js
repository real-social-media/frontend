import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Circle } from 'react-native-svg'

const Music = ({ fill = '#333' }) => (
  <Svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" transform="translate(.5 .5)">
      <Path
        d="m18 15.359c2.5-2.71 5-6.109 5-8.859a5.5 5.5 0 0 0 -10-3.156 5.5 5.5 0 0 0 -10 3.156 5.115 5.115 0 0 0 .076.825"
        stroke={fill}
      />
      <G strokeLinecap="butt">
        <Path d="m14.999 19 .001-11-10.001 2v11" />
        <Circle cx="2.999" cy="21" r="2" />
        <Circle cx="13" cy="19" r="2" />
        <Path d="m5 14 10-2" />
      </G>
    </G>
  </Svg>
)

Music.propTypes = {
  fill: PropTypes.string,
}

export default Music
