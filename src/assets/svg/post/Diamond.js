import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Diamond = ({ fill = '#333' }) => (
  <Svg height="15" viewBox="0 0 17 15" width="17" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd" stroke={fill} transform="translate(1 1)">
      <Path d="m.25925926 4.40740741h14.51851854" />
      <Path d="m7.51851852 13.7407407 2.59259258-9.33333329-2.59259258-4.14814815" />
      <Path d="m7.51851852.25925926-2.59259259 4.14814815 2.59259259 9.33333329" />
      <Path d="m2.85185185.25925926 2.07407408 4.14814815" />
      <Path d="m12.1851852.25925926-2.0740741 4.14814815" />
      <Path
        d="m14.7777778 4.40740741-7.25925928 9.33333329-7.25925926-9.33333329 2.59259259-4.14814815h9.33333335z"
        strokeLinecap="square"
      />
    </G>
  </Svg>
)

Diamond.propTypes = {
  fill: PropTypes.string,
}

export default Diamond
