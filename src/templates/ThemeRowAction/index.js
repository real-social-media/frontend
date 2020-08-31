import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'

const ThemeRowActionTemplate = ({ enabled, onEnablePress, onDisablePress }) => {
  const styling = styles

  return (
    <View style={styling.root}>
      <View style={styling.component}>
        {enabled ? <DefaultButton label="Disable" onPress={onDisablePress} size="compact" /> : null}

        {!enabled ? <DefaultButton label="Enable" onPress={onEnablePress} mode="outlined" size="compact" /> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {},
  component: {
    width: 90,
  },
  avatar: {},
  content: {},
  action: {},
})

ThemeRowActionTemplate.defaultProps = {}

ThemeRowActionTemplate.propTypes = {
  enabled: PropTypes.any,
  onEnablePress: PropTypes.any,
  onDisablePress: PropTypes.any,
}

export default ThemeRowActionTemplate
