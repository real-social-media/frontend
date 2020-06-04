import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import ActionComponent from 'components/Post/Action'
import AlbumComponent from 'components/Post/Album'
import CommentComponent from 'components/Post/Comment'
import DescriptionComponent from 'components/Post/Description'
import HeaderComponent from 'components/Post/Header'
import VerificationComponent from 'components/Post/Verification'

import ListItemComponent from 'templates/ListItem'
import CacheComponent from 'components/Cache'
import TextOnlyComponent from 'templates/TextOnly'
import ReactionsPreviewTemplate from 'templates/ReactionsPreview'
import ViewShot from 'react-native-view-shot'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostComponent = ({
  t,
  theme,
  user,
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

  createActionSheetRef,
  actionSheetRef,
  createTextPostRef,
  textPostRef,

  feedRef,
  priorityQueueInstance,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const albumLength = path(['album', 'posts', 'items', 'length'])(post) || 0

  const onCapture = (renderUri) => {
    navigationActions.navigatePostShare(navigation, { post, renderUri })()
  }

  const handlePostShare = () => {
    if (post.postType === 'TEXT_ONLY') {
      textPostRef.capture()
    }

    if (post.postType === 'IMAGE') {
      navigationActions.navigatePostShare(navigation, { post })()
    }
  }

  const failedVerificationVisibility = (
    user.userId === !path(['postedBy', 'userId'])(post) &&
    !path(['isVerified'])(post) &&
    path(['postType'])(post) !== 'TEXT_ONLY'
  )

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.prev} onPress={handleScrollPrev} />
      <TouchableOpacity style={styling.next} onPress={handleScrollNext} />

      <HeaderComponent
        user={user}
        post={post}
        handleEditPress={handleEditPress}
        postsArchiveRequest={postsArchiveRequest}
        postsFlagRequest={postsFlagRequest}
        postsDeleteRequest={postsDeleteRequest}
        postsShareRequest={postsShareRequest}
        postsRestoreArchivedRequest={postsRestoreArchivedRequest}
        handlePostShare={handlePostShare}
        createActionSheetRef={createActionSheetRef}
        actionSheetRef={actionSheetRef}
      />

      {post.postType === 'TEXT_ONLY' ?
        <ViewShot ref={createTextPostRef} onCapture={onCapture}>
          <TextOnlyComponent
            text={post.text}
          >
            <TouchableOpacity style={styling.prev} onPress={handleScrollPrev} />
            <TouchableOpacity style={styling.next} onPress={handleScrollNext} />
          </TextOnlyComponent>
        </ViewShot>
      : null}

      {post.postType === 'IMAGE' ?
        <ListItemComponent
          post={post}
          feedRef={feedRef}
        >
          <CacheComponent
            priorityQueueInstance={priorityQueueInstance}
            images={[
              [path(['image', 'url64p'])(post), true],
              [path(['image', 'url4k'])(post), true],
              [path(['image', 'url'])(post), false],
            ]}
            fallback={path(['image', 'url4k'])(post)}
            priorityIndex={priorityIndex}
            resizeMode="contain"
            hideLabel={false}
          />
          {failedVerificationVisibility ?
            <VerificationComponent />
          : null}
          <TouchableOpacity style={styling.prev} onPress={handleScrollPrev} />
          <TouchableOpacity style={styling.next} onPress={handleScrollNext} />
        </ListItemComponent>
      : null}

      {albumLength > 1 ?
        <AlbumComponent post={post} />
      : null}

      <ActionComponent
        user={user}
        post={post}
        postsShareRequest={postsShareRequest}
        postsAnonymouslyLikeRequest={postsAnonymouslyLikeRequest}
        postsOnymouslyLikeRequest={postsOnymouslyLikeRequest}
        postsDislikeRequest={postsDislikeRequest}
        handlePostShare={handlePostShare}
      />

      <ReactionsPreviewTemplate
        post={post}
        user={user}
      />

      {post.postType === 'IMAGE' ?
        <DescriptionComponent
          post={post}
        />
      : null}

      <CommentComponent post={post} />
    </View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingBottom: theme.spacing.base,
  },
  prev: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: '50%',
    bottom: 0,
  },
  next: {
    position: 'absolute',
    top: 0,
    left: '50%',
    right: 0,
    bottom: 0,
  },
})

PostComponent.defaultProps = {
  postsGet: {},
}

PostComponent.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  feedRef: PropTypes.any,
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
  t: PropTypes.any,
  post: PropTypes.any,
  postsRestoreArchivedRequest: PropTypes.any,
  priorityIndex: PropTypes.any,
  handleScrollPrev: PropTypes.any,
  handleScrollNext: PropTypes.any,
  createActionSheetRef: PropTypes.any,
  actionSheetRef: PropTypes.any,
  createTextPostRef: PropTypes.any,
  textPostRef: PropTypes.any,
  priorityQueueInstance: PropTypes.any,
}

export default withTranslation()(withTheme(PostComponent))
