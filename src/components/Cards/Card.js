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
}) => ({ item: card }) => {
  const customStyle = {
    borderColor,
    backgroundColor,
  }

  return (
    <View style={[styles.root, customStyle]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text>{card.title}</Text>
        </View>

        <View style={styles.headerIcon}>
          <CloseIcon fill="#ffffff" />
        </View>
      </View>
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
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default Card
