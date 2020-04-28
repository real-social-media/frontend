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
import TickIcon from 'assets/svg/post/Tick'
import CloseIcon from 'assets/svg/post/Close'
import VerificationIcon from 'assets/svg/post/Verification'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Uploading = ({
  t,
  theme,
  user,
  post,
  postsCreateRequest,
  postsCreateIdle,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  if (!['loading', 'failure', 'success'].includes(post.status)) {
    return null
  }

  /**
   * Immitating post object
   */
  const pseudoPost = {
    image: {
      url64p: path(['payload', 'images', '0'])(post),
      url1080p: path(['payload', 'images', '0'])(post),
    },
    postedBy: user,
    postedAt: Date.now(),
  }

  return (
    <View style={styling.root}>
      <Avatar
        thumbnailSource={{ uri: path(['payload', 'images', '0'])(post) }}
        imageSource={{ uri: path(['payload', 'images', '0'])(post) }}
      />

      {post.status === 'loading' ?
        <View style={styling.status}>
          <TouchableOpacity style={styling.content} onPress={navigationActions.navigateVerification(navigation, { post: pseudoPost })}>
            <Text style={styling.title}>Uploading {post.meta.progress || 0}%</Text>
            <View style={styling.caption}>
              <Caption style={styling.subtitle}>{t('Pending Verification')} - {t('Learn More')}</Caption>
              <VerificationIcon fill="#676767" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styling.icon} onPress={() => postsCreateIdle(post.payload)}>
            <CloseIcon fill="#ffffff" />
          </TouchableOpacity>
        </View>
      : null}

      {post.status === 'failure' ?
        <View style={styling.status}>
          <TouchableOpacity style={styling.content} onPress={() => postsCreateRequest(post.payload)}>
            <Text style={styling.title}>{t('Failed to create your post')}</Text>
            <Caption style={styling.subtitle}>{t('Tap here to reupload')}</Caption>
          </TouchableOpacity>
          <TouchableOpacity style={styling.icon} onPress={() => postsCreateIdle(post.payload)}>
            <CloseIcon fill="#ffffff" />
          </TouchableOpacity>
        </View>
      : null}
      
      {post.status === 'success' ?
        <View style={styling.status}>
          <TouchableOpacity style={styling.content} onPress={() => postsCreateIdle(post.payload)}>
            <Text style={styling.title}>Done</Text>
            <Caption style={styling.subtitle}>{t('Successfully created')}</Caption>
          </TouchableOpacity>
          <TouchableOpacity style={styling.icon} onPress={() => postsCreateIdle(post.payload)}>
            <TickIcon fill="#ffffff" />
          </TouchableOpacity>
        </View>
      : null}
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
  }
})

Uploading.propTypes = {
  theme: PropTypes.any,
  
  user: PropTypes.any,
  post: PropTypes.any,
  handleEditPress: PropTypes.any,
  postsArchiveRequest: PropTypes.any,
  postsFlagRequest: PropTypes.any,
}

export default withTranslation()(withTheme(Uploading))
