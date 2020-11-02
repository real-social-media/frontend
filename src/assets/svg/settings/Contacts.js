import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Contacts = ({ fill }) => (
  <Svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" stroke={fill} stroke-linecap="square" stroke-miterlimit="10" transform="translate(.5 .5)">
      <Path d="m19 21h4v-4.323a1 1 0 0 0 -.629-.928l-3.742-1.5a1 1 0 0 1 -.629-.926v-.878a3.982 3.982 0 0 0 2-3.445v-2a4 4 0 0 0 -6-3.465" />
      <Path
        d="m14.371 16.749-3.742-1.5a1 1 0 0 1 -.629-.926v-.878a3.982 3.982 0 0 0 2-3.445v-2a4 4 0 0 0 -8 0v2a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1 -.629.928l-3.742 1.5a1 1 0 0 0 -.629.926v3.323h14v-3.323a1 1 0 0 0 -.629-.928z"
        stroke={fill}
      />
    </G>
  </Svg>
)

Contacts.propTypes = {
  fill: PropTypes.string,
}

Contacts.defaultProps = {
  fill: '#333',
}

export default Contacts
