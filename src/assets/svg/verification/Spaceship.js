import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path, Ellipse } from 'react-native-svg'

const Spaceship = ({ fill = '#333' }) => (
  <Svg height={30} width={28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G stroke={fill} strokeLinecap="square" transform="translate(.5 .5)">
      <G fill="none" stroke={fill} strokeMiterlimit="10">
        <Path d="m14.935 3.093 5.947 5.947" strokeLinecap="butt" />
        <Path
          d="m12.603 4.387c-2.921-1.258-6.439-.694-8.824 1.692-.489.489-.893 1.03-1.229 1.6l3.428 3.428"
          strokeLinecap="butt"
        />
        <Path
          d="m19.597 11.345c1.29 2.932.725 6.475-1.676 8.876-.489.489-1.03.893-1.6 1.229l-3.442-3.442"
          strokeLinecap="butt"
        />
        <Path d="m10.143 19.514-5.657-5.657s4.832-12.021 18.385-12.728c-.767 13.494-12.728 18.385-12.728 18.385z" />
      </G>
      <Ellipse
        cx="14"
        cy="10"
        rx="2"
        ry="2"
        stroke={fill}
        transform="matrix(.7071 -.7071 .7071 .7071 -2.9706 12.8284)"
      />
      <Path
        d="m1.113 18.844c1.111-1.111 2.911-1.111 4.022 0s1.111 2.911 0 4.022-5.135 1.134-5.135 1.134.002-4.046 1.113-5.156z"
        stroke={fill}
      />
    </G>
  </Svg>
)

Spaceship.propTypes = {
  fill: PropTypes.string,
}

export default Spaceship
