import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'

const Footer = ({
  theme,
  post,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <Text>{post.text}</Text>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'column-reverse',
    height: '100%',
    padding: theme.spacing.base,
  },
})

Footer.propTypes = {
  theme: PropTypes.any,
  post: PropTypes.any,
}

export default withTheme(Footer)
