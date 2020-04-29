import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Text, Caption } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfilePhoto = ({
  t,
  theme,
  cameraCapture,
  postsCreateRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <Avatar
        thumbnailSource={{ uri: path(['data', 0, 'uri'])(cameraCapture) }}
        imageSource={{ uri: path(['data', 0, 'uri'])(cameraCapture) }}
      />

      <View style={styling.status}>
        <TouchableOpacity style={styling.content} onPress={() => {}}>
          <View style={styling.caption}>
            <Caption style={styling.subtitle}>{t('Upload this photo to set as profile photo or choose from your existing posts')}</Caption>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styling.icon} onPress={() => postsCreateRequest({
          images: [path(['data', 0, 'uri'])(cameraCapture)],
          takenInReal: path(['data', 0, 'takenInReal'])(cameraCapture),
          originalFormat: path(['data', 0, 'originalFormat'])(cameraCapture),
        })}>
          <Text style={styling.title}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.base,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3498db',
  },
  subtitle: {
    color: '#676767',
    marginRight: 4,
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})

ProfilePhoto.propTypes = {
  theme: PropTypes.any,
  post: PropTypes.any,
  handleEditPress: PropTypes.any,
  t: PropTypes.any,
  postsCreateRequest: PropTypes.any,
}

export default withTranslation()(withTheme(ProfilePhoto))
