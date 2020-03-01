import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { RNCamera } from 'react-native-camera'
import CameraIcon from 'assets/svg/header/Camera'
import Avatar from 'templates/Avatar'
import { Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const AvatarPicker = ({
  theme,
  avatar,
  postsCreate,
  postsCreateRequest,
  handleCameraPress,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <View style={styling.avatar}>
        {typeof avatar === 'string' && avatar.length ?
          <View style={styling.preview}>
            <Avatar
              size="large"
              thumbnailSource={{ uri: avatar }}
              imageSource={{ uri: avatar }}
            />
          </View>
        : null}

        {typeof avatar !== 'string' || !avatar.length ?
          <TouchableOpacity style={styling.preview} onPress={handleCameraPress}>
            <View style={styling.wrapper}>
              <CameraIcon fill={theme.colors.text} style={styling.icon} />
            </View>
            <RNCamera
              key="camera"
              captureAudio={false}
              style={styling.camera}
            />
          </TouchableOpacity>
        : null}
      </View>

      <View style={styling.form}>
        <Text style={styling.text}>{t('Please select a high quality photo which has not been doctored or modified in any way')}</Text>
      </View>

      {(typeof avatar === 'string' && avatar.length) ?
        <View style={styling.form}>
          <DefaultButton label={t('Upload new Photo')} onPress={postsCreateRequest} disabled={postsCreate.status === 'loading'} />
        </View>
      : null}

      {(typeof avatar !== 'string' || !avatar.length) ?
        <View style={styling.form}>
          <DefaultButton label={t('Take a new Photo (Camera)')} onPress={handleCameraPress} disabled={postsCreate.status === 'loading'} />
        </View>
      : null}

      {postsCreate.status !== 'loading' ?
        <View style={styling.form}>
          <DefaultButton label={t('Skip')} mode="outline" onPress={() => navigation.push('Main')} />
        </View>
      : null}

      {postsCreate.status === 'loading' ?
        <View style={styling.form}>
          <DefaultButton label={t('Uploading')} mode="outline" disabled loading />
        </View>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  avatar: {
    alignItems: 'center',
    padding: theme.spacing.base,
  },
  form: {
    padding: theme.spacing.base,
  },
  preview: {
    width: 120,
    height: 120,
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  wrapper: {
    position: 'absolute',
    zIndex: 2,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

AvatarPicker.propTypes = {
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
}

export default withTheme(AvatarPicker)
