import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import path from 'ramda/src/path'
import { Headline, Caption } from 'react-native-paper'
import AccordionComponent from 'templates/Accordion'
import ModalProfileComponent from 'templates/ModalProfile'
import ModalHeaderComponent from 'templates/ModalHeader'
import ModalPreviewComponent from 'templates/ModalPreview'
import dayjs from 'dayjs'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
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
  const navigation = useNavigation()

  const tagged = (path(['data', 'textTaggedUsers'])(postsSingleGet) || [])
    .find(textTag => textTag.tag === `@${path(['username'])(authUser)}`)

  /**
   * Visibility of repost button, repost button will be visible if:
   * - Post owner has tagged current authenticated user
   */
  const repostButtonVisibility = (
    !path(['data', 'sharingDisabled'])(postsSingleGet) ||
    tagged
  )

  const handleGallerySave = () => postsShareRequest({
    photoUrl: path(['data', 'image', 'url'])(postsSingleGet),
    type: 'cameraroll',
    title: 'Camera roll export',
    watermark,
    post: path(['data'])(postsSingleGet),
  })

  const handleRepost = () => postsShareRequest({
    photoUrl: path(['data', 'image', 'url'])(postsSingleGet),
    type: 'repost',
    title: 'Repost',
    watermark,
    post: path(['data'])(postsSingleGet),
  })

  const handleInstagramPost = () => postsShareRequest({
    photoUrl: path(['data', 'image', 'url'])(postsSingleGet),
    type: 'instagramPost',
    title: 'Instagram export',
    watermark,
  })

  return (
    <View style={styling.root}>
      <View style={styling.header}>
        <ModalHeaderComponent
          onPress={navigationActions.navigateHome(navigation)}
        />
      </View>

      <ScrollView bounces={false}>
        <ModalPreviewComponent
          thumbnailSource={{ uri: path(['data', 'image', 'url64p'])(postsSingleGet) }}
          imageSource={{ uri: path(['data', 'image', 'url1080p'])(postsSingleGet) }}
        />

        <View style={styling.content}>
          <ModalProfileComponent
            thumbnailSource={{ uri: path(['data', 'postedBy', 'photoUrl64p'])(postsSingleGet) }}
            imageSource={{ uri: path(['data', 'postedBy', 'photoUrl480p'])(postsSingleGet) }}
            title={path(['data', 'postedBy', 'username'])(postsSingleGet)}
            subtitle={`${t('Posted')} ${dayjs(path(['data', 'postedAt'])(postsSingleGet)).from(dayjs())}`}
          />
        </View>

        <View style={styling.content}>
          <Headline style={styling.headline}>{t('Share as')}</Headline>
          <View style={styling.bottomSpacing} />
          <AccordionComponent
            items={[{
              text: t('Share on Instagram'),
              onPress: handleInstagramPost,
              loading: postsShare.status === 'loading' && postsShare.payload.type === 'instagramPost',
            }]}
          />
          <View style={styling.bottomSpacing} />
          <Caption style={[styling.bottomSpacing]}>{t('Prove your post is verified by sharing a link to your REAL profile in it\'s description')}</Caption>
        </View>

        <View style={styling.content}>
          <Headline style={styling.headline}>{t('Store as')}</Headline>
          <View style={styling.bottomSpacing} />
          <AccordionComponent
            items={[
              {
                text: t('Copy to Photos'),
                onPress: handleGallerySave,
                loading: postsShare.status === 'loading' && postsShare.payload.type === 'cameraroll',
              },
              {
                text: t('Repost on REAL'),
                onPress: handleRepost,
                loading: postsShare.status === 'loading' && postsShare.payload.type === 'repost',
                disabled: !repostButtonVisibility,
              },
            ]}
          />
          <View style={styling.bottomSpacing} />
          <Caption style={[styling.bottomSpacing]}>{t('Prove your post is verified by sharing a link to your REAL profile in it\'s description')}</Caption>
          <View style={styling.bottomSpacing} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  header: {
    zIndex: 2,
  },
  content: {
    padding: theme.spacing.base,
  },
  headline: {
    fontSize: 20,
    fontWeight: '600',
  },
  bottomSpacing: {
    marginBottom: theme.spacing.base,
  },
})

PostShare.propTypes = {
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
}

export default withTheme(PostShare)
