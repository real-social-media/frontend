import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import HeaderComponent from 'components/PostsList/Header'
import ActionComponent from 'components/PostsList/Action'
import DescriptionComponent from 'components/PostsList/Description'
import CommentComponent from 'components/PostsList/Comment'
import AlbumComponent from 'components/PostsList/Album'
import ListItemComponent from 'templates/ListItem'
import ImageComponent from 'templates/Image'
import TextOnlyComponent from 'templates/TextOnly'
import ReactionsPreviewTemplate from 'templates/ReactionsPreview'
import { Text } from 'react-native-paper'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const PostComponent = ({
  theme,
  authUser,
  post,
  postsShareRequest,
  handleEditPress,
  postsArchiveRequest,
  postsFlagRequest,
  postsDeleteRequest,
  postsAnonymouslyLikeRequest,
  postsOnymouslyLikeRequest,
  postsDislikeRequest,
  postsRestoreArchivedRequest,
  priorityIndex,
  handleScrollPrev,
  handleScrollNext,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()
  const navigation = useNavigation()

  const albumLength = path(['album', 'posts', 'items', 'length'])(post) || 0

  return (
    <View style={styling.root}>
      <HeaderComponent
        authUser={authUser}
        post={post}
        handleEditPress={handleEditPress}
        postsArchiveRequest={postsArchiveRequest}
        postsFlagRequest={postsFlagRequest}
        postsDeleteRequest={postsDeleteRequest}
        postsShareRequest={postsShareRequest}
        postsRestoreArchivedRequest={postsRestoreArchivedRequest}
      />

      {post.postType === 'TEXT_ONLY' ?
        <TextOnlyComponent text={post.text}>
          <TouchableOpacity style={styling.prev} onPress={handleScrollPrev} />
          <TouchableOpacity style={styling.next} onPress={handleScrollNext} />
        </TextOnlyComponent>
      : null}

      {post.postType === 'IMAGE' ?
        <ListItemComponent post={post}>
          <ImageComponent
            thumbnailSource={{ uri: path(['image', 'url64p'])(post) }}
            imageSource={{ uri: path(['image', 'url4k'])(post) }}
            priorityIndex={priorityIndex}
          />
          <TouchableOpacity style={styling.prev} onPress={handleScrollPrev} />
          <TouchableOpacity style={styling.next} onPress={handleScrollNext} />
        </ListItemComponent>
      : null}

      {albumLength > 1 ?
        <AlbumComponent post={post} />
      : null}

      <ActionComponent
        authUser={authUser}
        post={post}
        postsShareRequest={postsShareRequest}
        postsAnonymouslyLikeRequest={postsAnonymouslyLikeRequest}
        postsOnymouslyLikeRequest={postsOnymouslyLikeRequest}
        postsDislikeRequest={postsDislikeRequest}
      />
      <ReactionsPreviewTemplate
        post={post}
      />
      <DescriptionComponent
        post={post}
      />

      {pathOr(0, ['commentCount'], post) > 3 ?
        <TouchableOpacity onPress={navigationActions.navigateComments({ post })}>
          <Text style={styling.commentCount}>{t('View all {{commentCount}} comments', { commentCount: pathOr(0, ['commentCount'], post) })}</Text>
        </TouchableOpacity>
      : null}

      {pathOr([], ['comments', 'items'], post).map((comment, key) => (
        <CommentComponent key={key} comment={comment} />
      ))}
    </View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  prev: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: '50%',
    bottom: 0,
    zIndex: 2,
  },
  next: {
    position: 'absolute',
    top: 0,
    left: '50%',
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  commentCount: {
    padding: theme.spacing.base,
    opacity: 0.6,
  },
})

PostComponent.defaultProps = {
  postsGet: {},
}

PostComponent.propTypes = {
  theme: PropTypes.any,
  authUser: PropTypes.any,
  feedRef: PropTypes.any,
  postsFeedGet: PropTypes.any,
  postsFeedGetRequest: PropTypes.any,
  postsShareRequest: PropTypes.any,
  handleEditPress: PropTypes.any,
  postsArchiveRequest: PropTypes.any,
  postsFlag: PropTypes.any,
  postsFlagRequest: PropTypes.any,
  postsDeleteRequest: PropTypes.any,
  postsAnonymouslyLikeRequest: PropTypes.any,
  postsOnymouslyLikeRequest: PropTypes.any,
  postsDislikeRequest: PropTypes.any,
  usersGetFollowedUsersWithStories: PropTypes.any,
  usersGetFollowedUsersWithStoriesRequest: PropTypes.any, 
}

export default withTheme(PostComponent)
