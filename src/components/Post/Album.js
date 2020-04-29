import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import { Text, Caption } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import LinearGradient from 'react-native-linear-gradient'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostAlbum = ({
  t,
  theme,
  post,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const colorFrom = path(['image', 'colors', '4'])(post)
  const gradientFrom = colorFrom ?
    `rgba(${colorFrom.r}, ${colorFrom.g}, ${colorFrom.b}, 0.6)` :
    '#03a9f4'

  const colorTo = path(['image', 'colors', '0'])(post)
  const gradientTo = colorTo ?
    `rgba(${colorTo.r}, ${colorTo.g}, ${colorTo.b}, 0.6)` :
    '#009688'

  return (
    <TouchableWithoutFeedback onPress={navigationActions.navigateAlbum(navigation, { album: post.album })}>
      <View style={styling.root}>
        <LinearGradient
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          colors={[gradientFrom, gradientTo]}
          style={styling.gradient}
        />
        <ScrollView style={styling.album} horizontal>
          {(path(['album', 'posts', 'items'])(post) || []).filter(item => item.postType !== 'TEXT_ONLY').map((album, key) => (
            <Avatar
              key={key}
              thumbnailSource={{ uri: path(['image', 'url64p'])(album) }}
              imageSource={{ uri: path(['image', 'url64p'])(album) }}
            />
          ))}
        </ScrollView>
        <View style={styling.more}>
          <Caption style={styling.caption}>{t('View album')}</Caption>
          <Text style={styling.text}>{path(['album', 'name'])(post)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  album: {
    padding: 6,
    flexDirection: 'row',
  },
  more: {
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.base,
  },
  text: {
    textAlign: 'right',
  },
  caption: {
    textAlign: 'right',
    lineHeight: 14,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
})

PostAlbum.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  post: PropTypes.any,
}

export default withTranslation()(withTheme(PostAlbum))
