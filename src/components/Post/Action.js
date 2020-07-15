import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import BubbleIcon from 'assets/svg/action/Bubble'
import DirectIcon from 'assets/svg/action/Direct'
import LikeIcon from 'assets/svg/action/Like'
import UnlikeIcon from 'assets/svg/action/Unlike'
import path from 'ramda/src/path'
import { Caption } from 'react-native-paper'
import dayjs from 'dayjs'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Action = ({
  t,
  theme,
  user,
  post,
  postsOnymouslyLikeRequest,
  postsDislikeRequest,
  handlePostShare,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const self = path(['postedBy', 'userId'])(post) === path(['userId'])(user)

  /**
   * See if current authenticated user is tagged in post by author
   */
  const tagged = (path(['textTaggedUsers'])(post) || [])
    .find(textTag => textTag.tag === `@${path(['username'])(user)}`)

  /**
   * Visibility of like button, like button will be visible if:
   * - Post owner has enabled likes
   * - Post owner has not enabled likesDisabled global setting
   * - Like hasn't been set before, which allows only 1 like per post
   */
  const likeButtonVisibility = (
    post.likesDisabled === false &&
    !path(['postedBy', 'likesDisabled'])(post) &&
    !path(['likesDisabled'])(user)
  )

  /**
   * Visibility of comment button, comment button will be visible if:
   * - Post owner has enabled comments
   * - Post owner has not enabled commentsDisabled global setting
   */
  const commentButtonVisibility = (
    post.commentsDisabled === false &&
    !path(['postedBy', 'commentsDisabled'])(post) &&
    !path(['commentsDisabled'])(user)
  )

  /**
   * Visibility of share button, share button will be visible if:
   * - Post owner has enabled shares
   * - Current authenticated user has shares enabled in settings
   * - Current authenticated user is tagged in post by author
   */
  const shareButtonVisibility = (
    post.sharingDisabled === false &&
    !path(['sharingDisabled'])(user) &&
    tagged
  )

  /**
   * Visibility of seen by text, text will be visible if:
   * - Current authenticated user owns the post
   * - Post has not enabled viewCountsHidden setting
   * - Post owner has not enabled viewCountsHidden global setting
   */
  const seenByVisibility = (
    self &&
    !post.viewCountsHidden &&
    !path(['postedBy', 'viewCountsHidden'])(post) &&
    post.viewedByCount > 0
  )

  return (
    <View style={styling.action}>
      <View style={styling.actionLeft}>

        {likeButtonVisibility && post.likeStatus === 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => postsOnymouslyLikeRequest({ postId: post.postId, userId: post.postedBy.userId })}>
            <LikeIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}

        {likeButtonVisibility && post.likeStatus !== 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => postsDislikeRequest({ postId: post.postId, userId: post.postedBy.userId })}>
            <UnlikeIcon fill={theme.colors.primary} />
          </TouchableOpacity>
        : null}
        
        {commentButtonVisibility ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={navigationActions.navigateComments(navigation, { postId: post.postId, userId: post.postedBy.userId })}>
            <BubbleIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}

        {shareButtonVisibility ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={handlePostShare}>
            <DirectIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}
      </View>

      {seenByVisibility ?
        <TouchableOpacity style={styling.actionRight} onPress={navigationActions.navigatePostViews(navigation, { postId: post.postId, userId: post.postedBy.userId })}>
          <Caption>{t('Seen by {{viewedByCount}} people', { viewedByCount: post.viewedByCount })}</Caption>
        </TouchableOpacity>
      :
        <View style={styling.actionRight}>
          <Caption>{dayjs(post.postedAt).from(dayjs())}</Caption>
        </View>
      }
    </View>
  )
}

const styles = theme => StyleSheet.create({
  action: {
    zIndex: 1,
    flexDirection: 'row',
    padding: theme.spacing.base,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeftIcon: {
    marginRight: 18,
  },
  actionLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  actionRight: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
})

Action.propTypes = {
  theme: PropTypes.any,  
  post: PropTypes.any,
  postsOnymouslyLikeRequest: PropTypes.any,
  postsDislikeRequest: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  handlePostShare: PropTypes.any,
}

export default withTranslation()(withTheme(Action))
