import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Image,
} from 'react-native'
import ProfileIcon from 'assets/svg/auth/Profile'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import pathOr from 'ramda/src/pathOr'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Photo = ({
  t,
  theme,
  activeUpload,
}) => {
  const styling = styles(theme)
  const progress = pathOr(0, ['meta', 'progress'])(activeUpload)
  const image = (
    pathOr(null, ['payload', 'images', 0])(activeUpload) ||
    pathOr(null, ['payload', 'image', 'url480p'])(activeUpload)
  )

  return (
    <View style={styling.root}>
      <AnimatedCircularProgress
        size={128}
        width={3}
        fill={progress}
        tintColor={theme.colors.primary}
        backgroundColor={theme.colors.disabled}
      />

      {!image ?
        <View style={styling.icon}>
          <ProfileIcon fill={theme.colors.disabled} />
        </View>
      : null}

      {image ?
        <View style={styling.icon}>
          <Image
            source={{ uri: image }}
            style={styling.image}
          />
        </View>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    position: 'absolute',
    padding: 4,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
})

Photo.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  activeUpload: PropTypes.any,
}

export default withTranslation()(withTheme(Photo))
