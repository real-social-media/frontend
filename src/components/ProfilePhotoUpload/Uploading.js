import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Caption } from 'react-native-paper'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import TickIcon from 'assets/svg/post/Tick'
import CloseIcon from 'assets/svg/post/Close'
import VerificationIcon from 'assets/svg/post/Verification'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const Uploading = ({ t, theme, post }) => {
  const styling = styles(theme)

  if (!['loading', 'failure', 'success'].includes(post.status)) {
    return null
  }

  return (
    <View style={styling.root}>
      <Avatar
        thumbnailSource={{ uri: path(['payload', 'preview', '0'])(post) }}
        imageSource={{ uri: path(['payload', 'preview', '0'])(post) }}
      />

      {post.status === 'loading' ? (
        <View testID="components/AuthPhotoUpload/Uploading/loading" style={styling.status}>
          <TouchableOpacity style={styling.content}>
            <Text style={styling.title}>Uploading {post.meta.progress || 0}%</Text>
            <View style={styling.caption}>
              <Caption style={styling.subtitle}>
                {t('Pending Verification')} - {t('Learn More')}
              </Caption>
              <VerificationIcon fill="#676767" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styling.icon}>
            <CloseIcon fill="#ffffff" />
          </TouchableOpacity>
        </View>
      ) : null}

      {post.status === 'failure' ? (
        <View testID="components/AuthPhotoUpload/Uploading/failure" style={styling.status}>
          <TouchableOpacity style={styling.content}>
            <Text style={styling.title}>{t('Failed to create your post')}</Text>
            <Caption style={styling.subtitle}>{t('Tap here to reupload')}</Caption>
          </TouchableOpacity>
          <TouchableOpacity style={styling.icon}>
            <CloseIcon fill="#ffffff" />
          </TouchableOpacity>
        </View>
      ) : null}

      {post.status === 'success' ? (
        <View testID="components/AuthPhotoUpload/Uploading/success" style={styling.status}>
          <TouchableOpacity style={styling.content}>
            <Text style={styling.title}>Done</Text>
            <Caption style={styling.subtitle}>{t('Successfully created')}</Caption>
          </TouchableOpacity>
          <TouchableOpacity style={styling.icon}>
            <TickIcon fill="#ffffff" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing.base,
      backgroundColor: theme.colors.backgroundPrimary,
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
      height: 38,
      width: 38,
    },
    title: {},
    subtitle: {
      color: '#676767',
      marginRight: 4,
    },
    caption: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })

Uploading.propTypes = {
  theme: PropTypes.any,
  post: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withTheme(Uploading))
