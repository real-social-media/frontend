import React from 'react'
import PropTypes from 'prop-types'
import Svg, { G, Path } from 'react-native-svg'

const Contacts = ({ fill }) => (
  <Svg height="52" viewBox="0 0 64 52" width="64" xmlns="http://www.w3.org/2000/svg">
    <G fill="none" fillRule="evenodd" stroke={fill} strokeLinecap="square">
      <Path d="m51.4782609 51.4782609h11.1304348v-12.0292174c-.0007201-1.1376061-.6938422-2.1602092-1.7502609-2.5822609l-10.4125218-4.173913c-1.0545379-.4212961-1.7472694-1.4411202-1.7502608-2.5766957v-2.4431304c3.4348897-1.9711963 5.5565656-5.625783 5.5652174-9.586087v-5.5652174c.0008932-3.97696786-2.1202028-7.65224355-5.5641348-9.64111428s-7.6873622-1.98910892-11.1315174-.00062482" />
      <Path d="m38.5975652 39.6493913-10.4125217-4.173913c-1.054538-.4212961-1.7472695-1.4411202-1.7502609-2.5766957v-2.4431304c3.4348898-1.9711963 5.5565656-5.625783 5.5652174-9.586087v-5.5652174c0-6.14716936-4.9832654-11.13043476-11.1304348-11.13043476s-11.13043477 4.9832654-11.13043477 11.13043476v5.5652174c.00865176 3.960304 2.13032767 7.6148907 5.56521737 9.586087v2.4431304c-.00072 1.1376061-.6938421 2.1602092-1.7502608 2.5822609l-10.41252178 4.173913c-1.05453795.421296-1.74726947 1.4411202-1.75026087 2.5766957v9.2466087h38.95652175v-9.2466087c-.0007201-1.1376061-.6938422-2.1602092-1.7502609-2.5822609z" />
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
