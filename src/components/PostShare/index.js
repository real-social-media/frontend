import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView } from 'react-native'
import path from 'ramda/src/path'
import { Headline, Caption } from 'react-native-paper'
import AccordionComponent from 'templates/Accordion'
import NativeError from 'templates/NativeError'

import PreviewServiceComponent from 'components/Preview/index.service'
import PreviewPostComponent from 'components/Preview/Post'
import PreviewUserComponent from 'components/Preview/User'

import { withTheme } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const PostShare = ({ t, theme, postsSingleGet, postsShare, postsShareRequest, watermark, route }) => {
  const styling = styles(theme)
  const post = path(['data'])(postsSingleGet)
  const photoUrl = route.params.renderUri || path(['image', 'url'])(post)

  const handleGallerySave = () =>
    postsShareRequest({
      photoUrl,
      type: 'cameraroll',
      title: 'Camera roll export',
      watermark,
      post
    })

  const handleRepost = () =>
    postsShareRequest({
      photoUrl,
      type: 'repost',
      title: 'Repost',
      watermark,
      post
    })

  const handleInstagramPost = () =>
    postsShareRequest({
      photoUrl,
      type: 'instagramPost',
      title: 'Instagram export',
      watermark,
      post
    })

  return (
    <View style={styling.root}>
      <NativeError
        handleCancelPress={() => {}}
        titleText={t('Success')}
        messageText={t('Successfully saved to camera roll')}
        actionText={t('Done')}
        status={postsShare.status}
        triggerOn="success"
        hidden={path(['payload', 'type'])(postsShare) !== 'cameraroll'}
      />

      <ScrollView bounces={false}>
        <PreviewServiceComponent>
          {({ postPreviewProps, postUserProps }) => (
            <React.Fragment>
              <PreviewPostComponent {...postPreviewProps} />
              <PreviewUserComponent {...postUserProps} />
            </React.Fragment>
          )}
        </PreviewServiceComponent>

        <View style={styling.content}>
          <Headline style={styling.headline}>{t('Store as')}</Headline>
          <View style={styling.bottomSpacing} />
          <AccordionComponent
            items={[
              {
                text: t('Repost on REAL'),
                onPress: handleRepost,
                loading: postsShare.status === 'loading' && postsShare.payload.type === 'repost',
              },
              {
                text: t('Copy to Photos'),
                onPress: handleGallerySave,
                loading: postsShare.status === 'loading' && postsShare.payload.type === 'cameraroll',
              },
            ]}
          />
          <View style={styling.bottomSpacing} />
          <Caption style={styling.bottomSpacing}>
            {t("Prove your post is verified by sharing a link to your REAL profile in it's description")}
          </Caption>
          <View style={styling.bottomSpacing} />
        </View>

        <View style={styling.content}>
          <Headline style={styling.headline}>{t('Share as')}</Headline>
          <View style={styling.bottomSpacing} />
          <AccordionComponent
            items={[
              {
                text: t('Share on Instagram'),
                onPress: handleInstagramPost,
                loading: postsShare.status === 'loading' && postsShare.payload.type === 'instagramPost',
              },
            ]}
          />
          <View style={styling.bottomSpacing} />
          <Caption style={styling.bottomSpacing}>
            {t("Prove your post is verified by sharing a link to your REAL profile in it's description")}
          </Caption>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = (theme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.backgroundPrimary,
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
  t: PropTypes.any,
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.shape({
    status: PropTypes.oneOf(['idle', 'success', 'failure', 'loading']),
    payload: PropTypes.shape({
      type: PropTypes.oneOf(['cameraroll', 'repost', 'instagramPost']),
    }),
  }),
  postsShareRequest: PropTypes.func.isRequired,
  watermark: PropTypes.any,
  route: PropTypes.shape({
    params: PropTypes.shape({
      renderUri: PropTypes.string,
    }),
  }),
}

export default withTranslation()(withTheme(PostShare))
