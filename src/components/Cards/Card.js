import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import CloseIcon from 'assets/svg/post/Close'
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
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text>New comments</Text>
        </View>

        <View style={styles.headerIcon}>
          <CloseIcon fill="#ffffff" />
        </View>
      </View>

      <Text>You have 11 new comments</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
})

export default Card
