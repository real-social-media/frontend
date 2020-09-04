import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

const ThemeAvatarTemplate = ({
  icon,
}) => {
  const styling = styles
  
  return (
    <View style={styling.root}>
      <View style={styling.component}>
        {icon}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  component: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

ThemeAvatarTemplate.defaultProps = {
  children: () => {},
  size: 'default',
}

ThemeAvatarTemplate.propTypes = {
  icon: PropTypes.any,
}

export default ThemeAvatarTemplate
