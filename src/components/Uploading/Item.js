import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import { Text, Caption } from 'react-native-paper'
import path from 'ramda/src/path'
import TickIcon from 'assets/svg/post/Tick'
import CloseIcon from 'assets/svg/post/Close'
import VerificationIcon from 'assets/svg/post/Verification'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'
import testIDs from 'components/Uploading/test-ids'
import UploadingItemPreview from 'components/Uploading/ItemPreview'

const getPreviewURI = (post) => Platform.select({
  ios: path(['payload', 'preview', '0'], post),
  android: `file://${path(['payload', 'preview', '0'], post)}`,
})

const UploadingItem = ({ t, theme, post, postsCreateRequest, postsCreateIdle }) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  if (!['loading', 'failure'].includes(post.status)) {
    return null
  }

  return (
    <View style={styling.root}>
      <UploadingItemPreview style={styling.preview} uri={getPreviewURI(post)}  />
      {post.status === 'loading' ? (
        <View style={styling.status}>
          <TouchableOpacity
            style={styling.content}
            onPress={navigationActions.navigateVerification(navigation, { actionType: 'BACK' })}
          >
            <Text style={styling.title}>Uploading {post.meta.progress || 0}%</Text>
            <View style={styling.caption}>
              <Caption style={styling.subtitle}>
                {t('Pending Verification')} - {t('Learn More')}
              </Caption>
              <VerificationIcon fill="#676767" />
            </View>
          </TouchableOpacity>
          {post.meta.progress !== 99 ? (
            <TouchableOpacity
              testID={testIDs.cancelBtn}
              style={styling.icon}
              onPress={() => postsCreateIdle(post)}
            >
              <CloseIcon fill="#ffffff" />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}

      {post.status === 'failure' ? (
        <View style={styling.status}>
          <TouchableOpacity style={styling.content} onPress={() => postsCreateRequest(post.payload)}>
            <Text style={styling.title}>{t('Failed to create your post')}</Text>
            <Caption style={styling.subtitle}>{t('Tap here to reupload')}</Caption>
          </TouchableOpacity>
          <TouchableOpacity
            testID={testIDs.cancelBtn}
            style={styling.icon}
            onPress={() => postsCreateIdle(post)}
          >
            <CloseIcon fill="#ffffff" />
          </TouchableOpacity>
        </View>
      ) : null}

      {post.status === 'success' ? (
        <View style={styling.status}>
          <TouchableOpacity style={styling.content} onPress={() => postsCreateIdle(post)}>
            <Text style={styling.title}>Done</Text>
            <Caption style={styling.subtitle}>{t('Successfully created')}</Caption>
          </TouchableOpacity>
          <TouchableOpacity
            testID={testIDs.cancelBtn}
            style={styling.icon}
            onPress={() => postsCreateIdle(post)}
          >
            <TickIcon fill="#ffffff" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
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
  title: {
  },
  subtitle: {
    color: '#676767',
    marginRight: 4,
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preview: {
    width: 44,
    height: 44,
  },
})

UploadingItem.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  post: PropTypes.any,
  postsArchiveRequest: PropTypes.any,
  postsFlagRequest: PropTypes.any,
  postsCreateRequest: PropTypes.func,
  postsCreateIdle: PropTypes.func,
}

export default withTranslation()(withTheme(UploadingItem))
