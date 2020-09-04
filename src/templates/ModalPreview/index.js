import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import Layout from 'constants/Layout'
import LinearGradient from 'react-native-linear-gradient'
import path from 'ramda/src/path'
import CacheComponent from 'components/Cache'

const ModalPreview = ({
  theme,
  post,
  renderUri,
}) => {
  const styling = styles
  const thumbnailSource = { uri: path(['image', 'url64p'])(post) }
  const imageSource = { uri: path(['image', 'url1080p'])(post) }

  return (
    <View style={styling.preview}>
      <LinearGradient
        colors={[`${theme.colors.backgroundPrimary}10`, theme.colors.backgroundPrimary]}
        style={styling.gradient}
      />

      {!renderUri ?
        <CacheComponent
          images={[
            [thumbnailSource.uri, true],
            [imageSource.uri, true],
          ]}
          fallback={imageSource.uri}
          priorityIndex={1}
          resizeMode="cover"
        />
      : null}

      {renderUri ?
        <CacheComponent
          images={[
            [renderUri, true],
          ]}
          fallback={renderUri}
          priorityIndex={1}
          resizeMode="cover"
        />
      : null}
    </View>
  )
}

const styles = StyleSheet.create({
  preview: {
    height: 160,
    width: Layout.window.width,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

ModalPreview.propTypes = {
  theme: PropTypes.any,
  post: PropTypes.any,
  renderUri: PropTypes.any,
}

export default ModalPreview
