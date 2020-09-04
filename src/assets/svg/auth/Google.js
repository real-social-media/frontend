import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Google = ({ fill = '#fff' }) => (
  <Svg height={16} width={16} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="0.6">
			<Path d="M23.507,9.818H12.052v4.909h6.492C17.507,18,14.944,19.091,12,19.091a7.091,7.091,0,1,1,4.553-12.52l3.567-3.4A12,12,0,1,0,12,24C18.617,24,24.6,19.636,23.507,9.818Z" fill={fill}/>
    </G>
  </Svg>
)

Google.propTypes = {
  fill: PropTypes.string,
}

export default Google
