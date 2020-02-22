import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import ImageComponent from 'templates/Image'
import Layout from 'constants/Layout'
import LinearGradient from 'react-native-linear-gradient'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ModalPreview = ({
  theme,
  thumbnailSource,
  imageSource,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.preview}>
      <LinearGradient
        colors={[`${theme.colors.backgroundPrimary}10`, theme.colors.backgroundPrimary]}
        style={styling.gradient}
      />
      <ImageComponent
        thumbnailSource={thumbnailSource}
        imageSource={imageSource}
        priorityIndex={0}
      />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  preview: {
    height: Layout.window.width,
    width: Layout.window.width,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
})

ModalPreview.propTypes = {
  theme: PropTypes.any,
  thumbnailSource: PropTypes.any,
  imageSource: PropTypes.any,
}

export default withTheme(ModalPreview)
