import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import ChatCard from 'components/ChatCards/Card'
import Layout from 'constants/Layout'
import Carousel from 'react-native-snap-carousel'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const ChatCards = ({
  t,
  theme,
  postsGetUnreadComments,
  handleCardPress,
}) => {
  const styling = styles(theme)
  const cardsRef = useRef(null)

  if (!postsGetUnreadComments.data.length) {
    return null
  }

  return (
    <View style={styling.root}>
      <Carousel
        ref={cardsRef}
        enableMomentum
        data={postsGetUnreadComments.data}
        renderItem={ChatCard({
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.backgroundSecondary,
          handleCardPress,
        })}
        sliderWidth={Layout.window.width}
        itemWidth={Layout.window.width}
        removeClippedSubviews={false}
        slideStyle={{
          margin: 0,
          padding: 0,
        }}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        layout="stack"
      />
    </View>
  )
}

ChatCards.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  postsGetUnreadComments: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
    height: 120,
    backgroundColor: theme.colors.secondary,
  },
})

export default withTranslation()(withTheme(ChatCards))
