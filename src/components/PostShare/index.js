import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import Avatar from 'templates/Avatar'
import { Text } from 'react-native-paper'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import NativeError from 'templates/NativeError'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const PostShare = ({
  theme,
  authUser,
  postsSingleGet,
  postsShare,
  postsShareRequest,
  watermark,
  handleWatermark,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const tagged = (path(['data', 'textTaggedUsers'])(postsSingleGet) || [])
    .find(textTag => textTag.tag === `@${path(['username'])(authUser)}`)

  /**
   * Visibility of repost button, repost button will be visible if:
   * - Post owner has tagged current authenticated user
   */
  const repostButtonVisibility = (
    tagged
  )

  return (
    <View style={styling.root}>
      <NativeError
        handleCancelPress={() => {}}
        titleText={t('All good!')}
        messageText={t('This post has been saved')}
        actionText={t('Done')}
        status={postsShare.status}
        triggerOn="success"
      />

      <View style={styling.form}>
        <Avatar
          size="large"
          thumbnailSource={{ uri: path(['data', 'mediaObjects', '0', 'url1080p'])(postsSingleGet) }}
          imageSource={{ uri: path(['data', 'mediaObjects', '0', 'url1080p'])(postsSingleGet) }}
        />
      </View>

      <View style={styling.form}>
        <Text style={styling.text}>{t('Share verified REAL post')}</Text>
        <Text style={styling.text}>{t('Prove your post is verified by sharing a link to your REAL profile in it\'s description')}</Text>
      </View>

      <View style={styling.form}>
        <DefaultButton label={t('Copy to Photos')} onPress={() => postsShareRequest({
          photoUrl: path(['data', 'mediaObjects', '0', 'url'])(postsSingleGet),
          type: 'cameraroll',
          title: 'Camera roll export',
          watermark,
        })} loading={postsShare.status === 'loading' && postsShare.payload.type === 'cameraroll'} />
      </View>
      <View style={styling.form}>
        <DefaultButton label={t('Share to Instagram')} onPress={() => postsShareRequest({
          photoUrl: path(['data', 'mediaObjects', '0', 'url'])(postsSingleGet),
          type: 'instagram',
          title: 'Instagram export',
          watermark,
        })} loading={postsShare.status === 'loading' && postsShare.payload.type === 'instagram'} />
      </View>

      {repostButtonVisibility ?
        <View style={styling.form}>
          <DefaultButton label={t('Repost')} onPress={() => postsShareRequest({
            photoUrl: path(['data', 'mediaObjects', '0', 'url'])(postsSingleGet),
            type: 'repost',
            title: 'Repost',
            watermark,
          })} loading={postsShare.status === 'loading' && postsShare.payload.type === 'instagram'} />
        </View>
      : null}

      <View style={styling.form}>
        <DefaultButton label={watermark ? t('Remove watermark') : t('Add watermark')} mode="outline" onPress={handleWatermark} />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  form: {
    padding: theme.spacing.base,
  },
  component: {
    width: 160,
    height: 160,
  },
})

PostShare.propTypes = {
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
}

export default withTheme(PostShare)
