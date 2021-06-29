import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Night = ({ fill = '#333' }) => (
  <Svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" stroke={fill} strokeLinecap="square" strokeMiterlimit="10" transform="translate(.5 .5)">
      <Path
        d="m11.2 14.8c-3.6-3.7-4.2-9.3-1.6-13.5-2 .4-3.9 1.4-5.4 3-4.3 4.3-4.3 11.3 0 15.6s11.3 4.3 15.6 0c.6-.6 1.2-1.3 1.6-2-3.6.6-7.4-.4-10.2-3.1z"
        stroke={fill}
      />
      <Path d="m22 10c-1.4-1.4-4.6-1.4-6 0 1.4-1.4 1.4-4.6 0-6 1.4 1.4 4.6 1.4 6 0-1.4 1.4-1.4 4.6 0 6z" />
    </G>
  </Svg>
)

Night.propTypes = {
  fill: PropTypes.string,
}

export default Night
