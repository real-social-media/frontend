import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'
import { withTheme } from 'react-native-paper'

const Link = ({ title, onPress, theme }) => {
  const styling = styles(theme)

  return (
    <Text onPress={onPress} style={styling.link}>
      {title}
    </Text>
  )
}

Link.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  theme: PropTypes.any.isRequired,
}

const styles = (theme) =>
  StyleSheet.create({
    link: {
      color: theme.colors.primary,
    },
  })

export default withTheme(Link)
