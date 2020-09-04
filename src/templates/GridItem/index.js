import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Layout from 'constants/Layout'

const GridItemTemplate = ({
  children,
  onPress,

  /**
   * Selectable icon
   */
  active,
  activeIcon,
  inactiveIcon,
}) => {
  const styling = styles
  
  return (
    <TouchableOpacity style={styling.root} onPress={onPress}>
      <View style={styling.component}>
        {children}

        {active && activeIcon ?
          <View style={styling.wrapper}>{activeIcon}</View>
        : null}

        {!active && inactiveIcon ?
          <View style={styling.wrapper}>{inactiveIcon}</View>
        : null}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    width: Layout.window.width / 3,
    height: Layout.window.width / 3,
    position: 'relative',
  },
  component: {
    padding: 1,
    width: '100%',
    height: '100%',
  },
  wrapper: {
    position: 'absolute',
    padding: 1,
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    zIndex: 2,
    alignItems: 'flex-end',
  },
})

GridItemTemplate.defaultProps = {
  onPress: () => {},
  active: false,
  activeIcon: false,
  inactiveIcon: false,
}

GridItemTemplate.propTypes = {
  children: PropTypes.any,
  onPress: PropTypes.any,
  active: PropTypes.any,
  activeIcon: PropTypes.any,
  inactiveIcon: PropTypes.any,
}

export default GridItemTemplate
