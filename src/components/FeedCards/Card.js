import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import CloseIcon from 'assets/svg/post/Close'
import { Text } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'

const FeedCard = ({ 
  borderColor, 
  backgroundColor, 
  handleCardPress, 
  usersDeleteCardRequest, 
}) =>
  // eslint-disable-next-line react/prop-types
  ({ item: card }) => {
    const customStyle = {
      borderColor,
      backgroundColor,
    }

    return (
      <TouchableOpacity
        style={[styles.root, customStyle]}
        onPress={() => handleCardPress({ action: card.action, cardId: card.cardId })}
      >
        {card.thumbnail ? (
          <View style={styles.image} onPress={() => handleCardPress({ action: card.action, cardId: card.cardId })}>
            <Avatar
              key={path(['thumbnail', 'url64p'])(card)}
              thumbnailSource={{ uri: path(['thumbnail', 'url64p'])(card) }}
              imageSource={{ uri: path(['thumbnail', 'url64p'])(card) }}
            />
          </View>
        ) : null}

        <View style={styles.header}>
          <View style={styles.headerTitle}>
            <Text>{card.title}</Text>
          </View>

          <TouchableOpacity style={styles.headerIcon} onPress={() => usersDeleteCardRequest({ cardId: card.cardId })}>
            <CloseIcon fill="#ffffff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

FeedCard.propTypes = {
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    marginRight: 12,
  },
})

export default FeedCard
