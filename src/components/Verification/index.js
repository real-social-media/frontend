import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import path from 'ramda/src/path'
import { Text, Headline, Caption } from 'react-native-paper'
import ModalProfileComponent from 'templates/ModalProfile'
import ModalHeaderComponent from 'templates/ModalHeader'
import ModalPreviewComponent from 'templates/ModalPreview'
import dayjs from 'dayjs'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Verification = ({
  theme,
  authUser,
  postsSingleGet,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  /**
   * Hide verification if:
   * - Post does not belong to currently authenticated user
   * - Post is not uploaded yet
   */
  const verificationVisibility = (
    authUser.userId === path(['data', 'postedBy', 'userId'])(postsSingleGet) &&
    path(['data', 'postId'])(postsSingleGet)
  )

  return (
    <View style={styling.root}>
      <View style={styling.header}>
        <ModalHeaderComponent
          onPress={navigationActions.navigateHome(navigation)}
        />
      </View>

      <ScrollView bounces={false}>
        <ModalPreviewComponent
          thumbnailSource={{ uri: path(['data', 'mediaObjects', '0', 'url64p'])(postsSingleGet) }}
          imageSource={{ uri: path(['data', 'mediaObjects', '0', 'url1080p'])(postsSingleGet) }}
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
          <Headline style={styling.headline}>{t('Post Verification')}</Headline>
          <View style={styling.bottomSpacing} />

          <Text style={styling.text}>{t('Our mission is to encourage high quality content to ensure REAL grows into an honest & meantally healthy platform for your followers')}.</Text>
          <Text style={styling.text}>{t('This post may be pending verification because of one or more of the following')}:</Text>

          <View style={styling.bottomSpacing} />

          <Caption>- {t('It’s been modified, cropped, or rotated by another app')}.</Caption>
          <Caption>- {t('It’s been copied or was taken using another camera')}.</Caption>
          <Caption>- {t('It’s too blurry')}.</Caption>
          <Caption>- {t('It was taken using iOS portrait mode (selective lighting/filter)')}.</Caption>
          <Caption>- {t('It has/uses a filter or has been photoshopped')}.</Caption>
          <Caption>- {t('It has poor lighting')}.</Caption>
          <Caption>- {t('It’s from the internet (copyrighted)')}.</Caption>
          <Caption>- {t('It was previously flagged as inappropriate by > 20% of the viewers who saw it')}.</Caption>

          <Caption>{t('If you don’t like “Post Verification”, don’t stress! You can disable Post Verification for good for all posts in settings under “Mental Health & Privacy Settings”. Nobody can detect if you have post verification disabled')}.</Caption>
          <View style={styling.bottomSpacing} />
        </View>

        {verificationVisibility ?
          <View style={styling.content}>
            <DefaultButton label={t('Disable verification on this post')} onPress={() => {}} />
            <View style={styling.bottomSpacing} />
            <View style={styling.bottomSpacing} />
            <View style={styling.bottomSpacing} />
          </View>
        : null}
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
  text: {
    fontSize: 16,
  },
  bottomSpacing: {
    marginBottom: theme.spacing.base,
  },
})

Verification.propTypes = {
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
}

export default withTheme(Verification)
