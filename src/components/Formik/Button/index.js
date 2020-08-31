import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, ActivityIndicator, View } from 'react-native'

import { withTheme } from 'react-native-paper'

const Button = ({ theme, children, style, loading, ...props }) => {
  const styling = styles(theme)

  return (
    <TouchableOpacity {...props} style={[styling.input, style, loading ? styling.loading : null]} disabled={loading}>
      {children}

      {loading ? (
        <View style={styling.loading}>
          <ActivityIndicator size="small" />
        </View>
      ) : null}
    </TouchableOpacity>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    input: {
      width: '100%',
      borderWidth: 0,
      paddingHorizontal: 12,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 2,
      position: 'relative',
    },
    loading: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.disabled,
      justifyContent: 'center',
      opacity: 0.8,
    },
  })

Button.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  style: PropTypes.any,
  loading: PropTypes.any,
}

export default withTheme(Button)
