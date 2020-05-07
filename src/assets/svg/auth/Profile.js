import React from 'react'
import Svg, { G, Path, Circle } from 'react-native-svg'

const Profile = ({ fill = '#333', style = {} }) => (
  <Svg height={120} width={120} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="0.4">
      <Path d="M18.989,20.495 c-0.135-2.388-1.497-3.146-3.489-3.81c-1.522-0.507-1.941-2.105-2.056-2.953" fill="none"/>
			<Path d="M10.555,13.731 c-0.113,0.844-0.524,2.444-2.055,2.954c-1.992,0.664-3.356,1.42-3.491,3.808" fill="none"/>
			<Path d="M12,14L12,14 c-2.209,0-4-1.791-4-4V9c0-2.209,1.791-4,4-4h0c2.209,0,4,1.791,4,4v1C16,12.209,14.209,14,12,14z" fill="none"/>
			<Circle cx="12" cy="12" fill="none" r="11" stroke={fill}/>
    </G>
  </Svg>
)

export default Profile
