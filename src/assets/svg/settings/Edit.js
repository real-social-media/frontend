import React from 'react'
import PropTypes from 'prop-types'
import Svg, { Path, G } from 'react-native-svg'

const Edit = ({ fill = '#333' }) => (
  <Svg height={22} width={22} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Path d="M15,15H9 c-3.314,0-6,2.686-6,6v1c0,0,3.125,1,9,1s9-1,9-1v-1C21,17.686,18.314,15,15,15z" fill="none"/>
      <Path d="M7,6c0-2.761,2.239-5,5-5 s5,2.239,5,5s-2.239,6-5,6S7,8.761,7,6z" fill="none" stroke={fill}/>
    </G>
  </Svg>
)

Edit.propTypes = {
  fill: PropTypes.string,
}

export default Edit
