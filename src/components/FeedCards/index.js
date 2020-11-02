import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import equals from 'ramda/src/equals'
import Card from 'components/FeedCards/Card'
import Layout from 'constants/Layout'
import Carousel from 'react-native-snap-carousel'
import { useTheme } from 'react-native-paper'

const FeedCards = ({
  cards,
  handleCardPress,
  usersDeleteCardRequest,
}) => {
  const theme = useTheme()
  const styling = styles(theme)
  const cardsRef = useRef(null)

  if (!cards.length) {
    return null
  }

  return (
    <View style={styling.root}>
      <Carousel
        ref={cardsRef}
        data={cards}
        renderItem={Card({
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.backgroundSecondary,
          handleCardPress,
          usersDeleteCardRequest,
        })}
        sliderWidth={Layout.window.width}
        itemWidth={Layout.window.width}
        removeClippedSubviews={false}
        slideStyle={styling.slideStyle}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        layout="stack"
      />
    </View>
  )
}

FeedCards.propTypes = {
  cards: PropTypes.any,
  handleCardPress: PropTypes.any,
  usersDeleteCardRequest: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
    height: 100,
    backgroundColor: theme.colors.secondary,
  },
  slideStyle: {
    margin: 0,
    padding: 0,
  },
})

export default React.memo(FeedCards, equals)
