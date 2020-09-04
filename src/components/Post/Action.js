import React, { useState, useMemo } from 'react'
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
import { Caption } from 'react-native-paper'
import dayjs from 'dayjs'
import * as navigationActions from 'navigation/actions'
import * as PrivacyService from 'services/Privacy'

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

  const [likeStatus, setLikeStatus] = useState(post.likeStatus)
  const handleLikeRequest = () => {
    setLikeStatus('ONYMOUSLY_LIKED')
    postsOnymouslyLikeRequest({ postId: post.postId, userId: post.postedBy.userId })
  }
  const handleDisikeRequest = () => {
    setLikeStatus('NOT_LIKED')
    postsDislikeRequest({ postId: post.postId, userId: post.postedBy.userId })
  }

  const likeButtonVisibility = useMemo(() => PrivacyService.postLikeVisibility(post, user), [post, user])
  const commentButtonVisibility = useMemo(() => PrivacyService.postCommentVisibility(post, user), [post, user])
  const shareButtonVisibility = useMemo(() => PrivacyService.postShareVisibility(post, user), [post, user])
  const seenByVisibility = useMemo(() => PrivacyService.postSeenByVisility(post, user), [post, user])

  return (
    <View style={styling.action}>
      <View style={styling.actionLeft}>

        {likeButtonVisibility && likeStatus === 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={handleLikeRequest}>
            <LikeIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}

        {likeButtonVisibility && likeStatus === 'ONYMOUSLY_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={handleDisikeRequest}>
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
