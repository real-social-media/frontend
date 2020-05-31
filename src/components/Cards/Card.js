import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'

import { Text } from 'react-native-paper'

const Card = ({
  borderColor,
  backgroundColor,
}) => () => {
  const customStyle = {
    borderColor,
    backgroundColor,
  }

  return (
    <View style={[styles.root, customStyle]}>
      <Text>asds</Text>
    </View>
  )
}

Card.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 12,
    margin: 12,
    borderRadius: 4,
    borderWidth: 1,
  },
})

export default Card
