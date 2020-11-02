import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native'
import DatingAbout from 'components/Dating/About'
import DatingGallery from 'components/Dating/Gallery'
import DatingSwipeable from 'components/Dating/Swipeable'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Card = ({
  theme,
  user,
}) => {
  const styling = styles(theme)

  if (!user) {
    return null
  }

  return (
    <DatingSwipeable theme={theme}>
      {(swipeableProps) => (
        <View style={styling.root}>
          <View style={styling.card}>
            <View style={styling.preview}>
              <Image source={{ uri: path(['photo', 'url480p'], user) }} style={styling.image} />
            </View>

            <Animated.View style={[styling.about, { height: swipeableProps.animatedHeightRef.current }]}>
              <TouchableOpacity onPress={swipeableProps.onToggleFlingHandlerStateChange}>
                <DatingAbout {...swipeableProps} user={user} />
                <DatingGallery {...swipeableProps} user={user} />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      )}
    </DatingSwipeable>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  about: {
    height: 152,
  },
  card: {
    backgroundColor: theme.colors.backgroundSecondary,
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing.base,
    overflow: 'hidden',
  },
  preview: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

Card.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
}

export default withTranslation()(withTheme(Card))
